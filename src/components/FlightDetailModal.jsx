import { X, Plane, ShieldCheck, ShieldAlert, Sparkles, Bookmark, Layers } from 'lucide-react';
import { useFlight } from '../context/useFlight';
import { AIRLINE_DETAILS } from '../data/sampleFlights';
import { calculateExplainableDelayRisk } from '../services/delayModel';

export function FlightDetailModal() {
  const {
    activeFlightDetail,
    setActiveFlightDetail,
    rawFlights,
    saveTrip,
    toggleComparison,
    comparedFlights
  } = useFlight();

  if (!activeFlightDetail) return null;

  const flight = activeFlightDetail;
  const isCompared = comparedFlights.some((f) => f.id === flight.id);
  const meta = AIRLINE_DETAILS[flight.airlineCode] || { color: '#172D46', bg: 'rgba(23, 45, 70, 0.08)' };

  // Calculate detailed explainability breakdown
  const delayDiagnostic = calculateExplainableDelayRisk({
    origin: flight.origin,
    destination: flight.destination,
    departureTime: flight.departureTime,
    stops: flight.stops,
    airline: flight.airline,
    aircraft: flight.aircraft
  });

  // Calculate 2-3 Alternative Flight Recommendations
  const cheaperAlt = rawFlights.find(
    (f) => f.id !== flight.id && f.totalFare < flight.totalFare
  );

  const lowerRiskAlt = rawFlights.find(
    (f) => f.id !== flight.id && f.delayRisk.score < flight.delayRisk.score
  );

  const earlierAlt = rawFlights.find(
    (f) => f.id !== flight.id && f.departureTime < flight.departureTime
  );

  return (
    <div className="modal-overlay" onClick={() => setActiveFlightDetail(null)}>
      <div
        className="modal-content"
        style={{ maxWidth: '920px', padding: '26px 30px', background: '#FFFFFF' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingBottom: '14px',
          borderBottom: '1px solid #E2DDD5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: meta.bg,
              color: meta.color,
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: 800,
              fontSize: '14px',
              border: `1px solid ${meta.color}30`
            }}>
              {flight.airlineCode}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#172D46' }}>
                  {flight.airline} {flight.flightNumber}
                </h2>
                <span className="badge-tag">{flight.aircraft}</span>
              </div>
              <div style={{ fontSize: '13px', color: '#64748B' }}>
                {flight.origin} to {flight.destination} • {flight.cabinClass || 'Economy'} Class
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveFlightDetail(null)}
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
            <X size={18} />
          </button>
        </div>

        {/* Flight Route & Terminal Schedule Card */}
        <div style={{
          background: '#FAF9F5',
          border: '1px solid #E2DDD5',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* Origin */}
            <div>
              <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                Scheduled Departure
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A' }}>
                {flight.departureTime}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#172D46', marginTop: '2px' }}>
                {flight.origin} (Terminal {flight.originTerminal})
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                Check-in Counter closes 45 mins prior
              </div>
            </div>

            {/* Path */}
            <div style={{ textAlign: 'center', minWidth: '180px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#172D46', marginBottom: '4px' }}>
                {flight.duration}
              </div>
              <div className="flight-line-connector">
                <Plane size={15} color="#172D46" style={{ transform: 'rotate(90deg)', zIndex: 2 }} />
              </div>
              <div style={{ fontSize: '11px', color: flight.stops === 0 ? '#39796B' : '#B98245', marginTop: '4px', fontWeight: 600 }}>
                {flight.stops === 0 ? 'Direct Non-stop flight' : `1 Stop (${flight.stopDetails?.airport || 'via Hub'})`}
              </div>
            </div>

            {/* Destination */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                Scheduled Arrival
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A' }}>
                {flight.arrivalTime}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#172D46', marginTop: '2px' }}>
                {flight.destination} (Terminal {flight.destinationTerminal})
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                Arrival Conveyor Belt Assigned upon Gate Taxi
              </div>
            </div>
          </div>
        </div>

        {/* Explainable Delay Risk Diagnostic Panel */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2DDD5',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#172D46" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#172D46' }}>
                Explainable Delay-Risk Assessment
              </h3>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: delayDiagnostic.level === 'Low' ? 'rgba(57, 121, 107, 0.12)' : delayDiagnostic.level === 'Moderate' ? 'rgba(185, 130, 69, 0.12)' : 'rgba(192, 57, 43, 0.1)',
              color: delayDiagnostic.level === 'Low' ? '#39796B' : delayDiagnostic.level === 'Moderate' ? '#B98245' : '#C0392B',
              padding: '4px 12px',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '12px',
              border: '1px solid currentColor'
            }}>
              <span>{delayDiagnostic.level} Risk Index ({delayDiagnostic.score}/100)</span>
            </div>
          </div>

          <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px', lineHeight: 1.5 }}>
            {delayDiagnostic.levelDescription} Primary driver:{' '}
            <strong style={{ color: '#0F172A' }}>{delayDiagnostic.primaryDriver}</strong>.
          </p>

          {/* Factor Weightings Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }} className="diagnostic-grid-responsive">
            {delayDiagnostic.breakdown.map((factor) => (
              <div
                key={factor.name}
                style={{
                  background: '#FAF9F5',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2DDD5'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>{factor.name}</span>
                  <span className="font-telemetry" style={{ fontSize: '11px', color: '#172D46', fontWeight: 600 }}>
                    Risk: {factor.val}% (Wt: {factor.weight})
                  </span>
                </div>
                {/* Progress bar */}
                <div style={{ width: '100%', height: '5px', background: '#E2DDD5', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                  <div style={{
                    width: `${factor.val}%`,
                    height: '100%',
                    background: factor.val > 60 ? '#C0392B' : factor.val > 30 ? '#B98245' : '#39796B',
                    borderRadius: '3px'
                  }} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.3 }}>
                  {factor.description}
                </div>
              </div>
            ))}
          </div>

          {/* Academic Disclaimer Box */}
          <div style={{
            background: '#FAF5EE',
            border: '1px solid #E8DFD1',
            padding: '10px 14px',
            borderRadius: '6px',
            fontSize: '11px',
            color: '#7C5424',
            lineHeight: 1.4,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <ShieldAlert size={15} color="#B98245" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>DEMO MODEL LIMITATIONS:</strong> {delayDiagnostic.disclaimer}
            </div>
          </div>
        </div>

        {/* Alternative Flight Recommendations */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={16} color="#172D46" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#172D46' }}>
              Alternative Flight Recommendations
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {/* Cheaper Alternative */}
            {cheaperAlt && (
              <div
                onClick={() => setActiveFlightDetail(cheaperAlt)}
                style={{
                  background: '#FAF9F5',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2DDD5',
                  cursor: 'pointer',
                  transition: 'var(--ease-smooth)'
                }}
              >
                <div style={{ fontSize: '11px', color: '#39796B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>
                  💰 Lower Fare Alternative
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                  {cheaperAlt.airline} ({cheaperAlt.flightNumber})
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Departs {cheaperAlt.departureTime} • Saves ₹{(flight.totalFare - cheaperAlt.totalFare).toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#172D46', marginTop: '4px' }}>
                  ₹{cheaperAlt.totalFare.toLocaleString('en-IN')}
                </div>
              </div>
            )}

            {/* Lower Risk Alternative */}
            {lowerRiskAlt && (
              <div
                onClick={() => setActiveFlightDetail(lowerRiskAlt)}
                style={{
                  background: '#FAF9F5',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2DDD5',
                  cursor: 'pointer',
                  transition: 'var(--ease-smooth)'
                }}
              >
                <div style={{ fontSize: '11px', color: '#172D46', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>
                  🛡️ Higher On-Time Reliability
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                  {lowerRiskAlt.airline} ({lowerRiskAlt.flightNumber})
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Departs {lowerRiskAlt.departureTime} • Risk score {lowerRiskAlt.delayRisk.score}%
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#172D46', marginTop: '4px' }}>
                  ₹{lowerRiskAlt.totalFare.toLocaleString('en-IN')}
                </div>
              </div>
            )}

            {/* Earlier Departure Alternative */}
            {earlierAlt && (
              <div
                onClick={() => setActiveFlightDetail(earlierAlt)}
                style={{
                  background: '#FAF9F5',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2DDD5',
                  cursor: 'pointer',
                  transition: 'var(--ease-smooth)'
                }}
              >
                <div style={{ fontSize: '11px', color: '#B98245', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>
                  ⏱️ Earlier Departure Window
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                  {earlierAlt.airline} ({earlierAlt.flightNumber})
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Departs at {earlierAlt.departureTime} (arrive earlier)
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
                  ₹{earlierAlt.totalFare.toLocaleString('en-IN')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid #E2DDD5'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Total Demo Fare (all taxes included)</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#172D46' }}>
              ₹{flight.totalFare.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => toggleComparison(flight)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: isCompared ? '#172D46' : '#FFFFFF',
                color: isCompared ? '#FFFFFF' : '#172D46',
                border: '1px solid #D5CEBF',
                padding: '9px 15px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Layers size={14} />
              <span>{isCompared ? 'In Comparison' : 'Add to Compare'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                saveTrip(flight);
                setActiveFlightDetail(null);
              }}
              className="btn-primary"
              style={{ padding: '9px 18px', fontSize: '13px' }}
            >
              <Bookmark size={14} />
              <span>Save to My Trips</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
