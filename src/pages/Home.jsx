import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Bike, MapPin, Calendar, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const OFFICIAL_BIKES = [
  { id: 101, name: 'Basic City Cycle', price: 50, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400', desc: 'Perfect for getting around campus.' },
  { id: 102, name: 'Mountain Bike', price: 80, image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=400', desc: 'Geared cycle for off-campus trips.' },
  { id: 103, name: 'Campus E-Bike', price: 150, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', desc: 'Electric assisted effortless riding.' }
];

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Rental Modal State
  const [selectedBike, setSelectedBike] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [fulfillment, setFulfillment] = useState('pickup'); // 'pickup' | 'delivery'
  const [showSuccess, setShowSuccess] = useState(false);
  const [rentedBikes, setRentedBikes] = useState([]);

  useEffect(() => {
    const rentals = JSON.parse(localStorage.getItem('rentals') || '[]');
    setRentedBikes(rentals.map(r => r.bikeId));
  }, []);

  const floatVariants = {
    animate: (i) => ({
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
    })
  };

  const handleRentClick = (bike) => {
    setSelectedBike(bike);
    setRentalDays(1);
    setFulfillment('pickup');
    setShowSuccess(false);
  };

  const handleConfirm = () => {
    // Generate Invoice
    const invoiceId = 'RENT-' + Math.floor(100000 + Math.random() * 900000);
    const newRental = {
      id: invoiceId,
      bikeId: selectedBike.id,
      date: new Date().toLocaleDateString(),
      productTitle: selectedBike.name,
      price: selectedBike.price * rentalDays + (fulfillment === 'delivery' ? 20 : 0),
      image: selectedBike.image,
      paymentMethod: 'UPI',
      sellerName: 'CampusLoop Official',
      fulfillment: fulfillment,
      days: rentalDays
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('rentals') || '[]');
    const updatedRentals = [newRental, ...existing];
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));
    
    setRentedBikes(updatedRentals.map(r => r.bikeId));
    setShowSuccess(true);
    
    setTimeout(() => {
      setSelectedBike(null);
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div style={{ paddingBottom: '100px', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <div style={{ 
        minHeight: '85vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '20px',
        backgroundImage: "linear-gradient(rgba(18, 18, 18, 0.8), rgba(18, 18, 18, 0.95)), url('/hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        
        {/* Background glow effects */}
        <div style={{
          position: 'absolute', top: '20%', left: '20%', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%', zIndex: 0
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '20%', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%', zIndex: 0
        }} />

        {/* Hero Content */}
        <div style={{ maxWidth: '800px', textAlign: 'center', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          
          <div className="glass-panel" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500, border: '1px solid rgba(99,102,241,0.3)' }}>
            <Sparkles size={16} /> Powered by Smart AI Recommendations
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
            The Future of Campus <br/>
            <span style={{ color: 'var(--primary)', background: 'linear-gradient(to right, #a78bfa, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Resource Exchange
            </span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            A next-generation marketplace exclusively for your college. Buy, sell, and discover engineering tools with AI-curated suggestions tailored to your branch and year.
          </p>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1.1rem', borderRadius: '30px' }} onClick={() => navigate('/market')}>
              Explore Marketplace &rarr;
            </button>
            <button className="btn glass-panel" style={{ padding: '14px 28px', fontSize: '1.1rem', borderRadius: '30px', color: 'white' }} onClick={() => navigate('/add')}>
              Start Selling
            </button>
          </div>
        </div>

        {/* Floating Images (Hidden on mobile for cleaner look) */}
        <motion.div custom={0} variants={floatVariants} animate="animate" className="glass-panel hidden-mobile" style={{ position: 'absolute', top: '15%', left: '5%', width: '200px', height: '200px', borderRadius: '24px', overflow: 'hidden', padding: '8px', zIndex: 5, transform: 'rotate(-5deg)' }}>
          <img src="https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&q=80&w=400" alt="Drafting" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
        </motion.div>
        <motion.div custom={1} variants={floatVariants} animate="animate" className="glass-panel hidden-mobile" style={{ position: 'absolute', top: '10%', right: '2%', width: '220px', height: '240px', borderRadius: '24px', overflow: 'hidden', padding: '8px', zIndex: 5, transform: 'rotate(5deg)' }}>
          <img src="/casio_calculator.png" alt="Calculator" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
        </motion.div>
        <motion.div custom={2} variants={floatVariants} animate="animate" className="glass-panel hidden-mobile" style={{ position: 'absolute', bottom: '15%', left: '2%', width: '240px', height: '180px', borderRadius: '24px', overflow: 'hidden', padding: '8px', zIndex: 5, transform: 'rotate(3deg)' }}>
          <img src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=400" alt="Electronics" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
        </motion.div>
        <motion.div custom={3} variants={floatVariants} animate="animate" className="glass-panel hidden-mobile" style={{ position: 'absolute', bottom: '5%', right: '8%', width: '200px', height: '260px', borderRadius: '24px', overflow: 'hidden', padding: '8px', zIndex: 5, transform: 'rotate(-3deg)' }}>
          <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" alt="Books" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
        </motion.div>
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
          {OFFICIAL_BIKES.map((bike) => {
            const isRented = rentedBikes.includes(bike.id);
            return (
              <div key={bike.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', opacity: isRented ? 0.6 : 1 }}>
                <img src={bike.image} alt={bike.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px', filter: isRented ? 'grayscale(100%)' : 'none' }} />
                <h3 style={{ margin: '0 0 8px 0' }}>{bike.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', flex: 1 }}>{bike.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>₹{bike.price} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/day</span></span>
                  <button 
                    className={`btn ${isRented ? 'glass-panel' : 'btn-primary'}`}
                    style={{ padding: '8px 16px', borderRadius: '20px' }}
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
                    
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                      <img src={selectedBike.image} alt={selectedBike.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'white' }}>{selectedBike.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Official CampusRides Partner</div>
                        <div style={{ color: 'var(--primary)', fontWeight: '600', marginTop: '4px' }}>₹{selectedBike.price} / day</div>
                      </div>
                    </div>

                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Customer:</span>
                        <span style={{ fontWeight: 'bold' }}>{currentUser?.displayName || 'Student'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Seller:</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>CampusLoop Official</span>
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
