import { BookmarkCheck, Plane, Trash2, Printer, Eye, UserCheck } from 'lucide-react';
import { useFlight } from '../context/useFlight';
import { useAuth } from '../context/useAuth';
import { AIRLINE_DETAILS } from '../data/sampleFlights';

export function SavedTripsView() {
  const {
    savedTrips,
    removeSavedTrip,
    setActiveBoardingPassTrip,
    setActiveFlightDetail,
    setActiveView
  } = useFlight();

  const { user, openAuthModal } = useAuth();

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
          <BookmarkCheck size={14} color="#172D46" />
          <span>My Passenger Dossier</span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#172D46',
          marginBottom: '8px',
          letterSpacing: '-0.02em'
        }}>
          Saved Flight Itineraries
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
          Manage your simulated itineraries, review assigned departure gates & boarding SkyPasses, and track punctuality metrics.
        </p>
      </div>

      {/* Guest notice if not authenticated */}
      {!user && (
        <div className="glass-panel" style={{
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          border: '1px solid #E8DFD1',
          background: '#FAF5EE',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCheck size={18} color="#B98245" />
            <div style={{ fontSize: '13px', color: '#7C5424' }}>
              You are viewing in Guest Mode. Sign in or choose an Academic Demo Persona to sync itineraries with user authorization.
            </div>
          </div>
          <button
            onClick={() => openAuthModal('demo')}
            className="btn-primary"
            style={{ padding: '6px 14px', fontSize: '12px' }}
          >
            Select Demo Persona
          </button>
        </div>
      )}

      {/* Trips Stream or Empty State */}
      {savedTrips.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {savedTrips.map((trip) => {
            const flight = trip.flight;
            const meta = AIRLINE_DETAILS[flight.airlineCode] || { color: '#172D46', bg: 'rgba(23, 45, 70, 0.08)' };

            return (
              <div
                key={trip.tripId}
                className="glass-card"
                style={{
                  padding: '22px 24px',
                  background: '#FFFFFF',
                  border: '1px solid #E2DDD5',
                  borderLeft: `4px solid ${meta.color}`,
                  borderRadius: '10px'
                }}
              >
                {/* Trip Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #F1EFEA'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      background: meta.bg,
                      color: meta.color,
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 9px',
                      borderRadius: '5px'
                    }}>
                      {flight.airline}
                    </div>
                    <span className="font-telemetry" style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                      {flight.flightNumber}
                    </span>
                    <span style={{ fontSize: '12px', color: '#CBD5E1' }}>•</span>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>
                      Demo PNR: <strong style={{ color: '#172D46' }} className="font-telemetry">{trip.pnr}</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: 'rgba(57, 121, 107, 0.12)',
                      color: '#39796B',
                      border: '1px solid rgba(57, 121, 107, 0.3)',
                      padding: '3px 10px',
                      borderRadius: '10px',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      {trip.status}
                    </span>
                    <span className="badge-tag">
                      Seat {trip.seat} • Gate {trip.gate}
                    </span>
                  </div>
                </div>

                {/* Route Details */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(280px, 1fr) auto minmax(180px, 220px)',
                  gap: '20px',
                  alignItems: 'center',
                  marginBottom: '16px'
                }} className="flight-card-inner-grid">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '12px', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
                        {flight.departureTime}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#172D46' }}>
                        {flight.origin} (T{flight.originTerminal})
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                        {flight.duration}
                      </div>
                      <div className="flight-line-connector">
                        <Plane size={14} color="#172D46" style={{ transform: 'rotate(90deg)', zIndex: 2 }} />
                      </div>
                      <div style={{ fontSize: '11px', color: '#39796B', fontWeight: 600 }}>
                        {flight.stops === 0 ? 'Non-stop' : '1 Stop'}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
                        {flight.arrivalTime}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#172D46' }}>
                        {flight.destination} (T{flight.destinationTerminal})
                      </div>
                    </div>
                  </div>

                  <div style={{ width: '1px', height: '46px', background: '#E2DDD5' }} />

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Passenger</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                      {trip.userName}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                      Travel Date: {trip.travelDate}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #F1EFEA'
                }}>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Aircraft: <strong style={{ color: '#0F172A' }}>{flight.aircraft}</strong> • Fare Paid:{' '}
                    <strong style={{ color: '#172D46' }}>₹{flight.totalFare.toLocaleString('en-IN')}</strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => setActiveBoardingPassTrip(trip)}
                      className="btn-primary"
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                    >
                      <Printer size={13} />
                      <span>Digital SkyPass</span>
                    </button>

                    <button
                      onClick={() => setActiveFlightDetail(flight)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        background: '#FFFFFF',
                        border: '1px solid #D5CEBF',
                        color: '#172D46',
                        borderRadius: '6px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={13} />
                      <span>Diagnostics</span>
                    </button>

                    <button
                      onClick={() => removeSavedTrip(trip.tripId)}
                      title="Cancel / Delete Saved Itinerary"
                      style={{
                        background: '#FAF9F5',
                        border: '1px solid #E2DDD5',
                        color: '#C0392B',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-panel" style={{
          padding: '50px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          background: '#FFFFFF',
          border: '1px solid #E2DDD5',
          borderRadius: '12px'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#FAF9F5',
            border: '1px solid #D5CEBF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#172D46'
          }}>
            <BookmarkCheck size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#172D46' }}>
            No Saved Flights in Itinerary
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '440px', lineHeight: 1.5 }}>
            Browse through domestic flight listings, run explainable delay risk assessments, and click 'Save' to track your trip and generate digital boarding SkyPasses.
          </p>
          <button
            onClick={() => setActiveView('search')}
            className="btn-primary"
            style={{ padding: '9px 20px', fontSize: '13px', marginTop: '4px' }}
          >
            <Plane size={14} />
            <span>Search Indian Domestic Flights</span>
          </button>
        </div>
      )}
    </div>
  );
}
