import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, GraduationCap, Building, ShieldCheck, Loader2 } from 'lucide-react';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  
  // Signup Form
  const [signupData, setSignupData] = useState({
    name: '', email: '', branch: '', year: '', password: '', confirm: ''
  });

  const { login } = useAuth(); // simulate AuthContext

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isLogin) {
        if (!loginEmail || !loginPass) throw new Error("Please fill in all fields.");
        await login(loginEmail, loginPass);
      } else {
        if (signupData.password !== signupData.confirm) throw new Error("Passwords do not match.");
        if (!signupData.email.includes('.edu')) throw new Error("Please use a valid college .edu email.");
        await login(signupData.email, signupData.password); // Simulate auto-login after signup
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#0A0A0F' }}>
      
      {/* LEFT SIDE - ILLUSTRATION (Hidden on Mobile) */}
      <div className="hidden-mobile" style={{ 
        flex: 1, 
        position: 'relative', 
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A0A0F 0%, #1a1a2e 100%)'
      }}>
        {/* Animated Gradient Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }}
        />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '60px', zIndex: 10 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: '24px' }}>
            Empower Your <br/>
            <span style={{ color: 'var(--accent)' }}>Campus Journey</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '400px' }}>
            The smartest way to buy, sell, and rent engineering resources securely within your college.
          </p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ marginTop: 'auto', position: 'relative', height: '50vh', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
          >
            {/* Dark overlay for image */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.9), transparent)', zIndex: 1 }} />
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
              alt="Students collaborating" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE - AUTH FORM */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        position: 'relative'
      }}>
        {/* Mobile-only background effects */}
        <div className="mobile-only" style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top right, rgba(99,102,241,0.15), transparent 60%)', zIndex: 0 }} />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            width: '100%', 
            maxWidth: '440px', 
            background: 'rgba(255, 255, 255, 0.03)', 
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.05)', 
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            zIndex: 10
          }}
        >
          {/* Form Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '2rem', margin: '0 0 8px 0', color: 'white' }}>
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>
              {isLogin ? 'Enter your details to access your account' : 'Join the exclusive campus marketplace'}
            </p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#FCA5A5', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '4px', height: '16px', backgroundColor: '#EF4444', borderRadius: '2px' }} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <AnimatePresence mode="wait">
              {isLogin ? (
                /* LOGIN FIELDS */
                <motion.div key="login" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-color)' }}>College Email</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input type="email" placeholder="student@college.edu" className="input-field" style={{ paddingLeft: '44px', width: '100%', height: '48px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }} value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-color)' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input type="password" placeholder="••••••••" className="input-field" style={{ paddingLeft: '44px', width: '100%', height: '48px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }} value={loginPass} onChange={e => setLoginPass(e.target.value)} required />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      <input type="checkbox" style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> Remember me
                    </label>
                    <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}>Forgot password?</span>
                  </div>
                </motion.div>
              ) : (
                /* SIGNUP FIELDS */
                <motion.div key="signup" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-color)' }}>Full Name</label>
                      <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="text" placeholder="John Doe" className="input-field" style={{ paddingLeft: '44px', width: '100%', height: '48px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }} value={signupData.name} onChange={e => setSignupData({...signupData, name: e.target.value})} required />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-color)' }}>College Email (.edu)</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input type="email" placeholder="student@college.edu" className="input-field" style={{ paddingLeft: '44px', width: '100%', height: '48px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }} value={signupData.email} onChange={e => setSignupData({...signupData, email: e.target.value})} required />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-color)' }}>Branch</label>
                      <div style={{ position: 'relative' }}>
                        <Building size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <select className="input-field" style={{ paddingLeft: '44px', width: '100%', height: '48px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: signupData.branch ? 'white' : 'var(--text-muted)' }} value={signupData.branch} onChange={e => setSignupData({...signupData, branch: e.target.value})} required>
                          <option value="" disabled>Select Branch</option>
                          <option value="CSE">Computer Science</option>
                          <option value="ME">Mechanical</option>
                          <option value="ECE">Electronics</option>
                          <option value="CE">Civil</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-color)' }}>Year</label>
                      <div style={{ position: 'relative' }}>
                        <GraduationCap size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <select className="input-field" style={{ paddingLeft: '44px', width: '100%', height: '48px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: signupData.year ? 'white' : 'var(--text-muted)' }} value={signupData.year} onChange={e => setSignupData({...signupData, year: e.target.value})} required>
                          <option value="" disabled>Select Year</option>
                          <option value="1">1st Year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-color)' }}>Password</label>
                      <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="password" placeholder="••••••••" className="input-field" style={{ paddingLeft: '44px', width: '100%', height: '48px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }} value={signupData.password} onChange={e => setSignupData({...signupData, password: e.target.value})} required />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-color)' }}>Confirm</label>
                      <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="password" placeholder="••••••••" className="input-field" style={{ paddingLeft: '44px', width: '100%', height: '48px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }} value={signupData.confirm} onChange={e => setSignupData({...signupData, confirm: e.target.value})} required />
                      </div>
                    </div>
                  </div>

                  {/* Student Verification Badge */}
                  <div style={{ marginTop: '8px', padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px dashed rgba(16, 185, 129, 0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldCheck color="#10B981" size={24} />
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: '#10B981', fontWeight: 'bold' }}>OTP Verification Required</span><br/>
                      A code will be sent to your .edu email.
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', height: '48px', fontSize: '1rem', marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)' }} 
              disabled={loading}
            >
              {loading ? <Loader2 className="spin" size={20} /> : (isLogin ? 'Login' : 'Create Account')}
            </motion.button>
          </form>

          {/* Social Logins */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-outline" style={{ flex: 1, height: '44px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <GoogleIcon /> <span style={{ fontSize: '0.9rem' }}>Google</span>
              </button>
              <button className="btn btn-outline" style={{ flex: 1, height: '44px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg> <span style={{ fontSize: '0.9rem' }}>GitHub</span>
              </button>
            </div>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              style={{ color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', transition: 'color 0.2s' }}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </span>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default Auth;
