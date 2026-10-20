import { useState, useEffect, useMemo, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { generateFlightsForRoute } from '../data/sampleFlights';
import { getIdToken } from '../services/firebase';
import { useAuth } from './useAuth';
import { FlightContext } from './flightContextDef';

const GET_USER_TRIPS_KEY = (uid) => `aerosphere_saved_trips_${uid || 'guest'}`;

export function FlightProvider({ children }) {
  const { user, openAuthModal } = useAuth();

  // Search parameters
  const [origin, setOrigin] = useState('DEL');
  const [destination, setDestination] = useState('BOM');
  const [travelDate, setTravelDate] = useState('2026-10-25');
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState('oneWay'); // 'oneWay' or 'roundTrip'
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');

  // Search state & initial raw results
  const [rawFlights, setRawFlights] = useState(() => generateFlightsForRoute('DEL', 'BOM', '2026-10-25'));
  const [dataSource, setDataSource] = useState('AeroSphere Engine (Local Dataset)');
  const [isSearching, setIsSearching] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);

  // Active view
  const [activeView, setActiveView] = useState('search'); // 'search' | 'analytics' | 'delayIntel' | 'savedTrips' | 'backendGuide'

  // Comparison tray
  const [comparedFlights, setComparedFlights] = useState([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Flight Detail Modal
  const [activeFlightDetail, setActiveFlightDetail] = useState(null);

  // Boarding Pass Modal
  const [activeBoardingPassTrip, setActiveBoardingPassTrip] = useState(null);

  // Saved trips (User-scoped)
  const [savedTrips, setSavedTrips] = useState([]);

  // Filter state
  const [filterStops, setFilterStops] = useState('all'); // 'all', '0', '1'
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [departureTimeSlot, setDepartureTimeSlot] = useState('all'); // 'all', 'early', 'morning', 'afternoon', 'evening'
  const [maxPriceFilter, setMaxPriceFilter] = useState(12000);
  const [aircraftCategoryFilter, setAircraftCategoryFilter] = useState('all'); // 'all', 'Widebody', 'Narrowbody'

  // Sort state
  const [sortBy, setSortBy] = useState('smart'); // 'smart', 'priceAsc', 'durationAsc', 'departureAsc', 'riskAsc'

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  }, []);

  // Check backend connectivity on mount and perform initial query
  useEffect(() => {
    let mounted = true;
    apiService.checkBackendHealth().then((isHealthy) => {
      if (!mounted) return;
      setBackendConnected(isHealthy);
      if (isHealthy) {
        apiService.searchFlights({ origin: 'DEL', destination: 'BOM', date: '2026-10-25', cabinClass: 'Economy' })
          .then((res) => {
            if (mounted && res?.data?.length) {
              setRawFlights(res.data);
              setDataSource(res.source);
            }
          })
          .catch(() => {});
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Synchronize trips with Backend API / Local Cache whenever user changes
  useEffect(() => {
    let cancelled = false;

    async function loadTrips() {
      if (!user) {
        setSavedTrips([]);
        return;
      }

      const storageKey = GET_USER_TRIPS_KEY(user.uid);
      let localCached = [];
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) localCached = JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse cached trips:', e);
      }

      // If backend is active, try to fetch from Spring Boot REST API
      const token = await getIdToken(user);
      if (token && apiService.backendAvailable) {
        const result = await apiService.fetchSavedTrips(token);
        if (!cancelled && result.trips) {
          setSavedTrips(result.trips);
          localStorage.setItem(storageKey, JSON.stringify(result.trips));
          return;
        }
      }

      if (!cancelled) {
        setSavedTrips(localCached);
      }
    }

    loadTrips();
    return () => {
      cancelled = true;
    };
  }, [user, backendConnected]);

  // Search flights method
  const executeSearch = useCallback(async (customOrigin, customDest, customDate) => {
    const o = customOrigin || origin;
    const d = customDest || destination;
    const dt = customDate || travelDate;

    if (o === d) {
      showToast('Origin and destination airport cannot be identical.', 'warning');
      return;
    }

    setIsSearching(true);
    try {
      const res = await apiService.searchFlights({
        origin: o,
        destination: d,
        date: dt,
        cabinClass
      });
      setRawFlights(res.data);
      setDataSource(res.source);
    } catch {
      showToast('Search encountered an error. Loaded simulated domestic schedules.', 'warning');
    } finally {
      setIsSearching(false);
    }
  }, [origin, destination, travelDate, cabinClass, showToast]);

  // Swap origin and destination
  const swapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    executeSearch(destination, temp, travelDate);
  };

  // Add flight to comparison
  const toggleComparison = (flight) => {
    const exists = comparedFlights.some((f) => f.id === flight.id);
    if (exists) {
      setComparedFlights(comparedFlights.filter((f) => f.id !== flight.id));
      showToast(`Removed ${flight.flightNumber} from flight comparison.`);
    } else {
      if (comparedFlights.length >= 3) {
        showToast('You can compare a maximum of 3 flights concurrently.', 'warning');
        return;
      }
      setComparedFlights([...comparedFlights, flight]);
      showToast(`Added ${flight.flightNumber} to comparison tray.`, 'success');
    }
  };

  const removeComparedFlight = (flightId) => {
    setComparedFlights(comparedFlights.filter((f) => f.id !== flightId));
  };

  const clearComparison = () => {
    setComparedFlights([]);
  };

  // Save trip handler (Persisted to Spring Boot API if available, user-scoped localStorage fallback)
  const saveTrip = async (flight) => {
    if (!user) {
      openAuthModal('login');
      showToast('Please sign in or select a Demo Persona to save itineraries.', 'info');
      return;
    }

    const token = await getIdToken(user);
    const storageKey = GET_USER_TRIPS_KEY(user.uid);

    const tripRequest = {
      flightId: flight.id,
      travelDate,
      passengers,
      cabinClass,
      seat: `${Math.floor(4 + Math.random() * 26)}${['A', 'B', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 6)]}`
    };

    let backendTrip = null;
    if (token && apiService.backendAvailable) {
      const res = await apiService.createSavedTrip(tripRequest, token);
      if (res?.trip) {
        backendTrip = res.trip;
      }
    }

    const newTrip = backendTrip || {
      tripId: `TRIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      pnr: `AS${Math.floor(1000 + Math.random() * 9000)}`,
      flight,
      userId: user.uid,
      userName: user.displayName || 'Distinguished Traveler',
      userEmail: user.email || 'traveler@aerosphere.in',
      travelDate,
      passengers,
      cabinClass,
      seat: tripRequest.seat,
      gate: ['G04', 'G12', 'G18', 'G22', 'G31'][Math.floor(Math.random() * 5)],
      status: 'Confirmed (Scheduled)',
      bookingTime: new Date().toISOString(),
      countdownDays: 4
    };

    const updated = [newTrip, ...savedTrips];
    setSavedTrips(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist to localStorage:', e);
    }

    showToast(`Saved flight ${flight.flightNumber} (PNR: ${newTrip.pnr}) to your saved trips.`, 'success');
  };

  const removeSavedTrip = async (tripId) => {
    if (!user) return;
    const token = await getIdToken(user);
    if (token && apiService.backendAvailable) {
      await apiService.deleteSavedTrip(tripId, token);
    }

    const updated = savedTrips.filter((t) => t.tripId !== tripId);
    setSavedTrips(updated);
    try {
      localStorage.setItem(GET_USER_TRIPS_KEY(user.uid), JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    showToast('Itinerary removed from your saved trips.', 'info');
  };

  // Filtered & Sorted Flights
  const filteredFlights = useMemo(() => {
    let result = [...rawFlights];

    // Stops filter
    if (filterStops === '0') {
      result = result.filter((f) => f.stops === 0);
    } else if (filterStops === '1') {
      result = result.filter((f) => f.stops >= 1);
    }

    // Airline filter
    if (selectedAirlines.length > 0) {
      result = result.filter((f) => selectedAirlines.includes(f.airlineCode));
    }

    // Departure time slot filter
    if (departureTimeSlot !== 'all') {
      result = result.filter((f) => {
        const hour = parseInt(f.departureTime.split(':')[0], 10);
        if (departureTimeSlot === 'early') return hour >= 0 && hour < 6;
        if (departureTimeSlot === 'morning') return hour >= 6 && hour < 12;
        if (departureTimeSlot === 'afternoon') return hour >= 12 && hour < 18;
        if (departureTimeSlot === 'evening') return hour >= 18 && hour < 24;
        return true;
      });
    }

    // Aircraft category
    if (aircraftCategoryFilter !== 'all') {
      result = result.filter((f) => f.aircraftCategory === aircraftCategoryFilter);
    }

    // Price filter
    if (maxPriceFilter) {
      result = result.filter((f) => f.totalFare <= maxPriceFilter);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'priceAsc') return a.totalFare - b.totalFare;
      if (sortBy === 'durationAsc') return a.durationMinutes - b.durationMinutes;
      if (sortBy === 'departureAsc') return a.departureTime.localeCompare(b.departureTime);
      if (sortBy === 'riskAsc') return a.delayRisk.score - b.delayRisk.score;
      if (sortBy === 'smart') {
        // AeroScore: Balances price (40%), duration (25%), delay risk (25%), and OTP (10%)
        const scoreA = (a.totalFare / 100) * 0.4 + a.durationMinutes * 0.25 + a.delayRisk.score * 1.5 - a.historicalOtp;
        const scoreB = (b.totalFare / 100) * 0.4 + b.durationMinutes * 0.25 + b.delayRisk.score * 1.5 - b.historicalOtp;
        return scoreA - scoreB;
      }
      return 0;
    });

    return result;
  }, [
    rawFlights,
    filterStops,
    selectedAirlines,
    departureTimeSlot,
    aircraftCategoryFilter,
    maxPriceFilter,
    sortBy
  ]);

  return (
    <FlightContext.Provider
      value={{
        origin,
        setOrigin,
        destination,
        setDestination,
        travelDate,
        setTravelDate,
        returnDate,
        setReturnDate,
        tripType,
        setTripType,
        passengers,
        setPassengers,
        cabinClass,
        setCabinClass,
        rawFlights,
        filteredFlights,
        dataSource,
        isSearching,
        executeSearch,
        swapAirports,
        backendConnected,
        activeView,
        setActiveView,
        comparedFlights,
        toggleComparison,
        removeComparedFlight,
        clearComparison,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        activeFlightDetail,
        setActiveFlightDetail,
        savedTrips,
        saveTrip,
        removeSavedTrip,
        activeBoardingPassTrip,
        setActiveBoardingPassTrip,
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
        setSortBy,
        toast,
        showToast
      }}
    >
      {children}
    </FlightContext.Provider>
  );
}
