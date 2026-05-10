import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, TrendingUp, Search as SearchIcon, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ListingCard from '../components/marketplace/ListingCard';
import { MOCK_LISTINGS } from '../data/mockData';

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'Electronics', label: '💻 Electronics' },
  { id: 'Stationery', label: '✏️ Stationery' },
  { id: 'Books & Notes', label: '📚 Books & Notes' },
  { id: 'Tools', label: '🔧 Tools' },
  { id: 'Accessories', label: '🎒 Accessories' },
  { id: 'Hostel Essentials', label: '🛏️ Hostel Essentials' },
  { id: 'Vehicles', label: '🚲 Vehicles' }
];

const BRANCHES = ['Computer Science', 'Mechanical', 'Electronics', 'Civil'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const ListingSkeleton = () => (
  <div className="glass-panel" style={{ height: '320px', display: 'flex', flexDirection: 'column', borderRadius: '16px', overflow: 'hidden' }}>
    <div className="skeleton" style={{ width: '100%', paddingTop: '75%' }} />
    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div className="skeleton" style={{ width: '40%', height: '24px', borderRadius: '4px' }} />
      <div className="skeleton" style={{ width: '90%', height: '16px', borderRadius: '4px' }} />
      <div className="skeleton" style={{ width: '60%', height: '16px', borderRadius: '4px' }} />
      <div style={{ marginTop: 'auto', display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="skeleton" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="skeleton" style={{ width: '50%', height: '12px', borderRadius: '4px' }} />
          <div className="skeleton" style={{ width: '30%', height: '10px', borderRadius: '4px' }} />
        </div>
      </div>
    </div>
  </div>
);

function Marketplace() {
  const [searchParams] = useSearchParams();
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterCondition, setFilterCondition] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');

  // AI Recommendation State
  const [studentBranch, setStudentBranch] = useState('');
  const [studentYear, setStudentYear] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  // Global Listings Data
  const [allListings, setAllListings] = useState([]);

  // Sync URL search to local state if it changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);
    
    // Load local storage listings
    const userListings = JSON.parse(localStorage.getItem('userListings') || '[]');
    setAllListings([...userListings, ...MOCK_LISTINGS]);
  }, [searchParams]);

  // Simulate network loading for filters
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600); // Reduced delay for faster UI
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory, filterType, filterCondition, filterPrice, studentBranch, studentYear]);

  // AI Logic - Memoized
  const recommendedItems = React.useMemo(() => {
    if (!studentBranch && !studentYear) return [];
    
    let recs = [...allListings];
    
    // 1st Year Focus
    if (studentYear === '1st Year') {
      recs = recs.filter(item => item.forFirstYear);
    } else {
      // Branch Focus
      if (studentBranch === 'Computer Science') {
        recs = recs.filter(item => ['Electronics', 'Accessories'].includes(item.category));
      } else if (studentBranch === 'Mechanical') {
        recs = recs.filter(item => ['Tools', 'Stationery'].includes(item.category));
      } else if (studentBranch === 'Electronics') {
        recs = recs.filter(item => ['Electronics', 'Tools'].includes(item.category));
      }
    }
    
    return recs.slice(0, 4); // Top 4
  }, [studentBranch, studentYear, allListings]);

  // Standard Filtering Logic - Memoized
  const filteredListings = React.useMemo(() => {
    return allListings.filter(item => {
      // 1. Search
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      // 2. Category
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      
      // 3. Condition
      const matchesCondition = filterCondition === 'all' || item.condition.toLowerCase() === filterCondition.toLowerCase();
      
      // 4. Type
      const matchesType = filterType === 'all' || item.type.toLowerCase() === filterType.toLowerCase();
      
      // 5. Price
      let matchesPrice = true;
      if (filterPrice === 'under_500') matchesPrice = item.price < 500;
      else if (filterPrice === '500_1500') matchesPrice = item.price >= 500 && item.price <= 1500;
      else if (filterPrice === 'over_1500') matchesPrice = item.price > 1500;
      
      return matchesSearch && matchesCategory && matchesCondition && matchesType && matchesPrice;
    });
  }, [searchQuery, activeCategory, filterCondition, filterType, filterPrice, allListings]);

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '100px' }}>
      
      {/* 1. INSTANT SEARCH & FILTERS BAR */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', position: 'relative' }}>
          <SearchIcon size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search products instantly..." 
            className="input-field"
            style={{ paddingLeft: '48px', height: '50px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '1.05rem' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          )}
        </div>
        
        <div style={{ position: 'relative' }}>
          <button 
            className={`btn ${showFilterMenu || filterCondition !== 'all' || filterType !== 'all' || filterPrice !== 'all' ? 'btn-primary' : 'glass-panel'}`} 
            style={{ height: '50px', borderRadius: '16px', padding: '0 24px' }}
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <Filter size={18} /> Filters {(filterCondition !== 'all' || filterType !== 'all' || filterPrice !== 'all') && '•'}
          </button>

          {/* ADVANCED FILTER DROPDOWN */}
          <AnimatePresence>
            {showFilterMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="glass-panel" 
                style={{ position: 'absolute', top: '100%', right: 0, marginTop: '12px', padding: '20px', width: '280px', zIndex: 100, backgroundColor: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', borderRadius: '16px' }}
              >
                <div className="flex-between" style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'white' }}>Advanced Filters</h3>
                  <X size={18} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowFilterMenu(false)} />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Price Range</label>
                  <select className="input-field" value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)} style={{ padding: '10px', fontSize: '0.95rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <option value="all">All Prices</option>
                    <option value="under_500">Under ₹500</option>
                    <option value="500_1500">₹500 - ₹1500</option>
                    <option value="over_1500">Over ₹1500</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Listing Type</label>
                  <select className="input-field" value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: '10px', fontSize: '0.95rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <option value="all">All Types</option>
                    <option value="sell">Buy</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Condition</label>
                  <select className="input-field" value={filterCondition} onChange={(e) => setFilterCondition(e.target.value)} style={{ padding: '10px', fontSize: '0.95rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <option value="all">Any Condition</option>
                    <option value="new">New</option>
                    <option value="good">Good</option>
                    <option value="used">Used</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => { setFilterType('all'); setFilterCondition('all'); setFilterPrice('all'); }}>Clear</button>
                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setShowFilterMenu(false)}>Apply</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. CATEGORY PILLS */}
      <div className="categories-scroll no-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', marginBottom: '32px', paddingBottom: '8px' }}>
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'glass-panel'}`} 
            style={{ padding: '10px 20px', borderRadius: '100px', whiteSpace: 'nowrap', border: activeCategory === cat.id ? 'none' : '1px solid rgba(255,255,255,0.05)', color: activeCategory === cat.id ? 'white' : 'var(--text-muted)' }}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. AI SMART RECOMMENDATIONS SECTION */}
      {!searchQuery && activeCategory === 'all' && (
        <div style={{ marginBottom: '40px' }}>
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', border: '1px solid rgba(99,102,241,0.2)', background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(0,0,0,0) 100%)' }}>
            <div className="flex-between" style={{ flexWrap: 'wrap', gap: '16px', marginBottom: showRecommendations && recommendedItems.length > 0 ? '24px' : '0' }}>
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem', color: 'white', margin: '0 0 8px 0' }}>
                  <Sparkles color="#a78bfa" size={24} /> AI Smart Recommendations
                </h2>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Personalized resources based on your academic profile.</p>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <select className="input-field" value={studentBranch} onChange={(e) => { setStudentBranch(e.target.value); setShowRecommendations(true); }} style={{ padding: '10px 16px', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: studentBranch ? 'white' : 'var(--text-muted)' }}>
                  <option value="" disabled>Select Branch</option>
                  {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <select className="input-field" value={studentYear} onChange={(e) => { setStudentYear(e.target.value); setShowRecommendations(true); }} style={{ padding: '10px 16px', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: studentYear ? 'white' : 'var(--text-muted)' }}>
                  <option value="" disabled>Select Year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <AnimatePresence>
              {showRecommendations && recommendedItems.length > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '8px', backgroundColor: 'rgba(99,102,241,0.1)', color: '#a78bfa', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px', border: '1px dashed rgba(167,139,250,0.3)' }}>
                    {studentYear === '1st Year' ? '🎓 Popular among 1st Year Students' : `⚡ Highly recommended for ${studentBranch} students`}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                    {isLoading ? (
                      Array(4).fill(0).map((_, i) => <ListingSkeleton key={`rec-skel-${i}`} />)
                    ) : (
                      recommendedItems.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {showRecommendations && recommendedItems.length === 0 && (
              <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>Select both branch and year to see tailored recommendations!</p>
            )}
          </div>
        </div>
      )}

      {/* 4. MAIN FEED */}
      <div className="section-header" style={{ marginBottom: '20px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: 'white' }}>
          {searchQuery ? (
            <><SearchIcon color="var(--primary)" size={22} /> Results for "{searchQuery}"</>
          ) : (
            <><TrendingUp color="var(--primary)" size={22} /> {activeCategory === 'all' ? 'All Resources' : CATEGORIES.find(c => c.id === activeCategory)?.label}</>
          )}
        </h2>
      </div>

      {isLoading ? (
        <div className="marketplace-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {Array(8).fill(0).map((_, i) => <ListingSkeleton key={`feed-skel-${i}`} />)}
        </div>
      ) : filteredListings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <SearchIcon size={48} color="var(--text-muted)" style={{ marginBottom: '16px', opacity: 0.5 }} />
          <h3 style={{ color: 'white', margin: '0 0 8px 0' }}>No items found</h3>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Try adjusting your search or clearing filters.</p>
          {(searchQuery || activeCategory !== 'all') && (
            <button className="btn btn-outline" style={{ marginTop: '20px' }} onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <motion.div layout className="marketplace-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          <AnimatePresence>
            {filteredListings.map(listing => (
              <motion.div key={listing.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default Marketplace;
