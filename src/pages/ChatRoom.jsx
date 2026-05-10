import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Image as ImageIcon, Handshake } from 'lucide-react';

function ChatRoom() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const messagesEndRef = useRef(null);

  // Mock initial load
  useEffect(() => {
    if (chatId?.startsWith('negotiate_')) {
      setIsNegotiating(true);
    }
    
    setMessages([
      { id: 1, text: 'Hi, I am interested in your item.', sender: 'them', time: '10:00 AM' },
      { id: 2, text: 'Hello! Yes, it is still available.', sender: 'me', time: '10:05 AM' },
    ]);
  }, [chatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendOffer = (e) => {
    e.preventDefault();
    if (!offerPrice.trim()) return;

    const msg = {
      id: Date.now(),
      type: 'offer',
      amount: offerPrice,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, msg]);
    setOfferPrice('');
    setIsNegotiating(false);

    // Mock seller considering offer
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        type: 'text',
        text: `I'll accept ₹${offerPrice}. When can you meet?`,
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 3000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      type: 'text',
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--bg-dark)', zIndex: 100, position: 'fixed', top: 0, left: 0, right: 0 }}>
      {/* Chat Header */}
      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: 0, borderBottom: '1px solid var(--border-color)', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
        <img src="https://i.pravatar.cc/150?img=11" alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
        <div>
          <div style={{ fontWeight: '600', color: 'white' }}>Rahul S.</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>Online</div>
        </div>
      </div>

      {/* Negotiation Banner */}
      {isNegotiating && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="glass-panel"
          style={{ margin: '16px', padding: '16px', backgroundColor: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'white', fontWeight: 'bold' }}>
            <Handshake size={18} color="var(--primary)" />
            Make an Offer
          </div>
          <form onSubmit={handleSendOffer} style={{ display: 'flex', gap: '8px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }}>₹</span>
              <input 
                type="number" 
                placeholder="Enter amount"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 24px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-elevated)', color: 'white' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px' }}>Send Offer</button>
          </form>
          <button onClick={() => setIsNegotiating(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '8px', cursor: 'pointer', width: '100%' }}>Cancel</button>
        </motion.div>
      )}

      {/* Chat Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ 
            alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
            maxWidth: '75%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: msg.sender === 'me' ? 'flex-end' : 'flex-start'
          }}>
            {msg.type === 'offer' ? (
              <div style={{
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid #F59E0B',
                padding: '16px',
                borderRadius: '16px',
                minWidth: '200px'
              }}>
                <div style={{ fontSize: '0.8rem', color: '#F59E0B', marginBottom: '4px', fontWeight: 'bold' }}>OFFER SENT</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>₹{msg.amount}</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-outline" disabled style={{ flex: 1, padding: '6px', fontSize: '0.8rem', opacity: 0.5 }}>Pending</button>
                </div>
              </div>
            ) : (
              <div style={{
                backgroundColor: msg.sender === 'me' ? 'var(--primary)' : 'var(--bg-elevated)',
                color: 'white',
                padding: '12px 16px',
                borderRadius: msg.sender === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                fontSize: '0.9rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}>
                {msg.text}
              </div>
            )}
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', padding: '0 4px' }}>
              {msg.time}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div style={{ padding: '16px', backgroundColor: 'var(--bg-elevated)', borderTop: '1px solid var(--border-color)' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button type="button" onClick={() => setIsNegotiating(!isNegotiating)} style={{ background: 'none', border: 'none', color: isNegotiating ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer' }} title="Negotiate">
            <Handshake size={24} />
          </button>
          <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <ImageIcon size={24} />
          </button>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ 
              flex: 1, 
              padding: '12px 16px', 
              borderRadius: '24px', 
              border: 'none', 
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'white',
              outline: 'none'
            }} 
          />
          <button type="submit" disabled={!newMessage.trim()} style={{ 
            background: newMessage.trim() ? 'var(--primary)' : 'rgba(255,255,255,0.1)', 
            border: 'none', 
            color: 'white', 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: newMessage.trim() ? 'pointer' : 'default',
            transition: 'background-color 0.2s'
          }}>
            <Send size={18} style={{ marginLeft: '2px' }} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
