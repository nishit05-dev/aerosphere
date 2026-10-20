import { useState } from 'react';
import { ArrowLeftRight, Calendar, Users, Search, MapPin } from 'lucide-react';
import { useFlight } from '../context/useFlight';
import { AIRPORTS, POPULAR_ROUTES } from '../data/airports';

export function FlightSearch() {
  const {
    origin,
    setOrigin,
    destination,
    setDestination,
    travelDate,
    setTravelDate,
    tripType,
    setTripType,
    passengers,
    setPassengers,
    cabinClass,
    setCabinClass,
    executeSearch,
    swapAirports,
    isSearching
  } = useFlight();

  const [rotating, setRotating] = useState(false);

  const handleSwap = () => {
    setRotating(true);
    swapAirports();
    setTimeout(() => setRotating(false), 300);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    executeSearch(origin, destination, travelDate);
  };

  const handlePopularSelect = (route) => {
    setOrigin(route.origin);
    setDestination(route.destination);
    executeSearch(route.origin, route.destination, travelDate);
  };

  const originAirport = AIRPORTS.find((a) => a.code === origin) || AIRPORTS[0];
  const destAirport = AIRPORTS.find((a) => a.code === destination) || AIRPORTS[1];

  return (
    <div style={{ marginBottom: '28px' }}>
      {/* Search Container Box */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        position: 'relative',
        background: '#FFFFFF',
        border: '1px solid #E2DDD5',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-card)'
      }}>
        {/* Top Controls: Trip Type & Cabin Class */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '18px',
          paddingBottom: '14px',
          borderBottom: '1px solid #F1EFEA'
        }}>
          {/* Trip type buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#FAF9F5',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid #E2DDD5'
          }}>
            <button
              type="button"
              onClick={() => setTripType('oneWay')}
              style={{
                background: tripType === 'oneWay' ? '#172D46' : 'transparent',
                color: tripType === 'oneWay' ? '#FFFFFF' : '#475569',
                border: 'none',
                padding: '5px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: tripType === 'oneWay' ? 700 : 500,
                cursor: 'pointer',
                transition: 'var(--ease-smooth)'
              }}
            >
              One Way
            </button>
            <button
              type="button"
              onClick={() => setTripType('roundTrip')}
              style={{
                background: tripType === 'roundTrip' ? '#172D46' : 'transparent',
                color: tripType === 'roundTrip' ? '#FFFFFF' : '#475569',
                border: 'none',
                padding: '5px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: tripType === 'roundTrip' ? 700 : 500,
                cursor: 'pointer',
                transition: 'var(--ease-smooth)'
              }}
            >
              Round Trip (Simulated)
            </button>
          </div>

          {/* Cabin class tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Travel Class:</span>
            {['Economy', 'Premium Economy', 'Business'].map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => setCabinClass(cls)}
                style={{
                  background: cabinClass === cls ? '#172D46' : '#FFFFFF',
                  color: cabinClass === cls ? '#FFFFFF' : '#475569',
                  border: cabinClass === cls ? '1px solid #172D46' : '1px solid #E2DDD5',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: cabinClass === cls ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'var(--ease-smooth)'
                }}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Main Search Inputs Grid */}
        <form onSubmit={handleSearchSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(200px, 1.2fr) auto minmax(200px, 1.2fr) minmax(160px, 0.9fr) minmax(140px, 0.8fr) auto',
            gap: '12px',
            alignItems: 'center'
          }} className="search-grid-responsive">
            {/* Origin Airport */}
            <div style={{
              background: '#FAF9F5',
              border: '1px solid #D5CEBF',
              borderRadius: '8px',
              padding: '8px 12px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                <MapPin size={13} color="#172D46" />
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  From (Origin)
                </span>
              </div>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#0F172A',
                  fontSize: '15px',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {AIRPORTS.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.code} — {airport.city} ({airport.name.split(' ')[0]})
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {originAirport.name}
              </div>
            </div>

            {/* Airport Swap Button */}
            <button
              type="button"
              onClick={handleSwap}
              title="Swap Departure and Arrival"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid #D5CEBF',
                color: '#172D46',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: rotating ? 'rotate(180deg)' : 'none',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <ArrowLeftRight size={15} />
            </button>

            {/* Destination Airport */}
            <div style={{
              background: '#FAF9F5',
              border: '1px solid #D5CEBF',
              borderRadius: '8px',
              padding: '8px 12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                <MapPin size={13} color="#39796B" />
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  To (Destination)
                </span>
              </div>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#0F172A',
                  fontSize: '15px',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {AIRPORTS.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.code} — {airport.city} ({airport.name.split(' ')[0]})
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {destAirport.name}
              </div>
            </div>

            {/* Travel Date */}
            <div style={{
              background: '#FAF9F5',
              border: '1px solid #D5CEBF',
              borderRadius: '8px',
              padding: '8px 12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                <Calendar size={13} color="#172D46" />
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                  Travel Date
                </span>
              </div>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#0F172A',
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Passengers */}
            <div style={{
              background: '#FAF9F5',
              border: '1px solid #D5CEBF',
              borderRadius: '8px',
              padding: '8px 12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                <Users size={13} color="#172D46" />
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                  Passengers
                </span>
              </div>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#0F172A',
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value={1}>1 Passenger</option>
                <option value={2}>2 Passengers</option>
                <option value={3}>3 Passengers</option>
                <option value={4}>4 Passengers</option>
                <option value={5}>5 Passengers</option>
              </select>
            </div>

            {/* Search Submit CTA */}
            <div>
              <button
                type="submit"
                disabled={isSearching}
                className="btn-primary"
                style={{
                  height: '58px',
                  padding: '0 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  minWidth: '130px',
                  opacity: isSearching ? 0.7 : 1
                }}
              >
                {isSearching ? (
                  <span>Searching...</span>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Popular Route Shortcuts & Route Indicator */}
        <div style={{
          marginTop: '16px',
          paddingTop: '14px',
          borderTop: '1px solid #F1EFEA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
              Popular Domestic Corridors:
            </span>
            {POPULAR_ROUTES.map((route) => {
              const isSelected = origin === route.origin && destination === route.destination;
              return (
                <button
                  key={`${route.origin}-${route.destination}`}
                  type="button"
                  onClick={() => handlePopularSelect(route)}
                  style={{
                    background: isSelected ? '#172D46' : '#FAF9F5',
                    color: isSelected ? '#FFFFFF' : '#475569',
                    border: isSelected ? '1px solid #172D46' : '1px solid #E2DDD5',
                    padding: '3px 10px',
                    borderRadius: '14px',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--ease-smooth)'
                  }}
                >
                  {route.label}
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: '11px', color: '#64748B' }}>
            Selected Route: <span className="font-telemetry" style={{ color: '#172D46', fontWeight: 700 }}>{origin} → {destination}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
