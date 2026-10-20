import { Plane, Shield } from 'lucide-react';
import { useFlight } from '../context/useFlight';

export function Footer() {
  const { setActiveView } = useFlight();

  return (
    <footer style={{
      marginTop: 'auto',
      background: '#172D46',
      borderTop: '1px solid #234368',
      padding: '36px 0 20px',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="app-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr',
          gap: '32px',
          marginBottom: '28px'
        }} className="footer-grid-responsive">
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                background: '#B98245',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Plane size={16} color="#FFFFFF" style={{ transform: 'rotate(-45deg)' }} />
              </div>
              <span style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>
                AeroSphere
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.6, maxWidth: '380px' }}>
              An authentic passenger aviation technology platform designed for college engineering capstone presentation. Combining explainable delay-risk heuristics, multi-carrier fare evaluation, and secured passenger itineraries.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              Platform Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '13px' }}>
              <button
                onClick={() => setActiveView('search')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Flight Search & Schedules
              </button>
              <button
                onClick={() => setActiveView('delayIntel')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Explainable Delay Engine
              </button>
              <button
                onClick={() => setActiveView('analytics')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Route Saturation Analytics
              </button>
              <button
                onClick={() => setActiveView('savedTrips')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', textAlign: 'left', padding: 0 }}
              >
                Saved Itineraries & SkyPass
              </button>
              <button
                onClick={() => setActiveView('backendGuide')}
                style={{ background: 'none', border: 'none', color: '#F5F3EE', cursor: 'pointer', textAlign: 'left', padding: 0, fontWeight: 600 }}
              >
                Spring Boot Backend Spec
              </button>
            </div>
          </div>

          {/* Col 3: Academic Notice */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              Academic Disclaimers
            </h4>
            <div style={{
              background: '#0F1D2E',
              border: '1px solid #234368',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '11px',
              color: '#94A3B8',
              lineHeight: 1.5
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F5F3EE', fontWeight: 700, marginBottom: '4px' }}>
                <Shield size={13} color="#B98245" />
                <span>Non-Commercial Simulation</span>
              </div>
              All Indian carrier names, routes, fares, and delays are modeled for demonstration. No real financial transactions or live airline tickets occur.
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{
          paddingTop: '18px',
          borderTop: '1px solid #234368',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: '#94A3B8'
        }}>
          <div>
            © {new Date().getFullYear()} AeroSphere Aviation Intelligence • College Engineering Capstone
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>React 19 • Vite • Recharts • Firebase Auth • Kotlin Spring Boot</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
