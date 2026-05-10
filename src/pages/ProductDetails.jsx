import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, MapPin, ShieldCheck, Clock, Tag, Star, ChevronLeft, ChevronRight, X, ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';
import { getPricePrediction, formatProductAge } from '../utils/aiPrediction';
import { MOCK_LISTINGS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Checkout State
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: summary, 2: payment, 3: success
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiMethod, setUpiMethod] = useState('');

  useEffect(() => {
    // Simulate API fetch by finding the item in the array
    const data = MOCK_LISTINGS.find(item => item.id.toString() === id);
    setProduct(data);
    
    if (data) {
      const pred = getPricePrediction(data.price, data.originalPrice, data.condition, data.ageInMonths, data.category);
      setPrediction(pred);
    }
  }, [id]);

  const handlePayment = () => {
    // Generate Invoice
    const invoiceId = 'INV-' + Math.floor(100000 + Math.random() * 900000);
    const newPurchase = {
      id: invoiceId,
      date: new Date().toLocaleDateString(),
      productTitle: product.title,
      price: product.price,
      image: product.images[0],
      paymentMethod: paymentMethod === 'upi' ? `UPI (${upiMethod})` : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Netbanking',
      sellerName: product.seller.name
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('purchases') || '[]');
    localStorage.setItem('purchases', JSON.stringify([newPurchase, ...existing]));

    setCheckoutStep(3);
  };

  if (!product) return <div className="container" style={{ paddingTop: '20px' }}>Loading...</div>;

  const isRent = product.type === 'rent';

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      style={{ paddingBottom: '90px' }}
    >
      {/* Top Image Carousel & Back Button */}
      <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: '#000' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
        >
          <ArrowLeft size={24} />
        </button>
        
        <img 
          src={product.images && product.images.length > 0 ? product.images[currentImageIndex] : ''} 
          alt={product.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        
        {/* Carousel Controls */}
        {product.images && product.images.length > 1 && (
          <>
            <button 
              onClick={() => setCurrentImageIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
              style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setCurrentImageIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
              style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
            >
              <ChevronRight size={24} />
            </button>
            {/* Dots */}
            <div style={{ position: 'absolute', bottom: '16px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 10 }}>
              {product.images.map((_, idx) => (
                <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: idx === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)', transition: 'background-color 0.3s' }} />
              ))}
            </div>
          </>
        )}

        <div style={{ position: 'absolute', bottom: '16px', left: '16px', zIndex: 10 }}>
          <span className={`badge-type ${product.type}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            {product.type === 'sell' ? 'BUY' : product.type.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '20px' }}>
        {/* Title & Price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '1.5rem', lineHeight: 1.3, flex: 1, marginRight: '16px' }}>{product.title}</h1>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>₹{product.price}{isRent ? '/day' : ''}</div>
            {product.originalPrice && <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>MRP ₹{product.originalPrice}</div>}
          </div>
        </div>

        {/* Product Meta */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '16px' }}>
            <Tag size={14} /> {product.condition}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '16px' }}>
            <Clock size={14} /> {formatProductAge(product.ageInMonths)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '16px' }}>
            <MapPin size={14} /> {product.location}
          </div>
        </div>

        {/* AI Premium Insights */}
        {prediction && !isRent && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ 
              backgroundColor: 'rgba(99, 102, 241, 0.05)', 
              border: '1px solid rgba(99, 102, 241, 0.3)', 
              borderRadius: '12px', 
              padding: '20px', 
              marginBottom: '24px',
            }}
          >
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 20px 0', fontSize: '1.1rem', color: 'var(--primary)' }}>
              🤖 AI Premium Insights
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem', background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '12px' }}>💰</span>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Suggested Price</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-color)', fontSize: '1.1rem' }}>₹{prediction.recommendedPrice}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem', background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '12px' }}>📊</span>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Demand</div>
                  <div style={{ fontWeight: 'bold', color: prediction.demandLevel === 'High' ? 'var(--accent)' : 'var(--text-color)', fontSize: '1.1rem' }}>{prediction.demandLevel}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem', background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '12px' }}>⏰</span>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Best Time</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-color)', fontSize: '1.1rem' }}>Evening</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem', background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '12px' }}>⚡</span>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Sale Chance</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-color)', fontSize: '1.1rem' }}>Fast</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Description</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {product.description}
          </p>
        </div>

        {/* Seller Info */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <img src={product.seller.avatar} alt={product.seller.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
              {product.seller.name}
              {product.seller.verified && <ShieldCheck size={16} color="var(--primary)" title="Verified Student" />}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>★ {product.seller.rating}</span>
              <span style={{ color: product.seller.trustScore >= 90 ? 'var(--accent)' : '#F59E0B', fontWeight: '500' }}>
                Trust Score: {product.seller.trustScore}%
              </span>
            </div>
          </div>
          <button 
            className="btn btn-outline" 
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => navigate(`/chat/new_${product.seller.id}`)}
          >
            Chat
          </button>
        </div>

        {/* AI Safety Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel"
          style={{
            padding: '16px',
            marginBottom: '32px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            borderRadius: '12px'
          }}
        >
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 12px 0', fontSize: '1.05rem', color: '#10B981' }}>
            🔐 AI Safety Insight:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '24px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '4px' }}>Seller reliability: {product.seller.trustScore >= 90 ? 'High' : 'Medium'}</li>
            <li style={{ marginBottom: '4px' }}>Low risk of fraud</li>
            <li style={{ marginBottom: '4px' }}>{product.seller.verified ? 'Verified profile activity' : 'Standard profile activity'}</li>
          </ul>
        </motion.div>

        {/* Reviews Section */}
        {product.reviews && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Reviews & Feedback <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 'normal' }}>({product.reviews.length})</span>
            </h3>
            
            {product.reviews.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic', padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                No reviews yet. Be the first to transact!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {product.reviews.map(review => (
                  <div key={review.id} style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontWeight: '600', color: 'white', fontSize: '0.95rem' }}>{review.user}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{review.date}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={14} fill={star <= review.rating ? '#F59E0B' : 'none'} color={star <= review.rating ? '#F59E0B' : 'var(--border-color)'} />
                      ))}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      "{review.text}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Fixed Bottom Action Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px', backgroundColor: 'var(--bg-elevated)', borderTop: '1px solid var(--border-color)', zIndex: 50 }}>
        {isRent ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '80px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Days</label>
              <input 
                type="number" 
                min="1" 
                value={rentalDays} 
                onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-dark)', color: 'white', textAlign: 'center' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Rent</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>₹{product.price * rentalDays}</div>
            </div>
            <button className="btn btn-primary" style={{ flex: 1.5, backgroundColor: 'var(--accent)' }}>
              Request Rental
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn btn-outline" 
              style={{ flex: 1, borderColor: 'var(--primary)', color: 'var(--primary)', gap: '8px' }}
              onClick={() => alert("Added to cart!")}
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button 
              className="btn btn-primary" 
              style={{ flex: 1 }}
              onClick={() => setShowCheckout(true)}
            >
              Buy Now
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ width: '100%', maxWidth: '600px', backgroundColor: 'var(--bg-dark)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              {checkoutStep === 1 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Order Summary</h2>
                    <button onClick={() => setShowCheckout(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                  </div>

                  <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-muted)' }}>Deliver to</h4>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{currentUser?.displayName || 'Student Name'}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Room 402, Hostel B, Engineering Campus</p>
                  </div>

                  <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      <img src={product.images[0]} alt={product.title} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{product.title}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Qty: 1</div>
                      </div>
                    </div>
                    
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>MRP</span>
                        <span style={{ textDecoration: 'line-through' }}>₹{product.originalPrice || product.price + 500}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Discount</span>
                        <span style={{ color: 'var(--accent)' }}>-₹{(product.originalPrice || product.price + 500) - product.price}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        <span>Total Price</span>
                        <span>₹{product.price}</span>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }} onClick={() => setCheckoutStep(2)}>
                    Proceed to Payment
                  </button>
                </div>
              )}

              {checkoutStep === 2 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button onClick={() => setCheckoutStep(1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}><ArrowLeft size={20} /></button>
                      <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Payment Options</h2>
                    </div>
                    <button onClick={() => setShowCheckout(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    <div className={`glass-panel ${paymentMethod === 'upi' ? 'active-payment' : ''}`} style={{ padding: '16px', border: paymentMethod === 'upi' ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }} onClick={() => setPaymentMethod('upi')}>
                      <div style={{ fontWeight: 'bold', marginBottom: paymentMethod === 'upi' ? '12px' : '0' }}>UPI</div>
                      {paymentMethod === 'upi' && (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                          {['GPay', 'PhonePe', 'Paytm'].map(upi => (
                            <button key={upi} className={`btn ${upiMethod === upi ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }} onClick={(e) => { e.stopPropagation(); setUpiMethod(upi); }}>
                              {upi}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="glass-panel" style={{ padding: '16px', border: paymentMethod === 'netbanking' ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }} onClick={() => setPaymentMethod('netbanking')}>
                      <div style={{ fontWeight: 'bold' }}>Netbanking</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '16px', border: paymentMethod === 'cod' ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }} onClick={() => setPaymentMethod('cod')}>
                      <div style={{ fontWeight: 'bold' }}>Cash on Delivery</div>
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '16px', opacity: (paymentMethod === 'upi' && !upiMethod) || !paymentMethod ? 0.5 : 1 }} 
                    disabled={(paymentMethod === 'upi' && !upiMethod) || !paymentMethod}
                    onClick={handlePayment}
                  >
                    Pay ₹{product.price}
                  </button>
                </div>
              )}

              {checkoutStep === 3 && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <CheckCircle size={64} color="var(--accent)" style={{ margin: '0 auto 24px auto' }} />
                  <h2 style={{ marginBottom: '8px' }}>Order Confirmed!</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Your invoice has been saved to your profile.</p>
                  <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }} onClick={() => { setShowCheckout(false); navigate('/profile'); }}>
                    View Invoice in Profile
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default ProductDetails;
