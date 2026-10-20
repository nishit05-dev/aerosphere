import { X, Layers, Trash2, Bookmark, Eye } from 'lucide-react';
import { useFlight } from '../context/useFlight';
import { AIRLINE_DETAILS } from '../data/sampleFlights';

export function FlightComparisonModal() {
  const {
    comparedFlights,
    removeComparedFlight,
    clearComparison,
    isComparisonModalOpen,
    setIsComparisonModalOpen,
    setActiveFlightDetail,
    saveTrip
  } = useFlight();

  if (!isComparisonModalOpen || comparedFlights.length === 0) {
    return null;
  }

  const lowestPrice = Math.min(...comparedFlights.map((f) => f.totalFare));
  const shortestDuration = Math.min(...comparedFlights.map((f) => f.durationMinutes));

  return (
    <div className="modal-overlay" onClick={() => setIsComparisonModalOpen(false)}>
      <div
        className="modal-content"
        style={{ maxWidth: '1080px', padding: '24px 28px', background: '#FFFFFF' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingBottom: '14px',
          borderBottom: '1px solid #E2DDD5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#FAF9F5',
              border: '1px solid #D5CEBF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#172D46'
            }}>
              <Layers size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#172D46' }}>
                Side-by-Side Flight Comparison
              </h2>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Evaluating {comparedFlights.length} selected flights on fares, turnaround, and delay risk
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={clearComparison}
              style={{
                background: '#FAF9F5',
                border: '1px solid #E2DDD5',
                color: '#C0392B',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={() => setIsComparisonModalOpen(false)}
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

        {/* Matrix Comparison Table */}
        <div style={{ overflowX: 'auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `170px repeat(${comparedFlights.length}, minmax(260px, 1fr))`,
            gap: '14px'
          }}>
            {/* Header Labels Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '86px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Fare</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Duration & Stops</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Departure / Arrival</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Aircraft Fleet</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Seat Pitch & Legroom</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Baggage Included</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>In-Flight Amenities</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Delay Risk Index</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>On-Time Rate (OTP)</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Carbon Footprint</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginTop: '12px' }}>Actions</div>
            </div>

            {/* Flight Columns */}
            {comparedFlights.map((flight) => {
              const meta = AIRLINE_DETAILS[flight.airlineCode] || { color: '#172D46', bg: 'rgba(23, 45, 70, 0.08)' };
              const isBestPrice = flight.totalFare === lowestPrice;
              const isFastest = flight.durationMinutes === shortestDuration;

              return (
                <div
                  key={flight.id}
                  style={{
                    background: '#FAF9F5',
                    padding: '16px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    border: isBestPrice ? '2px solid #39796B' : isFastest ? '2px solid #172D46' : '1px solid #E2DDD5',
                    position: 'relative'
                  }}
                >
                  {/* Remove pill button */}
                  <button
                    onClick={() => removeComparedFlight(flight.id)}
                    title="Remove from comparison"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#FFFFFF',
                      border: '1px solid #E2DDD5',
                      color: '#64748B',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      padding: '4px'
                    }}
                  >
                    <Trash2 size={13} />
                  </button>

                  {/* Flight Header */}
                  <div style={{ minHeight: '68px' }}>
                    <div style={{
                      display: 'inline-block',
                      background: meta.bg,
                      color: meta.color,
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      marginBottom: '6px'
                    }}>
                      {flight.airline}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                      {flight.flightNumber}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      {flight.origin} → {flight.destination}
                    </div>
                  </div>

                  {/* Fare */}
                  <div>
                    <div style={{ fontSize: '19px', fontWeight: 800, color: isBestPrice ? '#39796B' : '#172D46' }}>
                      ₹{flight.totalFare.toLocaleString('en-IN')}
                    </div>
                    {isBestPrice && (
                      <span style={{ fontSize: '10px', color: '#39796B', fontWeight: 700, textTransform: 'uppercase' }}>
                        ★ Lowest Fare
                      </span>
                    )}
                  </div>

                  {/* Duration */}
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: isFastest ? '#172D46' : '#0F172A' }}>
                      {flight.duration}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop (${flight.stopDetails?.airport || 'via Hub'})`}
                    </div>
                  </div>

                  {/* Dep / Arr */}
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                      {flight.departureTime} → {flight.arrivalTime}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      T{flight.originTerminal} to T{flight.destinationTerminal}
                    </div>
                  </div>

                  {/* Aircraft */}
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                      {flight.aircraft}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      {flight.aircraftCategory}
                    </div>
                  </div>

                  {/* Seat Pitch */}
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                    {flight.seatPitch}
                  </div>

                  {/* Baggage */}
                  <div style={{ fontSize: '12px', color: '#334155' }}>
                    {flight.baggage.cabin} Cabin + {flight.baggage.checkIn} Check-in
                  </div>

                  {/* Amenities */}
                  <div style={{ fontSize: '11px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span>{flight.amenities.wifi ? '✓ Wi-Fi Included' : '✗ No Wi-Fi'}</span>
                    <span>{flight.amenities.mealIncluded ? '✓ Hot Meal Included' : '✗ Buy-on-Board'}</span>
                    <span>{flight.amenities.usbPower ? '✓ In-seat USB Power' : '✗ Standard Seat'}</span>
                  </div>

                  {/* Delay Risk */}
                  <div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: flight.delayRisk.level === 'Low' ? '#39796B' : flight.delayRisk.level === 'Moderate' ? '#B98245' : '#C0392B'
                    }}>
                      {flight.delayRisk.level} Risk ({flight.delayRisk.score}%)
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', lineHeight: 1.3 }}>
                      {flight.delayRisk.primaryReason.substring(0, 55)}...
                    </div>
                  </div>

                  {/* OTP */}
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#172D46' }}>
                    {flight.historicalOtp}% On-Time
                  </div>

                  {/* Carbon */}
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    ~{flight.carbonKg} kg CO₂e / seat
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsComparisonModalOpen(false);
                        setActiveFlightDetail(flight);
                      }}
                      style={{
                        padding: '6px 12px',
                        fontSize: '11px',
                        width: '100%',
                        background: '#FFFFFF',
                        border: '1px solid #D5CEBF',
                        color: '#172D46',
                        borderRadius: '6px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <Eye size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      View Detail
                    </button>
                    <button
                      type="button"
                      onClick={() => saveTrip(flight)}
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: '11px', width: '100%' }}
                    >
                      <Bookmark size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Save Itinerary
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
