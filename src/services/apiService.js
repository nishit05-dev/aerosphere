import { generateFlightsForRoute, SEED_FLIGHTS } from '../data/sampleFlights';
import { HOURLY_CONGESTION_DATA, SEVEN_DAY_FARE_FORECAST, AIRLINE_PERFORMANCE_METRICS, FLEET_EFFICIENCY_METRICS } from '../data/analyticsData';
import { calculateExplainableDelayRisk } from './delayModel';

const SPRING_BOOT_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.backendAvailable = false;
    this.checkedBackend = false;
  }

  async checkBackendHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const res = await fetch(`${SPRING_BOOT_BASE_URL}/health`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      this.backendAvailable = res.ok;
    } catch {
      this.backendAvailable = false;
    }
    this.checkedBackend = true;
    return this.backendAvailable;
  }

  async searchFlights({ origin = 'DEL', destination = 'BOM', date = '2026-10-25', cabinClass = 'Economy' }) {
    if (this.backendAvailable) {
      try {
        const res = await fetch(`${SPRING_BOOT_BASE_URL}/flights/search?origin=${origin}&destination=${destination}&date=${date}&cabin=${cabinClass}`);
        if (res.ok) {
          const data = await res.json();
          return { data, source: 'Spring Boot REST API' };
        }
      } catch (err) {
        console.warn('Backend request failed, using local generator:', err);
      }
    }

    // Local Intelligent Simulation Fallback
    await new Promise(r => setTimeout(r, 350));
    const flights = generateFlightsForRoute(origin, destination, date);
    return { data: flights, source: 'AeroSphere Engine (Local Dataset)' };
  }

  async getFlightById(flightId) {
    if (this.backendAvailable) {
      try {
        const res = await fetch(`${SPRING_BOOT_BASE_URL}/flights/${flightId}`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn(e);
      }
    }

    const all = [...SEED_FLIGHTS];
    return all.find(f => f.id === flightId) || null;
  }

  async getDelayPrediction(flightParams) {
    if (this.backendAvailable) {
      try {
        const res = await fetch(`${SPRING_BOOT_BASE_URL}/delay/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(flightParams)
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn(e);
      }
    }

    return calculateExplainableDelayRisk(flightParams);
  }

  async getAnalyticsData() {
    if (this.backendAvailable) {
      try {
        const res = await fetch(`${SPRING_BOOT_BASE_URL}/analytics/summary`);
        if (res.ok) {
          const apiSummary = await res.json();
          return {
            hourlyCongestion: apiSummary.congestionPoints || HOURLY_CONGESTION_DATA,
            sevenDayForecast: apiSummary.fareForecast || SEVEN_DAY_FARE_FORECAST,
            airlinePerformance: apiSummary.airlineRankings || AIRLINE_PERFORMANCE_METRICS,
            fleetEfficiency: FLEET_EFFICIENCY_METRICS,
            source: 'Spring Boot Analytics Service'
          };
        }
      } catch (e) {
        console.warn('Backend analytics fetch failed, using local model:', e);
      }
    }

    return {
      hourlyCongestion: HOURLY_CONGESTION_DATA,
      sevenDayForecast: SEVEN_DAY_FARE_FORECAST,
      airlinePerformance: AIRLINE_PERFORMANCE_METRICS,
      fleetEfficiency: FLEET_EFFICIENCY_METRICS,
      source: 'AeroSphere Heuristic Simulation Engine'
    };
  }

  // Authenticated Trips API
  async fetchSavedTrips(token) {
    if (this.backendAvailable && token) {
      try {
        const res = await fetch(`${SPRING_BOOT_BASE_URL}/trips`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const trips = await res.json();
          return { trips, source: 'Spring Boot Persistent Data Layer' };
        }
      } catch (err) {
        console.warn('Backend fetchSavedTrips failed, using local cache:', err);
      }
    }
    return { trips: null, source: 'Local Storage Cache' };
  }

  async createSavedTrip(tripRequest, token) {
    if (this.backendAvailable && token) {
      try {
        const res = await fetch(`${SPRING_BOOT_BASE_URL}/trips`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(tripRequest)
        });
        if (res.ok) {
          const trip = await res.json();
          return { trip, source: 'Spring Boot Persistent Data Layer' };
        }
      } catch (err) {
        console.warn('Backend createSavedTrip failed, using local cache:', err);
      }
    }
    return null;
  }

  async deleteSavedTrip(tripId, token) {
    if (this.backendAvailable && token) {
      try {
        const res = await fetch(`${SPRING_BOOT_BASE_URL}/trips/${tripId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return res.ok || res.status === 204;
      } catch (err) {
        console.warn('Backend deleteSavedTrip failed:', err);
      }
    }
    return false;
  }
}

export const apiService = new ApiService();
