import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Info } from 'lucide-react';
import { getPricePrediction } from '../utils/aiPrediction';

const CATEGORIES = [
  { id: 'first_year', label: '🎓 1st Year Essentials' },
  { id: 'Books & Notes', label: '📚 Books & Notes' },
  { id: 'Electronics', label: '💻 Electronics' },
  { id: 'Hostel Essentials', label: '🛏️ Hostel Essentials' },
  { id: 'Stationery', label: '✏️ Stationery' },
  { id: 'Bikes & Cycles', label: '🚲 Bikes & Cycles' },
  { id: 'Occasional', label: '🎉 Occasional' },
  { id: 'Girls Fashion', label: '👗 Girls Fashion' }
];

function AddListing() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Books & Notes',
    condition: 'Good',
    originalPrice: '',
    price: '',
    ageInMonths: '',
    type: 'sell'
  });

  const [aiData, setAiData] = useState(null);

  useEffect(() => {
    // Run prediction if we have originalPrice
    if (formData.originalPrice && !isNaN(formData.originalPrice)) {
      const orig = parseFloat(formData.originalPrice);
      const current = formData.price ? parseFloat(formData.price) : null;
      const age = formData.ageInMonths ? parseInt(formData.ageInMonths) : 0;
      
      const prediction = getPricePrediction(current, orig, formData.condition, age, formData.category);
      setAiData(prediction);
    } else {
      setAiData(null);
    }
  }, [formData.originalPrice, formData.price, formData.condition, formData.ageInMonths, formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would post to Firebase
    alert("Listing posted successfully!");
    navigate('/market');
  };

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <h2 style={{ marginBottom: '24px' }}>Add New Listing</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {/* Form Section */}
        <div style={{ flex: '1 1 500px' }}>
          <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
            
            <div style={{ marginBottom: '16px' }}>
              <label className="input-field" style={{ border: 'none', padding: 0, marginBottom: '8px', display: 'block' }}>Title</label>
              <input 
                type="text" 
                name="title"
                className="input-field" 
                placeholder="e.g. Engineering Mathematics Vol 1"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label className="input-field" style={{ border: 'none', padding: 0, marginBottom: '8px', display: 'block' }}>Category</label>
                <select name="category" className="input-field" value={formData.category} onChange={handleChange}>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label className="input-field" style={{ border: 'none', padding: 0, marginBottom: '8px', display: 'block' }}>Type</label>
                <select name="type" className="input-field" value={formData.type} onChange={handleChange}>
                  <option value="sell">Sell</option>
                  <option value="rent">Rent</option>
                  <option value="exchange">Exchange</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label className="input-field" style={{ border: 'none', padding: 0, marginBottom: '8px', display: 'block' }}>Condition</label>
                <select name="condition" className="input-field" value={formData.condition} onChange={handleChange}>
                  <option value="New">New</option>
                  <option value="Good">Good</option>
                  <option value="Used">Used</option>
                </select>
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label className="input-field" style={{ border: 'none', padding: 0, marginBottom: '8px', display: 'block' }}>Age (Months)</label>
                <input 
                  type="number" 
                  name="ageInMonths"
                  className="input-field" 
                  placeholder="e.g. 6"
                  value={formData.ageInMonths}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label className="input-field" style={{ border: 'none', padding: 0, marginBottom: '8px', display: 'block' }}>Original MRP (₹)</label>
                <input 
                  type="number" 
                  name="originalPrice"
                  className="input-field" 
                  placeholder="e.g. 650"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label className="input-field" style={{ border: 'none', padding: 0, marginBottom: '8px', display: 'block', color: 'var(--primary)', fontWeight: 600 }}>Your Price (₹)</label>
                <input 
                  type="number" 
                  name="price"
                  className="input-field" 
                  placeholder="e.g. 350"
                  value={formData.price}
                  onChange={handleChange}
                  style={{ border: '1px solid var(--primary)' }}
                  required={formData.type !== 'exchange'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label className="input-field" style={{ border: 'none', padding: 0, marginBottom: '8px', display: 'block' }}>Description</label>
              <textarea 
                name="description"
                className="input-field" 
                rows="4"
                placeholder="Describe any wear and tear, history, etc..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              Post Listing
            </button>
          </form>
        </div>

        {/* AI Insight Section */}
        <div style={{ flex: '1 1 350px' }}>
          <div className="glass-panel" style={{ 
            padding: '24px', 
            borderRadius: '12px',
            position: 'sticky',
            top: '80px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            background: 'linear-gradient(145deg, var(--bg-elevated) 0%, rgba(99, 102, 241, 0.05) 100%)'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', margin: '0 0 20px 0', fontSize: '1.2rem' }}>
              <Sparkles size={20} /> Smart AI Recommendations
            </h3>

            {!aiData ? (
              <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', padding: '20px 0' }}>
                <Info size={18} />
                <span>Enter the original price and condition to get AI pricing insights and demand analytics.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Recommended Price */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ fontSize: '1.5rem' }}>💡</div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-color)', marginBottom: '4px' }}>Recommended Price: ₹{aiData.recommendedPrice}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Based on depreciation and current market value ({aiData.suggestion})</div>
                  </div>
                </div>

                {/* Demand Level */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ fontSize: '1.5rem' }}>📈</div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-color)', marginBottom: '4px' }}>
                      Demand Level: <span style={{ color: aiData.demandLevel === 'High' ? 'var(--accent)' : 'var(--primary)' }}>{aiData.demandLevel}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Sale Tip */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ fontSize: '1.5rem' }}>⏰</div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-color)', marginBottom: '4px' }}>{aiData.quickSaleTip}</div>
                  </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '8px 0' }} />

                {/* Demand Insights Details */}
                <div>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--text-color)' }}>
                    📊 Demand Insight:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '24px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {aiData.demandInsights.map((insight, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{insight}</li>
                    ))}
                  </ul>
                </div>

                {/* Dynamic Insights Details (Based on Type) */}
                {formData.type === 'rent' ? (
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--text-color)' }}>
                      🚲 Rental Insight:
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '24px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <li style={{ marginBottom: '4px' }}>Suggested rent: ₹{Math.max(10, Math.round(aiData.recommendedPrice * 0.05))}/day</li>
                      <li style={{ marginBottom: '4px' }}>Ideal rental duration: 2–3 days</li>
                      <li style={{ marginBottom: '4px' }}>High demand on weekends</li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--text-color)' }}>
                      ⏰ Selling Insight:
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '24px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <li style={{ marginBottom: '4px' }}>Best time: Evening (6–9 PM)</li>
                      <li style={{ marginBottom: '4px' }}>Higher visibility during weekends</li>
                    </ul>
                  </div>
                )}

                {/* Likely Buyers Details */}
                <div>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--text-color)' }}>
                    🎯 Likely Buyers:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '24px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <li style={{ marginBottom: '4px' }}>Mechanical students</li>
                    <li style={{ marginBottom: '4px' }}>Hostel A residents</li>
                  </ul>
                </div>

                {/* Market Comparison (Only shows if price is entered) */}
                {formData.price && (
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--text-color)' }}>
                      📉 Market Comparison:
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '24px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <li style={{ marginBottom: '4px' }}>Similar item avg price: ₹{Math.round(aiData.recommendedPrice * 1.05)}</li>
                      <li style={{ marginBottom: '4px' }}>
                        {parseFloat(formData.price) > Math.round(aiData.recommendedPrice * 1.05) 
                          ? 'Your price is slightly higher' 
                          : parseFloat(formData.price) < Math.round(aiData.recommendedPrice * 1.05) 
                            ? 'Your price is slightly lower (good for quick sale)' 
                            : 'Your price perfectly matches the market average'}
                      </li>
                    </ul>
                  </div>
                )}

                {/* Sale Prediction */}
                <div>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--text-color)' }}>
                    ⚡ Sale Prediction:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '24px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <li style={{ marginBottom: '4px' }}>
                      Expected to sell within {formData.price && parseFloat(formData.price) > Math.round(aiData.recommendedPrice * 1.05) ? '5–7' : formData.price && parseFloat(formData.price) < Math.round(aiData.recommendedPrice * 1.05) ? '1–2' : '2–3'} days
                    </li>
                    <li style={{ marginBottom: '4px' }}>
                      {formData.price && parseFloat(formData.price) > Math.round(aiData.recommendedPrice * 1.05) ? 'Moderate interest probability' : 'High interest probability'}
                    </li>
                  </ul>
                </div>

                {/* Status Badge if price entered */}
                {formData.price && (
                  <div style={{ 
                    marginTop: '8px',
                    padding: '8px 12px', 
                    borderRadius: '8px', 
                    backgroundColor: 'var(--bg-card)', 
                    borderLeft: `4px solid ${aiData.color}`,
                    fontWeight: 500,
                    fontSize: '0.9rem'
                  }}>
                    Your Price Status: <span style={{ color: aiData.color }}>{aiData.status}</span>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddListing;
