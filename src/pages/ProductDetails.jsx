import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, MapPin, ShieldCheck, Clock, Tag, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPricePrediction, formatProductAge } from '../utils/aiPrediction';
import { MOCK_LISTINGS } from '../data/mockData';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Simulate API fetch by finding the item in the array
    const data = MOCK_LISTINGS.find(item => item.id.toString() === id);
    setProduct(data);
    
    if (data) {
      const pred = getPricePrediction(data.price, data.originalPrice, data.condition, data.ageInMonths, data.category);
      setPrediction(pred);
    }
  }, [id]);

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
            {product.type.toUpperCase()}
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
              style={{ flex: 1, borderColor: 'var(--primary)', color: 'var(--primary)' }}
              onClick={() => navigate(`/chat/negotiate_${product.id}`)}
            >
              Negotiate Price
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }}>
              Buy Now
            </button>
          </div>
        )}
      </div>

    </motion.div>
  );
}

export default ProductDetails;
