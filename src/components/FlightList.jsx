import { SlidersHorizontal, ArrowUpDown, RotateCcw, AlertCircle } from 'lucide-react';
import { useFlight } from '../context/useFlight';
import { FlightCard } from './FlightCard';
import { AIRLINE_DETAILS } from '../data/sampleFlights';

export function FlightList() {
  const {
    filteredFlights,
    rawFlights,
    origin,
    destination,
    travelDate,
    dataSource,
    filterStops,
    setFilterStops,
    selectedAirlines,
    setSelectedAirlines,
    departureTimeSlot,
    setDepartureTimeSlot,
    maxPriceFilter,
    setMaxPriceFilter,
    aircraftCategoryFilter,
    setAircraftCategoryFilter,
    sortBy,
    setSortBy
  } = useFlight();

  const handleAirlineToggle = (code) => {
    if (selectedAirlines.includes(code)) {
      setSelectedAirlines(selectedAirlines.filter((c) => c !== code));
    } else {
      setSelectedAirlines([...selectedAirlines, code]);
    }
  };

  const resetFilters = () => {
    setFilterStops('all');
    setSelectedAirlines([]);
    setDepartureTimeSlot('all');
    setMaxPriceFilter(15000);
    setAircraftCategoryFilter('all');
    setSortBy('smart');
  };

  const hasActiveFilters =
    filterStops !== 'all' ||
    selectedAirlines.length > 0 ||
    departureTimeSlot !== 'all' ||
    aircraftCategoryFilter !== 'all' ||
    maxPriceFilter < 12000;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: '24px',
      alignItems: 'start'
    }} className="flight-list-layout-responsive">
      {/* Left Filter Sidebar */}
      <aside className="glass-panel" style={{
        padding: '20px',
        position: 'sticky',
        top: '86px',
        background: '#FFFFFF',
        border: '1px solid #E2DDD5',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid #F1EFEA'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={16} color="#172D46" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#172D46' }}>Refine Results</h3>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#39796B',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Stops Filter */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
            Flight Stops
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'all', label: 'All Flights' },
              { id: '0', label: 'Non-stop Only' },
              { id: '1', label: '1+ Stops' }
            ].map((option) => (
              <label
                key={option.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: filterStops === option.id ? '#172D46' : '#475569',
                  fontWeight: filterStops === option.id ? 600 : 400,
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="stopsFilter"
                  checked={filterStops === option.id}
                  onChange={() => setFilterStops(option.id)}
                  style={{ accentColor: '#172D46', cursor: 'pointer' }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Departure Time Slots */}
        <div style={{ marginBottom: '18px', paddingTop: '14px', borderTop: '1px solid #F1EFEA' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
            Departure Window
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {[
              { id: 'all', label: 'Anytime' },
              { id: 'early', label: '00:00 - 06:00' },
              { id: 'morning', label: '06:00 - 12:00' },
              { id: 'afternoon', label: '12:00 - 18:00' },
              { id: 'evening', label: '18:00 - 24:00' }
            ].map((slot) => {
              const isActive = departureTimeSlot === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setDepartureTimeSlot(slot.id)}
                  style={{
                    background: isActive ? '#172D46' : '#FAF9F5',
                    color: isActive ? '#FFFFFF' : '#475569',
                    border: isActive ? '1px solid #172D46' : '1px solid #E2DDD5',
                    padding: '6px 6px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'var(--ease-smooth)'
                  }}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Airlines Filter */}
        <div style={{ marginBottom: '18px', paddingTop: '14px', borderTop: '1px solid #F1EFEA' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
            Carriers
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(AIRLINE_DETAILS).map(([code, meta]) => {
              const isChecked = selectedAirlines.includes(code);
              return (
                <label
                  key={code}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    color: isChecked ? '#172D46' : '#475569',
                    fontWeight: isChecked ? 600 : 400,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleAirlineToggle(code)}
                      style={{ accentColor: '#172D46', cursor: 'pointer' }}
                    />
                    <span>{meta.name}</span>
                  </div>
                  <span className="font-telemetry" style={{ fontSize: '11px', color: '#64748B' }}>
                    OTP {meta.avgOtp}%
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Aircraft Category */}
        <div style={{ marginBottom: '18px', paddingTop: '14px', borderTop: '1px solid #F1EFEA' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
            Aircraft Type
          </label>
          <select
            value={aircraftCategoryFilter}
            onChange={(e) => setAircraftCategoryFilter(e.target.value)}
            className="aerosphere-select"
            style={{ padding: '8px 10px', fontSize: '12px' }}
          >
            <option value="all">All Aircraft Types</option>
            <option value="Widebody">Widebody Only (787 Dreamliner)</option>
            <option value="Narrowbody">Narrowbody Only (A320/A321/737)</option>
          </select>
        </div>

        {/* Max Budget Slider */}
        <div style={{ paddingTop: '14px', borderTop: '1px solid #F1EFEA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Max Fare Limit
            </label>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#172D46' }}>
              ₹{maxPriceFilter.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min={3000}
            max={15000}
            step={250}
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#172D46', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', marginTop: '4px' }}>
            <span>₹3,000</span>
            <span>₹15,000</span>
          </div>
        </div>
      </aside>

      {/* Main Results Column */}
      <section>
        {/* Results Overview & Sort Bar */}
        <div className="glass-panel" style={{
          padding: '14px 20px',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          background: '#FFFFFF',
          border: '1px solid #E2DDD5',
          borderRadius: '10px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#172D46' }}>
                {origin} → {destination}
              </h2>
              <span className="badge-tag">
                {filteredFlights.length} of {rawFlights.length} flights
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
              Travel Date: <strong style={{ color: '#0F172A' }}>{travelDate}</strong> • Source:{' '}
              <span style={{ color: '#39796B', fontWeight: 600 }}>{dataSource}</span>
            </div>
          </div>

          {/* Sort Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <ArrowUpDown size={13} />
              Sort:
            </span>
            <div style={{
              display: 'flex',
              background: '#FAF9F5',
              padding: '3px',
              borderRadius: '7px',
              border: '1px solid #E2DDD5'
            }}>
              {[
                { id: 'smart', label: 'Balanced (AeroScore)' },
                { id: 'priceAsc', label: 'Cheapest' },
                { id: 'durationAsc', label: 'Fastest' },
                { id: 'departureAsc', label: 'Earliest' },
                { id: 'riskAsc', label: 'Lowest Delay' }
              ].map((opt) => {
                const isActive = sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id)}
                    style={{
                      background: isActive ? '#172D46' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#475569',
                      border: 'none',
                      padding: '5px 9px',
                      borderRadius: '5px',
                      fontSize: '11px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'var(--ease-smooth)'
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Flight Cards Stream */}
        {filteredFlights.length > 0 ? (
          <div>
            {filteredFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{
            padding: '48px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            background: '#FFFFFF',
            border: '1px solid #E2DDD5',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'rgba(185, 130, 69, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#B98245'
            }}>
              <AlertCircle size={26} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#172D46' }}>
              No Flights Match Current Filters
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '420px', lineHeight: 1.5 }}>
              No scheduled flights in the demo catalog match your combined departure window, airline selection, or budget limit.
            </p>
            <button
              onClick={resetFilters}
              className="btn-primary"
              style={{ marginTop: '8px', padding: '8px 18px' }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
