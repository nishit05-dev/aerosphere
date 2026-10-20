// Analytics Datasets for Recharts Visualizations in AeroSphere

export const HOURLY_CONGESTION_DATA = [
  { time: '05:00', departures: 14, congestionIndex: 18, avgDelayMins: 4 },
  { time: '06:00', departures: 32, congestionIndex: 35, avgDelayMins: 8 },
  { time: '07:00', departures: 54, congestionIndex: 68, avgDelayMins: 16 },
  { time: '08:00', departures: 68, congestionIndex: 88, avgDelayMins: 24 },
  { time: '09:00', departures: 72, congestionIndex: 94, avgDelayMins: 29 },
  { time: '10:00', departures: 58, congestionIndex: 72, avgDelayMins: 20 },
  { time: '11:00', departures: 44, congestionIndex: 52, avgDelayMins: 14 },
  { time: '12:00', departures: 38, congestionIndex: 44, avgDelayMins: 11 },
  { time: '13:00', departures: 36, congestionIndex: 40, avgDelayMins: 9 },
  { time: '14:00', departures: 42, congestionIndex: 48, avgDelayMins: 12 },
  { time: '15:00', departures: 46, congestionIndex: 54, avgDelayMins: 15 },
  { time: '16:00', departures: 52, congestionIndex: 62, avgDelayMins: 18 },
  { time: '17:00', departures: 64, congestionIndex: 78, avgDelayMins: 23 },
  { time: '18:00', departures: 78, congestionIndex: 96, avgDelayMins: 32 },
  { time: '19:00', departures: 82, congestionIndex: 98, avgDelayMins: 36 },
  { time: '20:00', departures: 74, congestionIndex: 86, avgDelayMins: 28 },
  { time: '21:00', departures: 60, congestionIndex: 70, avgDelayMins: 21 },
  { time: '22:00', departures: 45, congestionIndex: 50, avgDelayMins: 15 },
  { time: '23:00', departures: 28, congestionIndex: 32, avgDelayMins: 9 }
];

export const SEVEN_DAY_FARE_FORECAST = [
  { day: 'Wed Oct 21', delBom: 5200, bomBlr: 3900, blrDel: 5800, demandScore: 68 },
  { day: 'Thu Oct 22', delBom: 4900, bomBlr: 3700, blrDel: 5400, demandScore: 62 },
  { day: 'Fri Oct 23', delBom: 6800, bomBlr: 4800, blrDel: 7400, demandScore: 92 },
  { day: 'Sat Oct 24', delBom: 5900, bomBlr: 4300, blrDel: 6600, demandScore: 81 },
  { day: 'Sun Oct 25', delBom: 7200, bomBlr: 5100, blrDel: 7900, demandScore: 96 },
  { day: 'Mon Oct 26', delBom: 6400, bomBlr: 4500, blrDel: 7100, demandScore: 88 },
  { day: 'Tue Oct 27', delBom: 4600, bomBlr: 3400, blrDel: 5100, demandScore: 54 }
];

export const AIRLINE_PERFORMANCE_METRICS = [
  { airline: 'IndiGo', otp: 92.4, cancellationRate: 0.42, fleetSize: 365, satisfaction: 4.4 },
  { airline: 'Akasa Air', otp: 91.2, cancellationRate: 0.58, fleetSize: 25, satisfaction: 4.5 },
  { airline: 'Vistara', otp: 89.6, cancellationRate: 0.76, fleetSize: 70, satisfaction: 4.7 },
  { airline: 'Air India', otp: 85.8, cancellationRate: 1.38, fleetSize: 145, satisfaction: 4.1 },
  { airline: 'AI Express', otp: 86.4, cancellationRate: 1.22, fleetSize: 68, satisfaction: 4.0 },
  { airline: 'SpiceJet', otp: 78.5, cancellationRate: 3.15, fleetSize: 55, satisfaction: 3.5 }
];

export const FLEET_EFFICIENCY_METRICS = [
  { model: 'A321neo', fuelBurnKgKm: 2.8, co2GramsPerPaxKm: 62, noiseReductionPct: 50 },
  { model: '737 MAX 8', fuelBurnKgKm: 2.9, co2GramsPerPaxKm: 64, noiseReductionPct: 40 },
  { model: 'A320neo', fuelBurnKgKm: 3.0, co2GramsPerPaxKm: 68, noiseReductionPct: 50 },
  { model: '787-8 Dreamliner', fuelBurnKgKm: 4.8, co2GramsPerPaxKm: 76, noiseReductionPct: 60 },
  { model: '737-800 Classic', fuelBurnKgKm: 3.7, co2GramsPerPaxKm: 89, noiseReductionPct: 20 },
  { model: 'ATR 72-600', fuelBurnKgKm: 2.4, co2GramsPerPaxKm: 94, noiseReductionPct: 25 }
];
