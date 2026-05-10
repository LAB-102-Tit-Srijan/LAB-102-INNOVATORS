import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Settings, ShieldCheck, BookOpen, Clock, Receipt } from 'lucide-react';
import ListingCard from '../components/marketplace/ListingCard';

const MOCK_MY_LISTINGS = [
  {
    id: 3,
    title: 'Data Structures and Algorithms Notes',
    price: 0,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600',
    condition: 'New',
    location: 'CS Department',
    seller: { name: 'Me', avatar: 'https://i.pravatar.cc/150?img=11', rating: 5.0, verified: true },
    type: 'exchange'
  }
];

function Profile() {
  const { currentUser, logout } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    setPurchases(JSON.parse(localStorage.getItem('purchases') || '[]'));
    setRentals(JSON.parse(localStorage.getItem('rentals') || '[]'));
    setUserListings(JSON.parse(localStorage.getItem('userListings') || '[]'));
  }, []);

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      
      {/* Profile Header */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
        <img 
          src={`https://ui-avatars.com/api/?name=${currentUser.displayName}&background=6366F1&color=fff`} 
          alt="Profile" 
          style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '16px', border: '3px solid var(--primary)' }} 
        />
        <h2 style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
          {currentUser.displayName}
          {currentUser.verified && <ShieldCheck size={20} color="var(--primary)" />}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{currentUser.email}</p>
        
        <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'var(--bg-elevated)', padding: '12px 24px', borderRadius: 'var(--radius-lg)', flex: 1, maxWidth: '150px' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>4.8</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rating</div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-elevated)', padding: '12px 24px', borderRadius: 'var(--radius-lg)', flex: 1, maxWidth: '150px' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>12</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Exchanges</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <button className="btn btn-outline" style={{ flex: 1 }}>
          <Settings size={18} /> Settings
        </button>
        <button className="btn btn-outline" onClick={logout} style={{ flex: 1, color: 'var(--danger)', borderColor: 'var(--danger)' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* My Listings */}
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <BookOpen size={20} className="text-primary" color="var(--primary)" /> 
        Active Listings
      </h3>
      
      <div className="marketplace-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '20px',
        marginBottom: '32px'
      }}>
        {[...userListings, ...MOCK_MY_LISTINGS].map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      
      {/* My Purchases */}
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', marginTop: '32px' }}>
        <Receipt size={20} className="text-accent" color="var(--accent)" /> 
        My Purchases & Invoices
      </h3>
      {purchases.length === 0 ? (
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No purchases yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {purchases.map((purchase) => (
            <div key={purchase.id} className="glass-panel" style={{ padding: '16px', borderRadius: '16px', display: 'flex', gap: '16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '16px', right: '16px', border: '2px solid rgba(16, 185, 129, 0.5)', color: '#10B981', padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', transform: 'rotate(15deg)' }}>
                PAID
              </div>
              <img src={purchase.image} alt={purchase.productTitle} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Invoice: {purchase.id} • {purchase.date}</div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'white', marginBottom: '4px' }}>{purchase.productTitle}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Seller: {purchase.sellerName}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.1rem' }}>₹{purchase.price}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '8px' }}>{purchase.paymentMethod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rentals */}
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', marginTop: '32px' }}>
        <Clock size={20} className="text-accent" color="#F59E0B" /> 
        Active Rentals
      </h3>
      {rentals.length === 0 ? (
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No active rentals right now.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {rentals.map((rental) => (
            <div key={rental.id} className="glass-panel" style={{ padding: '16px', borderRadius: '16px', display: 'flex', gap: '16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                ACTIVE RENTAL
              </div>
              <img src={rental.image} alt={rental.productTitle} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Invoice: {rental.id} • {rental.date}</div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'white', marginBottom: '4px' }}>{rental.productTitle} ({rental.days} Days)</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Fulfillment: {rental.fulfillment === 'pickup' ? 'Self Pickup' : 'Campus Delivery'}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.1rem' }}>₹{rental.price}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '8px' }}>{rental.paymentMethod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Profile;
