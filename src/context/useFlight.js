import { useContext } from 'react';
import { FlightContext } from './flightContextDef';

export function useFlight() {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlight must be used within a FlightProvider');
  }
  return context;
}
