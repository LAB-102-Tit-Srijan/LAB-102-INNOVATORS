import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_CHATS = [
  {
    id: 'chat_1',
    user: { name: 'Rahul S.', avatar: 'https://i.pravatar.cc/150?img=11' },
    lastMessage: 'Is the engineering math book still available?',
    time: '10:30 AM',
    unread: 2,
    listing: 'Engineering Mathematics Vol 1'
  },
  {
    id: 'chat_2',
    user: { name: 'Priya M.', avatar: 'https://i.pravatar.cc/150?img=5' },
    lastMessage: 'I can meet at the library at 5 PM.',
    time: 'Yesterday',
    unread: 0,
    listing: 'Casio fx-991EX Calculator'
  }
];

function ChatList() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ paddingTop: '20px' }}>
      <h2 style={{ marginBottom: '16px' }}>Messages</h2>
      
      <div className="search-bar" style={{ marginBottom: '24px' }}>
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search messages..." className="input-field" style={{ width: '100%' }} />
      </div>

      <div className="chat-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {MOCK_CHATS.map(chat => (
          <div 
            key={chat.id} 
            className="chat-item glass-panel" 
            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', cursor: 'pointer', transition: 'background-color 0.2s' }}
            onClick={() => navigate(`/chat/${chat.id}`)}
          >
            <img src={chat.user.avatar} alt={chat.user.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
            
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600', color: 'white' }}>{chat.user.name}</span>
                <span style={{ fontSize: '0.75rem', color: chat.unread > 0 ? 'var(--primary)' : 'var(--text-muted)' }}>{chat.time}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '4px' }}>
                Re: {chat.listing}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '0.85rem', 
                  color: chat.unread > 0 ? 'white' : 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {chat.lastMessage}
                </span>
                {chat.unread > 0 && (
                  <span style={{ backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
