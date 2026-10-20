import { Plane, Compass, BarChart3, BookmarkCheck, GitPullRequest, LogIn, LogOut, Layers } from 'lucide-react';
import { useFlight } from '../context/useFlight';
import { useAuth } from '../context/useAuth';

export function Navbar() {
  const {
    activeView,
    setActiveView,
    comparedFlights,
    setIsComparisonModalOpen,
    savedTrips
  } = useFlight();

  const { user, openAuthModal, logout } = useAuth();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: '#172D46',
      borderBottom: '1px solid #234368',
      boxShadow: '0 2px 8px rgba(23, 45, 70, 0.12)'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => setActiveView('search')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: '#B98245',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(185, 130, 69, 0.35)',
            position: 'relative'
          }}>
            <Plane size={22} color="#FFFFFF" style={{ transform: 'rotate(-45deg)' }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#FFFFFF'
              }}>
                AeroSphere
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#F5F3EE',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '2px 7px',
                borderRadius: '4px',
                letterSpacing: '0.04em'
              }}>
                ACADEMIC DEMO
              </span>
            </div>
            <div style={{
              fontSize: '11px',
              color: '#94A3B8',
              letterSpacing: '0.02em',
              fontWeight: 500
            }}>
              Intelligent Passenger Travel Platform
            </div>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: '#0F1D2E',
          padding: '4px 6px',
          borderRadius: '10px',
          border: '1px solid #234368'
        }} className="nav-tabs-wrapper">
          <button
            onClick={() => setActiveView('search')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeView === 'search' ? '#FFFFFF' : 'transparent',
              color: activeView === 'search' ? '#172D46' : '#CBD5E1',
              border: 'none',
              padding: '7px 14px',
              borderRadius: '7px',
              fontSize: '13px',
              fontWeight: activeView === 'search' ? 700 : 500,
              cursor: 'pointer',
              transition: 'var(--ease-smooth)'
            }}
          >
            <Plane size={14} />
            <span>Search Flights</span>
          </button>

          <button
            onClick={() => setActiveView('delayIntel')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeView === 'delayIntel' ? '#FFFFFF' : 'transparent',
              color: activeView === 'delayIntel' ? '#172D46' : '#CBD5E1',
              border: 'none',
              padding: '7px 14px',
              borderRadius: '7px',
              fontSize: '13px',
              fontWeight: activeView === 'delayIntel' ? 700 : 500,
              cursor: 'pointer',
              transition: 'var(--ease-smooth)'
            }}
          >
            <Compass size={14} />
            <span>Delay Intelligence</span>
          </button>

          <button
            onClick={() => setActiveView('analytics')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeView === 'analytics' ? '#FFFFFF' : 'transparent',
              color: activeView === 'analytics' ? '#172D46' : '#CBD5E1',
              border: 'none',
              padding: '7px 14px',
              borderRadius: '7px',
              fontSize: '13px',
              fontWeight: activeView === 'analytics' ? 700 : 500,
              cursor: 'pointer',
              transition: 'var(--ease-smooth)'
            }}
          >
            <BarChart3 size={14} />
            <span>Route Analytics</span>
          </button>

          <button
            onClick={() => setActiveView('savedTrips')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeView === 'savedTrips' ? '#FFFFFF' : 'transparent',
              color: activeView === 'savedTrips' ? '#172D46' : '#CBD5E1',
              border: 'none',
              padding: '7px 14px',
              borderRadius: '7px',
              fontSize: '13px',
              fontWeight: activeView === 'savedTrips' ? 700 : 500,
              cursor: 'pointer',
              transition: 'var(--ease-smooth)',
              position: 'relative'
            }}
          >
            <BookmarkCheck size={14} />
            <span>Saved Trips</span>
            {savedTrips.length > 0 && (
              <span style={{
                background: '#B98245',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                borderRadius: '8px',
                padding: '1px 6px',
                marginLeft: '4px'
              }}>
                {savedTrips.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveView('backendGuide')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeView === 'backendGuide' ? '#FFFFFF' : 'transparent',
              color: activeView === 'backendGuide' ? '#172D46' : '#CBD5E1',
              border: 'none',
              padding: '7px 14px',
              borderRadius: '7px',
              fontSize: '13px',
              fontWeight: activeView === 'backendGuide' ? 700 : 500,
              cursor: 'pointer',
              transition: 'var(--ease-smooth)'
            }}
          >
            <GitPullRequest size={14} />
            <span>Spring Boot API</span>
          </button>
        </nav>

        {/* Right Section: Comparison tray + User Auth Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Compare dock button */}
          {comparedFlights.length > 0 && (
            <button
              onClick={() => setIsComparisonModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#B98245',
                border: '1px solid #B98245',
                color: '#FFFFFF',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <Layers size={14} />
              <span>Compare ({comparedFlights.length}/3)</span>
            </button>
          )}

          {/* User Auth Profile */}
          {user ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#0F1D2E',
              border: '1px solid #234368',
              padding: '6px 12px',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                background: '#39796B',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700
              }}>
                {user.avatar || user.displayName?.[0] || '✈'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.2 }}>
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <span style={{ fontSize: '10px', color: '#94A3B8' }}>
                  {user.tier || 'Verified Passenger'}
                </span>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '4px'
                }}
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFFFF',
                color: '#172D46',
                fontWeight: 700,
                fontSize: '13px',
                padding: '8px 16px',
                border: '1px solid #FFFFFF',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <LogIn size={14} />
              <span>Sign In / Demo</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
