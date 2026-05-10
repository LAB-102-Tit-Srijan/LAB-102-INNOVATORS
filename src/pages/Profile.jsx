import { useAuth } from '../context/AuthContext';
import { LogOut, Settings, ShieldCheck, BookOpen, Clock } from 'lucide-react';
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
        {MOCK_MY_LISTINGS.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      
      {/* Rentals */}
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Clock size={20} className="text-accent" color="var(--accent)" /> 
        Active Rentals
      </h3>
      <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
        No active rentals right now.
      </div>

    </div>
  );
}

export default Profile;
