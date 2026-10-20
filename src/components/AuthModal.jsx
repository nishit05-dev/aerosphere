import { useState } from 'react';
import { X, LogIn, UserPlus, Sparkles, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { useFlight } from '../context/useFlight';

export function AuthModal() {
  const {
    authModalOpen,
    authModalTab,
    setAuthModalTab,
    closeAuthModal,
    login,
    register,
    loginGoogle,
    loginPersona,
    loading,
    isLiveFirebase
  } = useAuth();

  const { showToast } = useFlight();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!authModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      showToast('Successfully signed in!', 'success');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      showToast('Account created successfully!', 'success');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await loginGoogle();
      showToast('Signed in via Google authentication!', 'success');
    } catch (err) {
      setError(err.message || 'Google sign-in could not be completed.');
    }
  };

  const handlePersonaSelect = async (type) => {
    setError('');
    try {
      await loginPersona(type);
      showToast(`Welcome aboard as ${type === 'frequent' ? 'Capt. Rahul Sharma' : 'Dr. Priya Verma'}!`, 'success');
    } catch {
      setError('Persona login failed.');
    }
  };

  return (
    <div className="modal-overlay" onClick={closeAuthModal}>
      <div
        className="modal-content"
        style={{ maxWidth: '480px', padding: '26px 30px', background: '#FFFFFF' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#172D46' }}>
              AeroSphere Passenger Portal
            </h2>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Firebase Authentication & Academic Evaluation
            </div>
          </div>

          <button
            type="button"
            onClick={closeAuthModal}
            style={{
              background: '#FAF9F5',
              border: '1px solid #E2DDD5',
              color: '#64748B',
              borderRadius: '6px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Firebase Live status badge */}
        <div style={{
          background: isLiveFirebase ? 'rgba(57, 121, 107, 0.1)' : '#FAF5EE',
          border: isLiveFirebase ? '1px solid rgba(57, 121, 107, 0.3)' : '1px solid #E8DFD1',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '11px',
          color: isLiveFirebase ? '#39796B' : '#7C5424',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '16px'
        }}>
          <Shield size={14} />
          <span>
            {isLiveFirebase
              ? 'Connected to Live Firebase Auth project'
              : 'Academic Simulation Auth Mode (Set VITE_FIREBASE_* in .env to connect live project)'}
          </span>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '4px',
          background: '#FAF9F5',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid #E2DDD5',
          marginBottom: '18px'
        }}>
          <button
            type="button"
            onClick={() => { setAuthModalTab('login'); setError(''); }}
            style={{
              background: authModalTab === 'login' ? '#172D46' : 'transparent',
              color: authModalTab === 'login' ? '#FFFFFF' : '#475569',
              border: 'none',
              padding: '6px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: authModalTab === 'login' ? 700 : 500,
              cursor: 'pointer',
              transition: 'var(--ease-smooth)'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthModalTab('signup'); setError(''); }}
            style={{
              background: authModalTab === 'signup' ? '#172D46' : 'transparent',
              color: authModalTab === 'signup' ? '#FFFFFF' : '#475569',
              border: 'none',
              padding: '6px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: authModalTab === 'signup' ? 700 : 500,
              cursor: 'pointer',
              transition: 'var(--ease-smooth)'
            }}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => { setAuthModalTab('demo'); setError(''); }}
            style={{
              background: authModalTab === 'demo' ? '#172D46' : 'transparent',
              color: authModalTab === 'demo' ? '#FFFFFF' : '#475569',
              border: 'none',
              padding: '6px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: authModalTab === 'demo' ? 700 : 500,
              cursor: 'pointer',
              transition: 'var(--ease-smooth)'
            }}
          >
            1-Click Demo
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            background: 'rgba(192, 57, 43, 0.1)',
            border: '1px solid rgba(192, 57, 43, 0.3)',
            padding: '10px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#C0392B',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {/* Tab 1: Login Form */}
        {authModalTab === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '5px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="passenger@aviation.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="aerosphere-input"
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '5px' }}>
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="aerosphere-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '10px', fontSize: '13px', marginBottom: '10px' }}
            >
              <LogIn size={15} />
              <span>{loading ? 'Authenticating...' : 'Sign In with Email'}</span>
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              style={{
                width: '100%',
                padding: '9px',
                fontSize: '13px',
                background: '#FFFFFF',
                border: '1px solid #D5CEBF',
                color: '#172D46',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <span>Continue with Google</span>
            </button>
          </form>
        )}

        {/* Tab 2: Signup Form */}
        {authModalTab === 'signup' && (
          <form onSubmit={handleRegisterSubmit}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '5px' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Vikram Malhotra"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="aerosphere-input"
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '5px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="vikram@aviation.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="aerosphere-input"
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '5px' }}>
                Password (Minimum 6 characters)
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="aerosphere-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '10px', fontSize: '13px' }}
            >
              <UserPlus size={15} />
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            </button>
          </form>
        )}

        {/* Tab 3: 1-Click Demo Personas */}
        {authModalTab === 'demo' && (
          <div>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px', lineHeight: 1.4 }}>
              Select a pre-configured demo persona to evaluate itineraries, backend synchronization, and saved SkyPasses immediately.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                onClick={() => handlePersonaSelect('frequent')}
                style={{
                  background: '#FAF9F5',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid #D5CEBF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'var(--ease-smooth)'
                }}
              >
                <div style={{ fontSize: '24px' }}>👨‍✈️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                    Capt. Rahul Sharma
                  </div>
                  <div style={{ fontSize: '11px', color: '#B98245', fontWeight: 600 }}>
                    Diamond SkyClub Elite • Frequent Traveler
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    rahul.sharma@aviation-demo.in
                  </div>
                </div>
                <Sparkles size={15} color="#B98245" />
              </div>

              <div
                onClick={() => handlePersonaSelect('business')}
                style={{
                  background: '#FAF9F5',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid #D5CEBF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'var(--ease-smooth)'
                }}
              >
                <div style={{ fontSize: '24px' }}>👩‍💼</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                    Dr. Priya Verma
                  </div>
                  <div style={{ fontSize: '11px', color: '#39796B', fontWeight: 600 }}>
                    Sapphire Business Pass • Tech Lead
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    priya.verma@techindia.org
                  </div>
                </div>
                <Sparkles size={15} color="#39796B" />
              </div>
            </div>
          </div>
        )}

        {/* Security Rule Note */}
        <div style={{
          marginTop: '18px',
          paddingTop: '14px',
          borderTop: '1px solid #F1EFEA',
          fontSize: '11px',
          color: '#64748B',
          textAlign: 'center',
          lineHeight: 1.4
        }}>
          🔒 Security Compliance: Client code communicates with Firebase Auth public API only. Firebase Service Account credentials are kept strictly isolated on the backend.
        </div>
      </div>
    </div>
  );
}
