import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();

  const floatVariants = {
    animate: (i) => ({
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.5,
      }
    })
  };

  return (
    <div className="container" style={{ 
      minHeight: 'calc(100vh - 140px)', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      paddingTop: '20px',
      overflow: 'hidden'
    }}>
      
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '20%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        zIndex: 0
      }} />

      {/* Hero Content */}
      <div style={{ 
        maxWidth: '800px', 
        textAlign: 'center', 
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        
        <div className="glass-panel" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '6px 16px', 
          borderRadius: '20px',
          color: 'var(--primary)',
          fontSize: '0.9rem',
          fontWeight: 500,
          border: '1px solid rgba(99,102,241,0.3)'
        }}>
          <Sparkles size={16} />
          Powered by Smart AI Recommendations
        </div>

        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          margin: 0
        }}>
          The Future of Campus <br/>
          <span style={{ 
            color: 'var(--primary)',
            background: 'linear-gradient(to right, #a78bfa, #818cf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Resource Exchange</span>
        </h1>

        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--text-muted)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          A next-generation marketplace exclusively for your college. Buy, sell, and discover engineering tools with AI-curated suggestions tailored to your branch and year.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary" 
            style={{ padding: '14px 28px', fontSize: '1.1rem', borderRadius: '30px' }}
            onClick={() => navigate('/market')}
          >
            Explore Marketplace &rarr;
          </button>
          <button 
            className="btn glass-panel" 
            style={{ padding: '14px 28px', fontSize: '1.1rem', borderRadius: '30px', color: 'white' }}
            onClick={() => navigate('/add')}
          >
            Start Selling
          </button>
        </div>
      </div>

      {/* Floating Images */}
      {/* 1. Drafting Board */}
      <motion.div 
        custom={0}
        variants={floatVariants}
        animate="animate"
        className="glass-panel hidden-mobile"
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '24px',
          overflow: 'hidden',
          padding: '8px',
          zIndex: 5,
          transform: 'rotate(-5deg)'
        }}
      >
        <img src="https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&q=80&w=400" alt="Drafting" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
      </motion.div>

      {/* 2. Scientific Calculator */}
      <motion.div 
        custom={1}
        variants={floatVariants}
        animate="animate"
        className="glass-panel hidden-mobile"
        style={{
          position: 'absolute',
          top: '10%',
          right: '2%',
          width: '220px',
          height: '240px',
          borderRadius: '24px',
          overflow: 'hidden',
          padding: '8px',
          zIndex: 5,
          transform: 'rotate(5deg)'
        }}
      >
        <img src="/casio_calculator.png" alt="Calculator" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
      </motion.div>

      {/* 3. Electronics/Arduino */}
      <motion.div 
        custom={2}
        variants={floatVariants}
        animate="animate"
        className="glass-panel hidden-mobile"
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '2%',
          width: '240px',
          height: '180px',
          borderRadius: '24px',
          overflow: 'hidden',
          padding: '8px',
          zIndex: 5,
          transform: 'rotate(3deg)'
        }}
      >
        <img src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=400" alt="Electronics" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
      </motion.div>

      {/* 4. Books */}
      <motion.div 
        custom={3}
        variants={floatVariants}
        animate="animate"
        className="glass-panel hidden-mobile"
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '8%',
          width: '200px',
          height: '260px',
          borderRadius: '24px',
          overflow: 'hidden',
          padding: '8px',
          zIndex: 5,
          transform: 'rotate(-3deg)'
        }}
      >
        <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" alt="Books" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
      </motion.div>

    </div>
  );
}

export default Home;
