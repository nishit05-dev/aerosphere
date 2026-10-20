import { Plane, Wifi, Utensils, Zap, ShieldCheck, AlertTriangle, Bookmark, Eye, Layers } from 'lucide-react';
import { useFlight } from '../context/useFlight';
import { AIRLINE_DETAILS } from '../data/sampleFlights';

export function FlightCard({ flight }) {
  const {
    toggleComparison,
    comparedFlights,
    setActiveFlightDetail,
    saveTrip
  } = useFlight();

  const isCompared = comparedFlights.some((f) => f.id === flight.id);
  const airlineMeta = AIRLINE_DETAILS[flight.airlineCode] || { color: '#172D46', bg: 'rgba(23, 45, 70, 0.08)' };

  const getRiskBadge = (risk) => {
    if (risk.level === 'Low') {
      return (
        <span className="badge-low-risk" title={risk.primaryReason}>
          <ShieldCheck size={13} />
          <span>Low Delay Risk ({risk.score}%)</span>
        </span>
      );
    }
    if (risk.level === 'Moderate') {
      return (
        <span className="badge-mod-risk" title={risk.primaryReason}>
          <AlertTriangle size={13} />
          <span>Moderate Delay Risk ({risk.score}%)</span>
        </span>
      );
    }
    return (
      <span className="badge-high-risk" title={risk.primaryReason}>
        <AlertTriangle size={13} />
        <span>Elevated Risk ({risk.score}%)</span>
      </span>
    );
  };

  return (
    <div className="glass-card" style={{
      padding: '20px 24px',
      marginBottom: '16px',
      borderLeft: `4px solid ${airlineMeta.color}`,
      position: 'relative',
      background: '#FFFFFF'
    }}>
      {/* Top Header: Airline + Flight Code + Aircraft + Risk Badge */}
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
            background: airlineMeta.bg,
            color: airlineMeta.color,
            fontWeight: 800,
            fontSize: '12px',
            padding: '4px 9px',
            borderRadius: '6px',
            border: `1px solid ${airlineMeta.color}30`,
            fontFamily: 'var(--font-mono)'
          }}>
            {flight.airlineCode}
          </div>
          <div>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginRight: '8px' }}>
              {flight.airline}
            </span>
            <span className="font-telemetry" style={{ fontSize: '13px', color: '#64748B' }}>
              {flight.flightNumber}
            </span>
          </div>

          <span className="badge-tag" style={{ marginLeft: '4px' }}>
            {flight.aircraft}
          </span>
          {flight.aircraftCategory === 'Widebody' && (
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              background: '#FAF5EE',
              color: '#B98245',
              border: '1px solid #E8DFD1',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              Widebody
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {getRiskBadge(flight.delayRisk)}
        </div>
      </div>

      {/* Center Section: Flight Itinerary Timeline & Fare Box */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 1fr) auto minmax(180px, 220px)',
        gap: '24px',
        alignItems: 'center'
      }} className="flight-card-inner-grid">
        {/* Timeline (Departure -> Duration/Stops -> Arrival) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr 1fr',
          gap: '12px',
          alignItems: 'center'
        }}>
          {/* Departure */}
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {flight.departureTime}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#172D46' }}>
                {flight.origin}
              </span>
              <span className="badge-tag" style={{ fontSize: '10px' }}>
                {flight.originTerminal}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              Terminal {flight.originTerminal}
            </div>
          </div>

          {/* Route path connector */}
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '4px' }}>
              {flight.duration}
            </div>

            <div className="flight-line-connector">
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#F5F3EE',
                border: '1px solid #CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}>
                <Plane size={13} color="#172D46" style={{ transform: 'rotate(90deg)' }} />
              </div>
            </div>

            <div style={{ fontSize: '11px', color: flight.stops === 0 ? '#39796B' : '#B98245', fontWeight: 600, marginTop: '4px' }}>
              {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop (${flight.stopDetails?.airport || 'via Hub'})`}
            </div>
          </div>

          {/* Arrival */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {flight.arrivalTime}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginTop: '4px' }}>
              <span className="badge-tag" style={{ fontSize: '10px' }}>
                {flight.destinationTerminal}
              </span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#172D46' }}>
                {flight.destination}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
              Terminal {flight.destinationTerminal}
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{
          width: '1px',
          height: '56px',
          background: '#E5E0D8'
        }} />

        {/* Price & Primary CTA */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
            Total Fare
          </div>
          <div style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#172D46',
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            ₹{flight.totalFare.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>
            Base ₹{flight.baseFare.toLocaleString('en-IN')} + Taxes ₹{flight.taxes}
          </div>
          {flight.seatsAvailable <= 5 && (
            <div style={{ fontSize: '11px', color: '#C0392B', fontWeight: 600, marginTop: '4px' }}>
              {flight.seatsAvailable} seats remaining
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer: Amenities + Telemetry + Action Buttons */}
      <div style={{
        marginTop: '16px',
        paddingTop: '12px',
        borderTop: '1px solid #F1EFEA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Amenities Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#475569' }} title="Baggage Allowance">
            <span>🧳 {flight.baggage.checkIn} Check-in</span>
          </div>

          {flight.amenities.wifi && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#172D46' }} title="High-Speed Wi-Fi available">
              <Wifi size={14} />
              <span>Wi-Fi</span>
            </div>
          )}

          {flight.amenities.mealIncluded ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#39796B', fontWeight: 600 }} title="Complimentary Hot Meal included">
              <Utensils size={14} />
              <span>Meal Included</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748B' }} title="Buy on-board meal">
              <Utensils size={14} />
              <span>Buy on-board</span>
            </div>
          )}

          {flight.amenities.usbPower && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#475569' }} title="In-seat USB / Power Outlet">
              <Zap size={14} />
              <span>In-seat Power</span>
            </div>
          )}

          <div style={{ fontSize: '12px', color: '#64748B' }}>
            Historical OTP: <strong style={{ color: '#172D46' }}>{flight.historicalOtp}%</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Compare toggle */}
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
              padding: '6px 12px',
              borderRadius: '7px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--ease-smooth)'
            }}
          >
            <Layers size={13} />
            <span>{isCompared ? 'Compared' : 'Compare'}</span>
          </button>

          {/* Save Trip */}
          <button
            type="button"
            onClick={() => saveTrip(flight)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              color: '#172D46',
              border: '1px solid #D5CEBF',
              padding: '6px 12px',
              borderRadius: '7px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--ease-smooth)'
            }}
          >
            <Bookmark size={13} />
            <span>Save</span>
          </button>

          {/* Details & Alternatives */}
          <button
            type="button"
            onClick={() => setActiveFlightDetail(flight)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#172D46',
              color: '#FFFFFF',
              border: '1px solid #172D46',
              padding: '6px 14px',
              borderRadius: '7px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--ease-smooth)'
            }}
          >
            <Eye size={13} />
            <span>Details & Alternatives</span>
          </button>
        </div>
      </div>
    </div>
  );
}
