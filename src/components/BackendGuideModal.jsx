import { useState } from 'react';
import { GitPullRequest, ShieldCheck, Server, Terminal, Code2, RefreshCw } from 'lucide-react';
import { apiService } from '../services/apiService';
import { useFlight } from '../context/useFlight';

export function BackendGuideModal() {
  const { backendConnected, showToast } = useFlight();
  const [testingHealth, setTestingHealth] = useState(false);
  const [healthStatus, setHealthStatus] = useState(backendConnected ? 'ONLINE' : 'OFFLINE (Using Local Simulation Engine)');

  const runHealthCheck = async () => {
    setTestingHealth(true);
    const healthy = await apiService.checkBackendHealth();
    setTestingHealth(false);
    if (healthy) {
      setHealthStatus('ONLINE (Connected to Spring Boot on port 8080)');
      showToast('Successfully connected to Kotlin + Spring Boot API!', 'success');
    } else {
      setHealthStatus('OFFLINE (Spring Boot not started; seamlessly running local dataset)');
      showToast('Backend is offline. Using local simulated data.', 'info');
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '50px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#FAF9F5',
          border: '1px solid #D5CEBF',
          padding: '5px 14px',
          borderRadius: '16px',
          color: '#172D46',
          fontSize: '12px',
          fontWeight: 700,
          marginBottom: '10px'
        }}>
          <GitPullRequest size={14} color="#172D46" />
          <span>Full-Stack Architecture Specification</span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#172D46',
          marginBottom: '8px',
          letterSpacing: '-0.02em'
        }}>
          Kotlin + Spring Boot REST API & Firebase Security
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '680px', margin: '0 auto', lineHeight: 1.5 }}>
          Explore the backend service architecture, endpoint contracts, and Firebase Admin SDK token authentication filter protecting passenger itineraries.
        </p>
      </div>

      {/* Backend Connection Status Banner */}
      <div className="glass-panel" style={{
        padding: '18px 22px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: '#FFFFFF',
        border: '1px solid #E2DDD5',
        borderRadius: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: '#FAF9F5',
            border: '1px solid #D5CEBF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#172D46'
          }}>
            <Server size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>
              Target Backend Service
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#172D46' }}>
              http://localhost:8080/api
            </div>
            <div style={{ fontSize: '12px', color: '#39796B', marginTop: '2px', fontWeight: 600 }}>
              Status: <span>{healthStatus}</span>
            </div>
          </div>
        </div>

        <button
          onClick={runHealthCheck}
          disabled={testingHealth}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#172D46',
            color: '#FFFFFF',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <RefreshCw size={13} className={testingHealth ? 'animate-pulse-glow' : ''} />
          <span>{testingHealth ? 'Checking /health...' : 'Test Backend Connection'}</span>
        </button>
      </div>

      {/* Architecture Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '18px',
        marginBottom: '24px'
      }}>
        {/* Card 1 */}
        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Code2 size={18} color="#172D46" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#172D46' }}>
              Kotlin Spring Boot Service
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, marginBottom: '12px' }}>
            Built using Spring Boot 3.3.x, Kotlin 1.9, Gradle Kotlin DSL, and Spring Security. Houses the authoritative Indian domestic flight catalog (`DemoFlightCatalog.kt`).
          </p>
          <div className="badge-tag" style={{ color: '#172D46' }}>
            Located in: backend/
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <ShieldCheck size={18} color="#39796B" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#172D46' }}>
              Firebase Security Filter
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, marginBottom: '12px' }}>
            Intercepts incoming <code>Authorization: Bearer &lt;idToken&gt;</code> requests via <code>FirebaseAuthenticationFilter</code>, enforcing strict token validation in both live and demo mode.
          </p>
          <div className="badge-tag" style={{ color: '#39796B' }}>
            Zero frontend credential exposure
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Terminal size={18} color="#B98245" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#172D46' }}>
              Graceful Frontend Fallback
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, marginBottom: '12px' }}>
            The React frontend automatically falls back to client-side heuristics if the Spring Boot server is not actively started, ensuring seamless presentation reliability.
          </p>
          <div className="badge-tag" style={{ color: '#B98245' }}>
            Resilient fallback architecture
          </div>
        </div>
      </div>

      {/* REST Endpoints Catalog */}
      <div className="glass-panel" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#172D46', marginBottom: '16px' }}>
          Published REST Endpoints Specification
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Endpoint 1 */}
          <div style={{
            background: '#FAF9F5',
            padding: '14px 16px',
            borderRadius: '8px',
            border: '1px solid #E2DDD5'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <span style={{
                background: '#172D46',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                GET
              </span>
              <span className="font-telemetry" style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                /api/flights/search?origin=DEL&destination=BOM&date=2026-10-25
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              Returns Indian domestic flight schedules, fares, cabin availability, and delay-risk estimates.
            </p>
          </div>

          {/* Endpoint 2 */}
          <div style={{
            background: '#FAF9F5',
            padding: '14px 16px',
            borderRadius: '8px',
            border: '1px solid #E2DDD5'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <span style={{
                background: '#39796B',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                POST
              </span>
              <span className="font-telemetry" style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                /api/delay/predict
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              Computes explainable heuristic delay probabilities given route, departure slot, airline, and aircraft parameters.
            </p>
          </div>

          {/* Endpoint 3 */}
          <div style={{
            background: '#FAF9F5',
            padding: '14px 16px',
            borderRadius: '8px',
            border: '1px solid #E2DDD5'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <span style={{
                background: '#B98245',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                GET / POST / DELETE
              </span>
              <span className="font-telemetry" style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                /api/trips
              </span>
              <span style={{
                background: '#FAF5EE',
                color: '#7C5424',
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid #E8DFD1'
              }}>
                🔒 SECURED (Firebase Bearer Token Required)
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              Saves, retrieves, and deletes passenger itineraries with strict per-user authorization.
            </p>
          </div>

          {/* Endpoint 4 */}
          <div style={{
            background: '#FAF9F5',
            padding: '14px 16px',
            borderRadius: '8px',
            border: '1px solid #E2DDD5'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <span style={{
                background: '#172D46',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                GET
              </span>
              <span className="font-telemetry" style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                /api/analytics/summary
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              Airspace congestion indices, 7-day fare forecast series, and airline punctuality metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
