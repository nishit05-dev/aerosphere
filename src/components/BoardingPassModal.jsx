import { X, Plane, Printer, QrCode, AlertCircle } from 'lucide-react';
import { useFlight } from '../context/useFlight';

export function BoardingPassModal() {
  const { activeBoardingPassTrip, setActiveBoardingPassTrip } = useFlight();

  if (!activeBoardingPassTrip) return null;

  const trip = activeBoardingPassTrip;
  const flight = trip.flight;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveBoardingPassTrip(null)}>
      <div
        className="modal-content"
        style={{ maxWidth: '820px', padding: '24px 28px', background: '#FFFFFF' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid #E2DDD5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#172D46', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Digital Boarding SkyPass (Academic Simulation)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#FAF9F5',
                border: '1px solid #D5CEBF',
                color: '#172D46',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Printer size={13} />
              <span>Print Pass</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveBoardingPassTrip(null)}
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
        </div>

        {/* Boarding Pass Body (Authentic Airline Boarding Pass) */}
        <div style={{
          background: '#FAF9F5',
          borderRadius: '12px',
          border: '1px solid #D5CEBF',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(23, 45, 70, 0.08)',
          position: 'relative'
        }}>
          {/* Top Pass Ribbon */}
          <div style={{
            background: '#172D46',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '3px solid #B98245'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Plane size={18} color="#FFFFFF" />
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                AEROSPEHERE SKYPASS DEMO
              </span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#E2E8F0' }}>
              {flight.airline} • {trip.cabinClass || 'Economy'} CLASS
            </div>
          </div>

          {/* Academic Simulation Notice */}
          <div style={{
            background: '#FAF5EE',
            borderBottom: '1px dashed #D5CEBF',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            color: '#7C5424'
          }}>
            <AlertCircle size={14} color="#B98245" style={{ flexShrink: 0 }} />
            <span>
              <strong>ACADEMIC DEMO SKYPASS:</strong> Simulated flight record generated for university presentation. Not valid for actual civil airport security or flight dispatch.
            </span>
          </div>

          {/* Pass Content Grid */}
          <div style={{ padding: '24px' }}>
            {/* Origin & Destination Route banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              paddingBottom: '18px',
              borderBottom: '1px dashed #CBD5E1'
            }}>
              <div>
                <div style={{ fontSize: '42px', fontWeight: 900, color: '#172D46', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {flight.origin}
                </div>
                <div style={{ fontSize: '13px', color: '#172D46', fontWeight: 700, marginTop: '3px' }}>
                  Terminal {flight.originTerminal}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  Departs {flight.departureTime}
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '3px' }}>
                  {flight.duration} {flight.stops === 0 ? 'Non-stop' : '1 Stop'}
                </div>
                <Plane size={20} color="#172D46" style={{ transform: 'rotate(90deg)' }} />
                <div style={{ fontSize: '11px', color: '#39796B', fontWeight: 700, marginTop: '3px' }}>
                  Confirmed Record
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '42px', fontWeight: 900, color: '#172D46', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {flight.destination}
                </div>
                <div style={{ fontSize: '13px', color: '#172D46', fontWeight: 700, marginTop: '3px' }}>
                  Terminal {flight.destinationTerminal}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  Arrives {flight.arrivalTime}
                </div>
              </div>
            </div>

            {/* Passenger & Flight Details Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Passenger Name</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                  {trip.userName}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Flight Number</div>
                <div className="font-telemetry" style={{ fontSize: '14px', fontWeight: 700, color: '#172D46', marginTop: '2px' }}>
                  {flight.flightNumber}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Gate / Boarding</div>
                <div className="font-telemetry" style={{ fontSize: '14px', fontWeight: 700, color: '#39796B', marginTop: '2px' }}>
                  {trip.gate} / Closes -20m
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Seat Assignment</div>
                <div className="font-telemetry" style={{ fontSize: '17px', fontWeight: 800, color: '#172D46', marginTop: '2px' }}>
                  {trip.seat}
                </div>
              </div>
            </div>

            {/* Additional Information & PNR */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Demo PNR</div>
                <div className="font-telemetry" style={{ fontSize: '15px', fontWeight: 800, color: '#172D46', marginTop: '2px' }}>
                  {trip.pnr}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Travel Date</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginTop: '2px' }}>
                  {trip.travelDate}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Aircraft</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginTop: '2px' }}>
                  {flight.aircraft}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Baggage Allowance</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginTop: '2px' }}>
                  {flight.baggage.checkIn} Check-in
                </div>
              </div>
            </div>

            {/* Barcode Strip */}
            <div style={{
              background: '#FFFFFF',
              padding: '14px 18px',
              borderRadius: '8px',
              border: '1px solid #E2DDD5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <QrCode size={42} color="#172D46" />
                <div>
                  <div className="font-telemetry" style={{ fontSize: '11px', color: '#334155', fontWeight: 600 }}>
                    DEMO SECURITY DIGEST: 0x9AF8-410C-2B88
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    AeroSphere Academic Demonstration Electronic Travel Pass
                  </div>
                </div>
              </div>

              <div style={{
                fontFamily: 'monospace',
                fontSize: '16px',
                letterSpacing: '3px',
                color: '#172D46',
                fontWeight: 700
              }}>
                |||| ||||| |||| |||||||| |||||
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
