import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';
import './ListingCard.css';

const ListingCard = React.memo(function ListingCard({ listing }) {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  
  const { 
    id,
    title, 
    price, 
    originalPrice, 
    images, 
    condition, 
    location, 
    seller, 
    type // 'sell', 'rent', 'exchange'
  } = listing;

  const isRent = type === 'rent';
  
  const toggleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div className="listing-card glass-panel" onClick={() => navigate(`/product/${id}`)}>
      <div className="listing-image-container">
        <img 
          src={images && images.length > 0 ? images[0] : ''} 
          alt={title} 
          className="listing-image"
          loading="lazy"
          decoding="async" 
        />
        <div className="listing-badges">
          <span className={`badge-type ${type}`}>{type === 'sell' ? 'BUY' : type.toUpperCase()}</span>
          <button className="btn-wishlist" onClick={toggleSave}>
            <Heart size={18} fill={isSaved ? "currentColor" : "none"} color={isSaved ? "#ef4444" : "currentColor"} />
          </button>
        </div>
      </div>
      
      <div className="listing-content">
        <div className="listing-price-row flex-between">
          <div className="price-info">
            <span className="current-price">₹{price}{isRent && <span className="rent-period">/mo</span>}</span>
            {originalPrice && <span className="original-price">₹{originalPrice}</span>}
          </div>
          <span className={`condition-badge condition-${condition.toLowerCase()}`}>
            {condition}
          </span>
        </div>
        
        <h3 className="listing-title">{title}</h3>
        
        <div className="listing-meta">
          <div className="meta-item">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="seller-info">
          <img src={seller.avatar} alt={seller.name} className="seller-avatar" loading="lazy" />
          <div className="seller-details">
            <span className="seller-name">{seller.name}</span>
            <div className="seller-rating">
              <Star size={12} className="star-icon" fill="currentColor" />
              <span>{seller.rating}</span>
            </div>
          </div>
          {seller.verified && (
             <div className="verified-badge" title="Verified Student">
               ✓
             </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ListingCard;
