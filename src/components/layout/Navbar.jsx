import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/');
    }
  };

  const MOCK_NOTIFICATIONS = [
    { id: 1, text: 'Rahul S. accepted your offer for "Engineering Mathematics"', time: '2h ago', unread: true },
    { id: 2, text: 'New item added in your favourite category "Electronics"', time: '5h ago', unread: true },
    { id: 3, text: 'Your rental period for "Hero Sprint Pro" ends tomorrow', time: '1d ago', unread: false },
  ];

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-content container flex-between">
        <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <Menu className="mobile-menu-icon" size={24} />
          <h2>CampusLoop</h2>
        </div>
        
        <div className="navbar-search hidden-mobile">
          <form className="search-bar" onSubmit={handleSearch}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search resources, books..." 
              className="input-field" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="navbar-actions">
          <div className="icon-btn" style={{ position: 'relative' }}>
            <div onClick={() => setShowNotifications(!showNotifications)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Bell size={20} />
              <span className="badge">2</span>
            </div>
            
            {showNotifications && (
              <div className="notifications-dropdown" style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '15px',
                width: '320px',
                backgroundColor: 'var(--bg-elevated)',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                zIndex: 1000,
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                cursor: 'default'
              }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem' }}>Notifications</h3>
                  <X size={18} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowNotifications(false)} />
                </div>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {MOCK_NOTIFICATIONS.map(notif => (
                    <div key={notif.id} style={{ 
                      padding: '12px 16px', 
                      borderBottom: '1px solid var(--border-color)',
                      backgroundColor: notif.unread ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                      display: 'flex',
                      gap: '12px',
                      cursor: 'pointer'
                    }} onClick={() => setShowNotifications(false)}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        backgroundColor: notif.unread ? 'var(--primary)' : 'transparent',
                        marginTop: '6px',
                        flexShrink: 0
                      }}></div>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: 'var(--text-color)' }}>{notif.text}</p>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '12px', textAlign: 'center', cursor: 'pointer', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500 }} onClick={() => setShowNotifications(false)}>
                  Mark all as read
                </div>
              </div>
            )}
          </div>
          <div className="user-avatar hidden-mobile" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
            {currentUser ? (
              <img src={`https://ui-avatars.com/api/?name=${currentUser.displayName}&background=6366F1&color=fff`} alt={currentUser.displayName} />
            ) : (
              <img src="https://i.pravatar.cc/150?img=11" alt="Guest" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
