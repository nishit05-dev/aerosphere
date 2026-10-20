import { useState, useEffect, useMemo } from 'react';
import { Compass, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { AIRPORTS } from '../data/airports';
import { AIRLINE_DETAILS } from '../data/sampleFlights';
import { calculateExplainableDelayRisk, DISCLAIMER_TEXT } from '../services/delayModel';
import { apiService } from '../services/apiService';

export function DelayIntelligenceView() {
  const [selectedOrigin, setSelectedOrigin] = useState('DEL');
  const [selectedDestination, setSelectedDestination] = useState('BOM');
  const [departureHour, setDepartureHour] = useState(8);
  const [stops, setStops] = useState(0);
  const [airline, setAirline] = useState('IndiGo');
  const [aircraft, setAircraft] = useState('Airbus A321neo');

  const formattedTime = `${String(departureHour).padStart(2, '0')}:30`;

  // Compute local heuristic prediction responsively
  const localDiagnostic = useMemo(() => {
    return calculateExplainableDelayRisk({
      origin: selectedOrigin,
      destination: selectedDestination,
      departureTime: formattedTime,
      stops,
      airline,
      aircraft
    });
  }, [selectedOrigin, selectedDestination, formattedTime, stops, airline, aircraft]);

  // Async backend prediction when Spring Boot server is active
  const [backendDiagnostic, setBackendDiagnostic] = useState(null);

  useEffect(() => {
    let active = true;
    if (apiService.backendAvailable) {
      apiService.getDelayPrediction({
        origin: selectedOrigin,
        destination: selectedDestination,
        departureTime: formattedTime,
        stops,
        airline,
        aircraft
      }).then((res) => {
        if (active && res) {
          setBackendDiagnostic(res);
        }
      }).catch(() => {});
    }
    return () => {
      active = false;
    };
  }, [selectedOrigin, selectedDestination, formattedTime, stops, airline, aircraft]);

  const diagnostic = backendDiagnostic || localDiagnostic;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Title Header */}
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
          <Compass size={14} color="#172D46" />
          <span>Interactive Aviation Telemetry Model</span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#172D46',
          marginBottom: '8px',
          letterSpacing: '-0.02em'
        }}>
          Explainable Flight Delay-Risk Engine
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
          Simulate Indian airspace congestion, rotational turnarounds, and carrier dispatch variables to estimate flight punctuality probability with interpretable causal factors.
        </p>
      </div>

      {/* Simulator Interactive Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 380px) 1fr',
        gap: '24px',
        alignItems: 'start'
      }} className="delay-intel-grid-responsive">
        {/* Controls Card */}
        <div className="glass-panel" style={{ padding: '22px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#172D46', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={16} color="#172D46" />
            <span>Flight Parameter Inputs</span>
          </h3>

          {/* Route selector */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
              Origin Airport
            </label>
            <select
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="aerosphere-select"
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.code} — {a.city}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
              Destination Airport
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="aerosphere-select"
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.code} — {a.city}
                </option>
              ))}
            </select>
          </div>

          {/* Departure Hour Slider */}
          <div style={{ marginBottom: '16px', paddingTop: '12px', borderTop: '1px solid #F1EFEA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Departure Slot (IST)
              </label>
              <span className="font-telemetry" style={{ fontSize: '13px', fontWeight: 700, color: '#172D46' }}>
                {formattedTime} IST
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={23}
              value={departureHour}
              onChange={(e) => setDepartureHour(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#172D46', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', marginTop: '4px' }}>
              <span>05:00 (Dawn)</span>
              <span>12:00 (Noon)</span>
              <span>19:00 (Peak)</span>
              <span>23:00 (Night)</span>
            </div>
          </div>

          {/* Airline Selector */}
          <div style={{ marginBottom: '14px', paddingTop: '12px', borderTop: '1px solid #F1EFEA' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
              Operating Carrier
            </label>
            <select
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              className="aerosphere-select"
            >
              {Object.values(AIRLINE_DETAILS).map((al) => (
                <option key={al.code} value={al.name}>
                  {al.name} ({al.code}) — Fleet OTP {al.avgOtp}%
                </option>
              ))}
            </select>
          </div>

          {/* Aircraft Selector */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
              Aircraft Equipment
            </label>
            <select
              value={aircraft}
              onChange={(e) => setAircraft(e.target.value)}
              className="aerosphere-select"
            >
              <option value="Airbus A321neo">Airbus A321neo (Narrowbody)</option>
              <option value="Airbus A320neo">Airbus A320neo (Narrowbody)</option>
              <option value="Boeing 787-8 Dreamliner">Boeing 787-8 Dreamliner (Widebody)</option>
              <option value="Boeing 737 MAX 8">Boeing 737 MAX 8 (Narrowbody)</option>
            </select>
          </div>

          {/* Flight Type / Stops */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>
              Sector Routing
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setStops(0)}
                style={{
                  background: stops === 0 ? '#172D46' : '#FAF9F5',
                  color: stops === 0 ? '#FFFFFF' : '#475569',
                  border: stops === 0 ? '1px solid #172D46' : '1px solid #E2DDD5',
                  padding: '7px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Direct (Point-to-Point)
              </button>
              <button
                type="button"
                onClick={() => setStops(1)}
                style={{
                  background: stops === 1 ? '#172D46' : '#FAF9F5',
                  color: stops === 1 ? '#FFFFFF' : '#475569',
                  border: stops === 1 ? '1px solid #172D46' : '1px solid #E2DDD5',
                  padding: '7px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                1 Connecting Stop
              </button>
            </div>
          </div>
        </div>

        {/* Explainability Results Card */}
        <div className="glass-panel" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '12px' }}>
          {/* Top Score HUD */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '1px solid #F1EFEA'
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                Simulated Delay Probability
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '3px' }}>
                <span style={{ fontSize: '38px', fontWeight: 800, color: diagnostic.level === 'Low' ? '#39796B' : diagnostic.level === 'Moderate' ? '#B98245' : '#C0392B', lineHeight: 1 }}>
                  {diagnostic.score}%
                </span>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: diagnostic.level === 'Low' ? '#39796B' : diagnostic.level === 'Moderate' ? '#B98245' : '#C0392B',
                  background: diagnostic.level === 'Low' ? 'rgba(57, 121, 107, 0.12)' : diagnostic.level === 'Moderate' ? 'rgba(185, 130, 69, 0.12)' : 'rgba(192, 57, 43, 0.1)',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  border: '1px solid currentColor'
                }}>
                  {diagnostic.level} Risk
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Model Baseline</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#172D46' }}>
                {diagnostic.confidenceMetric || '91.4% (Simulated)'}
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                Route: {selectedOrigin} → {selectedDestination}
              </div>
            </div>
          </div>

          {/* Primary Driver Banner */}
          <div style={{
            background: '#FAF9F5',
            border: '1px solid #E2DDD5',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <Sparkles size={14} color="#172D46" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#172D46', textTransform: 'uppercase' }}>
                Primary Delay Driver
              </span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
              {diagnostic.primaryDriver}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              {diagnostic.recommendedAction}
            </div>
          </div>

          {/* Granular Factor Weights */}
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#172D46', marginBottom: '12px' }}>
            Causal Factor Contribution Breakdown
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {diagnostic.breakdown?.map((f) => (
              <div
                key={f.name}
                style={{
                  background: '#FAF9F5',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2DDD5'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>{f.name}</span>
                  <span className="font-telemetry" style={{ fontSize: '11px', fontWeight: 700, color: '#172D46' }}>
                    {f.val}% (Weight: {f.weight})
                  </span>
                </div>
                {/* Progress bar */}
                <div style={{ width: '100%', height: '5px', background: '#E2DDD5', borderRadius: '3px', overflow: 'hidden', marginBottom: '5px' }}>
                  <div style={{
                    width: `${f.val}%`,
                    height: '100%',
                    background: f.val > 65 ? '#C0392B' : f.val > 35 ? '#B98245' : '#39796B',
                    borderRadius: '3px'
                  }} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.3 }}>
                  {f.description}
                </div>
              </div>
            ))}
          </div>

          {/* Prominent Academic Disclaimer */}
          <div style={{
            background: '#FAF5EE',
            border: '1px solid #E8DFD1',
            padding: '12px 14px',
            borderRadius: '8px',
            fontSize: '11px',
            color: '#7C5424',
            lineHeight: 1.5,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <ShieldAlert size={16} color="#B98245" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', color: '#7C5424', marginBottom: '2px' }}>
                DEMO DISCLAIMER & METHODOLOGY NOTICE
              </strong>
              {DISCLAIMER_TEXT} This tool is developed for an academic college project on predictive passenger travel systems and does not constitute certified operational flight dispatch advice.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
