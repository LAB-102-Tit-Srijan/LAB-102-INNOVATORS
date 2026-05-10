import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Bike, MapPin, Calendar, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const OFFICIAL_BIKES = [
  { id: 1, name: 'Basic City Cycle', price: 50, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400', desc: 'Perfect for getting around campus.' },
  { id: 2, name: 'Mountain Bike', price: 80, image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=400', desc: 'Geared cycle for off-campus trips.' },
  { id: 3, name: 'Campus E-Bike', price: 150, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', desc: 'Electric assisted effortless riding.' }
];

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Rental Modal State
  const [selectedBike, setSelectedBike] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [fulfillment, setFulfillment] = useState('pickup'); // 'pickup' | 'delivery'
  const [showSuccess, setShowSuccess] = useState(false);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const savedRentals = JSON.parse(localStorage.getItem('rentals') || '[]');
    setRentals(savedRentals);
  }, []);

  const handleRentClick = (bike) => {
    if (rentals.some(r => r.bikeId === bike.id)) return; // Out of stock
    setSelectedBike(bike);
    setRentalDays(1);
    setFulfillment('pickup');
    setShowSuccess(false);
  };

  const handleConfirm = () => {
    const invoiceId = 'RENT-' + Math.floor(100000 + Math.random() * 900000);
    const newRental = {
      id: invoiceId,
      bikeId: selectedBike.id,
      bikeName: selectedBike.name,
      image: selectedBike.image,
      date: new Date().toLocaleDateString(),
      rentalDays: rentalDays,
      pricePaid: (selectedBike.price * rentalDays) + (fulfillment === 'delivery' ? 20 : 0),
      fulfillment: fulfillment,
      customerName: currentUser?.displayName || 'Student Name',
      sellerName: 'CampusLoop Official'
    };

    const updatedRentals = [newRental, ...rentals];
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));
    setRentals(updatedRentals);

    setShowSuccess(true);
    setTimeout(() => {
      setSelectedBike(null);
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div style={{ paddingBottom: '100px', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <div className="container" style={{ 
        minHeight: '85vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '20px',
        backgroundImage: 'url("/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '0 0 24px 24px',
        overflow: 'hidden'
      }}>
        
        {/* Dark overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 0 }} />

        {/* Hero Content */}
        <div style={{ maxWidth: '800px', textAlign: 'center', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          
          <div className="glass-panel" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', color: 'white', fontSize: '0.9rem', fontWeight: 500, backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Sparkles size={16} color="var(--primary)" /> Powered by Smart AI Recommendations
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0, color: 'white' }}>
            The Future of Campus <br/>
            <span style={{ color: 'var(--primary)', background: 'linear-gradient(to right, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Resource Exchange
            </span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#e2e8f0', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            A next-generation marketplace exclusively for your college. Buy, sell, and discover engineering tools with AI-curated suggestions tailored to your branch and year.
          </p>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1.1rem', borderRadius: '30px', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)' }} onClick={() => navigate('/market')}>
              Explore Marketplace &rarr;
            </button>
            <button className="btn glass-panel" style={{ padding: '14px 28px', fontSize: '1.1rem', borderRadius: '30px', color: 'white', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => navigate('/add')}>
              Start Selling
            </button>
          </div>
        </div>
      </div>

      {/* 2. OFFICIAL RENTAL PARTNER SECTION */}
      <div className="container" style={{ paddingTop: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 600, marginBottom: '4px' }}>
              <Bike size={20} /> Official Partner
            </div>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>CampusRides Rentals</h2>
            <p style={{ color: 'var(--text-muted)', margin: '8px 0 0 0' }}>Need a bike? Rent directly from our trusted campus partner.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {OFFICIAL_BIKES.map(bike => {
            const isRented = rentals.some(r => r.bikeId === bike.id);
            return (
              <div key={bike.id} className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', opacity: isRented ? 0.6 : 1, filter: isRented ? 'grayscale(80%)' : 'none' }}>
                <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                  <img src={bike.image} alt={bike.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {isRented && (
                    <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'var(--danger)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      OUT OF STOCK
                    </div>
                  )}
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>{bike.name}</h3>
                    <div style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.1rem' }}>₹{bike.price}<span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/day</span></div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', flex: 1 }}>{bike.desc}</p>
                  <button 
                    className={`btn ${isRented ? 'btn-outline' : 'btn-primary'}`} 
                    style={{ width: '100%', padding: '12px' }} 
                    onClick={() => handleRentClick(bike)}
                    disabled={isRented}
                  >
                    {isRented ? 'Out of Stock' : 'Rent Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. RENTAL BOOKING MODAL */}
      <AnimatePresence>
        {selectedBike && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass-panel"
              style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--bg-elevated)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}
            >
              
              {!showSuccess ? (
                <>
                  {/* Modal Header */}
                  <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Bike size={20} color="var(--primary)" /> Rent {selectedBike.name}
                    </h3>
                    <button onClick={() => setSelectedBike(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <X size={24} />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div style={{ padding: '24px' }}>
                    
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                      <img src={selectedBike.image} alt={selectedBike.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'white' }}>{selectedBike.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>Seller: <strong>CampusLoop Official</strong></div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Customer: <strong>{currentUser?.displayName || 'Student'}</strong></div>
                        <div style={{ color: 'var(--primary)', fontWeight: '600', marginTop: '8px' }}>₹{selectedBike.price} / day</div>
                      </div>
                    </div>

                    {/* Step 1: Duration */}
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-color)', fontWeight: 500 }}>
                        1. Rental Duration (Days)
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Calendar size={20} color="var(--text-muted)" />
                        <input 
                          type="number" 
                          min="1" 
                          max="30"
                          value={rentalDays}
                          onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
                          className="input-field"
                          style={{ width: '100px', textAlign: 'center', fontSize: '1.1rem' }}
                        />
                      </div>
                    </div>

                    {/* Step 2: Fulfillment */}
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-color)', fontWeight: 500 }}>
                        2. How will you get the bike?
                      </label>
                      
                      <div 
                        style={{ padding: '12px 16px', borderRadius: '12px', border: `1px solid ${fulfillment === 'pickup' ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`, backgroundColor: fulfillment === 'pickup' ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}
                        onClick={() => setFulfillment('pickup')}
                      >
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${fulfillment === 'pickup' ? 'var(--primary)' : 'var(--text-muted)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {fulfillment === 'pickup' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: fulfillment === 'pickup' ? 'white' : 'var(--text-main)' }}>Self Pickup from Center</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Main Gate Cycle Stand (Free)</div>
                        </div>
                      </div>

                      <div 
                        style={{ padding: '12px 16px', borderRadius: '12px', border: `1px solid ${fulfillment === 'delivery' ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`, backgroundColor: fulfillment === 'delivery' ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center' }}
                        onClick={() => setFulfillment('delivery')}
                      >
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${fulfillment === 'delivery' ? 'var(--primary)' : 'var(--text-muted)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {fulfillment === 'delivery' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: fulfillment === 'delivery' ? 'white' : 'var(--text-main)' }}>Deliver to Hostel</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Campus Delivery (+₹20)</div>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Summary */}
                    <div style={{ padding: '16px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '12px', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                        <span>Bike Rent ({rentalDays} {rentalDays === 1 ? 'day' : 'days'})</span>
                        <span>₹{selectedBike.price * rentalDays}</span>
                      </div>
                      {fulfillment === 'delivery' && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                          <span>Delivery Fee</span>
                          <span>₹20</span>
                        </div>
                      )}
                      <hr style={{ border: 'none', borderTop: '1px dashed rgba(255,255,255,0.2)', margin: '12px 0' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--primary)' }}>₹{(selectedBike.price * rentalDays) + (fulfillment === 'delivery' ? 20 : 0)}</span>
                      </div>
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }} onClick={handleConfirm}>
                      Confirm Booking
                    </button>
                  </div>
                </>
              ) : (
                /* Success State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ padding: '40px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
                >
                  <CheckCircle2 size={64} color="#10B981" />
                  <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>Booking Confirmed!</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    Your <strong>{selectedBike?.name}</strong> has been booked for {rentalDays} {rentalDays === 1 ? 'day' : 'days'}. <br/>
                    {fulfillment === 'pickup' ? 'Please pick it up from the Main Gate Cycle Stand.' : 'It will be delivered to your hostel shortly.'}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Home;
