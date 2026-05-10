import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, TrendingUp, Search as SearchIcon, X } from 'lucide-react';
import ListingCard from '../components/marketplace/ListingCard';
import { MOCK_LISTINGS } from '../data/mockData';

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'first_year', label: '🎓 1st Year Essentials' },
  { id: 'Books & Notes', label: '📚 Books & Notes' },
  { id: 'Electronics', label: '💻 Electronics' },
  { id: 'Hostel Essentials', label: '🛏️ Hostel Essentials' },
  { id: 'Stationery', label: '✏️ Stationery' },
  { id: 'Bikes & Cycles', label: '🚲 Bikes & Cycles' },
  { id: 'Occasional', label: '🎉 Occasional' },
  { id: 'Girls Fashion', label: '👗 Girls Fashion' }
];

function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  // Advanced filters state
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterCondition, setFilterCondition] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');

  // Filter listings based on both category and search query
  const filteredListings = MOCK_LISTINGS.filter(item => {
    let matchesCategory = false;
    if (activeCategory === 'all') {
      matchesCategory = true;
    } else if (activeCategory === 'first_year') {
      matchesCategory = item.forFirstYear === true;
    } else {
      matchesCategory = item.category === activeCategory;
    }

    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCondition = filterCondition === 'all' || item.condition.toLowerCase() === filterCondition.toLowerCase();
    const matchesType = filterType === 'all' || item.type.toLowerCase() === filterType.toLowerCase();
    
    let matchesPrice = true;
    if (filterPrice === 'under_100') matchesPrice = item.price < 100;
    else if (filterPrice === '100_300') matchesPrice = item.price >= 100 && item.price <= 300;
    else if (filterPrice === '300_500') matchesPrice = item.price > 300 && item.price <= 500;
    else if (filterPrice === 'over_500') matchesPrice = item.price > 500;
    
    return matchesCategory && matchesSearch && matchesCondition && matchesType && matchesPrice;
  });

  return (
    <div className="container" style={{ paddingTop: '20px' }}>
      
      {/* Categories / Quick Filters */}
      <div className="categories-scroll no-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', marginBottom: '24px', paddingBottom: '8px' }}>
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-outline'}`} 
            style={{ padding: '8px 16px', borderRadius: '20px', whiteSpace: 'nowrap' }}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="section-header flex-between" style={{ marginBottom: '16px', position: 'relative' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
          {searchQuery ? (
            <><SearchIcon className="text-primary" size={20} color="var(--primary)" /> Results for "{searchQuery}"</>
          ) : (
            <><TrendingUp className="text-primary" size={20} color="var(--primary)" /> {activeCategory === 'all' ? 'Trending on Campus' : CATEGORIES.find(c => c.id === activeCategory)?.label || 'Items'}</>
          )}
        </h2>
        
        <button 
          className={`btn ${showFilterMenu || filterCondition !== 'all' || filterType !== 'all' || filterPrice !== 'all' ? 'btn-primary' : 'btn-outline'}`} 
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          <Filter size={14} /> Filter {(filterCondition !== 'all' || filterType !== 'all' || filterPrice !== 'all') && '(Active)'}
        </button>

        {showFilterMenu && (
          <div className="glass-panel" style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '10px',
            padding: '16px',
            width: '250px',
            zIndex: 100,
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            borderRadius: '12px'
          }}>
            <div className="flex-between" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Advanced Filters</h3>
              <X size={16} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowFilterMenu(false)} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Price</label>
              <select 
                className="input-field" 
                value={filterPrice} 
                onChange={(e) => setFilterPrice(e.target.value)}
                style={{ padding: '8px', fontSize: '0.9rem' }}
              >
                <option value="all">All Prices</option>
                <option value="under_100">Under ₹100</option>
                <option value="100_300">₹100 - ₹300</option>
                <option value="300_500">₹300 - ₹500</option>
                <option value="over_500">Over ₹500</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Type</label>
              <select 
                className="input-field" 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                style={{ padding: '8px', fontSize: '0.9rem' }}
              >
                <option value="all">All Types</option>
                <option value="sell">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="exchange">For Exchange</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Condition</label>
              <select 
                className="input-field" 
                value={filterCondition} 
                onChange={(e) => setFilterCondition(e.target.value)}
                style={{ padding: '8px', fontSize: '0.9rem' }}
              >
                <option value="all">Any Condition</option>
                <option value="new">New</option>
                <option value="good">Good</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn btn-outline" 
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}
                onClick={() => {
                  setFilterType('all');
                  setFilterCondition('all');
                  setFilterPrice('all');
                }}
              >
                Clear
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}
                onClick={() => setShowFilterMenu(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {filteredListings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
          No items found matching your filters.
        </div>
      ) : (
        <div className="marketplace-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
          gap: '20px' 
        }}>
          {filteredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Marketplace;
