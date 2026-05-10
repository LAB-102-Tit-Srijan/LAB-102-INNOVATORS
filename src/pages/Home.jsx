import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, TrendingUp, Search as SearchIcon } from 'lucide-react';
import ListingCard from '../components/marketplace/ListingCard';
import { MOCK_LISTINGS } from '../data/mockData';

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'Books & Notes', label: '📚 Books & Notes' },
  { id: 'Electronics', label: '💻 Electronics' },
  { id: 'Hostel Essentials', label: '🛏️ Hostel Essentials' },
  { id: 'Stationery', label: '✏️ Stationery' },
  { id: 'Bikes & Cycles', label: '🚲 Bikes & Cycles' },
  { id: 'Occasional', label: '🎉 Occasional' },
  { id: 'Girls Fashion', label: '👗 Girls Fashion' }
];

function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  // Filter listings based on both category and search query
  const filteredListings = MOCK_LISTINGS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
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

      <div className="section-header flex-between" style={{ marginBottom: '16px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
          {searchQuery ? (
            <><SearchIcon className="text-primary" size={20} color="var(--primary)" /> Results for "{searchQuery}"</>
          ) : (
            <><TrendingUp className="text-primary" size={20} color="var(--primary)" /> {activeCategory === 'all' ? 'Trending on Campus' : CATEGORIES.find(c => c.id === activeCategory)?.label || 'Items'}</>
          )}
        </h2>
        <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          <Filter size={14} /> Filter
        </button>
      </div>

      {filteredListings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
          No items found in this category.
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

export default Home;
