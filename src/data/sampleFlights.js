// Indian Domestic Sample Flights & Dynamic Schedule Generator for Academic Project

export const AIRLINE_DETAILS = {
  '6E': { name: 'IndiGo', code: '6E', color: '#0052CC', bg: 'rgba(0, 82, 204, 0.15)', fleet: 'A320neo / A321neo', avgOtp: 92.4 },
  'AI': { name: 'Air India', code: 'AI', color: '#E11D48', bg: 'rgba(225, 29, 72, 0.15)', fleet: 'A320neo / B787-8', avgOtp: 85.8 },
  'UK': { name: 'Vistara', code: 'UK', color: '#8B1E43', bg: 'rgba(139, 30, 67, 0.15)', fleet: 'A321neo / B787-9', avgOtp: 89.6 },
  'QP': { name: 'Akasa Air', code: 'QP', color: '#EA580C', bg: 'rgba(234, 88, 12, 0.15)', fleet: 'Boeing 737 MAX 8', avgOtp: 91.2 },
  'SG': { name: 'SpiceJet', code: 'SG', color: '#DC2626', bg: 'rgba(220, 38, 38, 0.15)', fleet: 'Boeing 737-800', avgOtp: 78.5 },
  'IX': { name: 'Air India Express', code: 'IX', color: '#0D9488', bg: 'rgba(13, 148, 136, 0.15)', fleet: 'Boeing 737 MAX 8', avgOtp: 86.4 }
};

// Seed dataset for primary routes
export const SEED_FLIGHTS = [
  // DEL -> BOM
  {
    id: 'AS-DEL-BOM-6E2041',
    flightNumber: '6E-2041',
    airline: 'IndiGo',
    airlineCode: '6E',
    origin: 'DEL',
    originTerminal: 'T2',
    destination: 'BOM',
    destinationTerminal: 'T2',
    departureTime: '06:00',
    arrivalTime: '08:15',
    duration: '2h 15m',
    durationMinutes: 135,
    stops: 0,
    stopDetails: null,
    aircraft: 'Airbus A321neo',
    aircraftCategory: 'Narrowbody',
    baseFare: 4850,
    taxes: 720,
    totalFare: 5570,
    seatsAvailable: 7,
    cabinClass: 'Economy',
    seatPitch: '31 in',
    baggage: { cabin: '7 kg', checkIn: '15 kg' },
    amenities: { wifi: false, mealIncluded: false, usbPower: true, entertainment: false },
    historicalOtp: 94.6,
    carbonKg: 112,
    delayRisk: {
      score: 14,
      level: 'Low',
      factors: { routeCongestion: 10, weatherFactor: 8, turnaroundRisk: 12, peakHourIndex: 10 },
      primaryReason: 'Dawn departure slot avoids morning apron congestion at BOM runway 27.',
      explanation: 'First flight of the aircraft day minimizes cascading rotational delays.'
    }
  },
  {
    id: 'AS-DEL-BOM-AI805',
    flightNumber: 'AI-805',
    airline: 'Air India',
    airlineCode: 'AI',
    origin: 'DEL',
    originTerminal: 'T3',
    destination: 'BOM',
    destinationTerminal: 'T2',
    departureTime: '07:30',
    arrivalTime: '09:50',
    duration: '2h 20m',
    durationMinutes: 140,
    stops: 0,
    stopDetails: null,
    aircraft: 'Boeing 787-8 Dreamliner',
    aircraftCategory: 'Widebody',
    baseFare: 5600,
    taxes: 840,
    totalFare: 6440,
    seatsAvailable: 4,
    cabinClass: 'Economy',
    seatPitch: '33 in',
    baggage: { cabin: '7 kg', checkIn: '25 kg' },
    amenities: { wifi: true, mealIncluded: true, usbPower: true, entertainment: true },
    historicalOtp: 86.4,
    carbonKg: 128,
    delayRisk: {
      score: 28,
      level: 'Moderate',
      factors: { routeCongestion: 32, weatherFactor: 12, turnaroundRisk: 24, peakHourIndex: 35 },
      primaryReason: 'Arrival into Mumbai aligns with morning rush airspace throttling.',
      explanation: 'Widebody boarding may experience minor tarmac hold during peak pushback.'
    }
  },
  {
    id: 'AS-DEL-BOM-UK819',
    flightNumber: 'UK-819',
    airline: 'Vistara',
    airlineCode: 'UK',
    origin: 'DEL',
    originTerminal: 'T3',
    destination: 'BOM',
    destinationTerminal: 'T2',
    departureTime: '09:15',
    arrivalTime: '11:30',
    duration: '2h 15m',
    durationMinutes: 135,
    stops: 0,
    stopDetails: null,
    aircraft: 'Airbus A321neo',
    aircraftCategory: 'Narrowbody',
    baseFare: 6100,
    taxes: 890,
    totalFare: 6990,
    seatsAvailable: 12,
    cabinClass: 'Economy',
    seatPitch: '32 in',
    baggage: { cabin: '7 kg', checkIn: '15 kg' },
    amenities: { wifi: true, mealIncluded: true, usbPower: true, entertainment: true },
    historicalOtp: 91.8,
    carbonKg: 114,
    delayRisk: {
      score: 34,
      level: 'Moderate',
      factors: { routeCongestion: 42, weatherFactor: 15, turnaroundRisk: 28, peakHourIndex: 38 },
      primaryReason: 'Delhi T3 mid-morning departure queue.',
      explanation: 'Moderate traffic density at DEL departure runway 28.'
    }
  },
  {
    id: 'AS-DEL-BOM-QP1302',
    flightNumber: 'QP-1302',
    airline: 'Akasa Air',
    airlineCode: 'QP',
    origin: 'DEL',
    originTerminal: 'T2',
    destination: 'BOM',
    destinationTerminal: 'T2',
    departureTime: '13:40',
    arrivalTime: '15:55',
    duration: '2h 15m',
    durationMinutes: 135,
    stops: 0,
    stopDetails: null,
    aircraft: 'Boeing 737 MAX 8',
    aircraftCategory: 'Narrowbody',
    baseFare: 4250,
    taxes: 690,
    totalFare: 4940,
    seatsAvailable: 15,
    cabinClass: 'Economy',
    seatPitch: '31 in',
    baggage: { cabin: '7 kg', checkIn: '15 kg' },
    amenities: { wifi: false, mealIncluded: false, usbPower: true, entertainment: false },
    historicalOtp: 92.5,
    carbonKg: 104,
    delayRisk: {
      score: 19,
      level: 'Low',
      factors: { routeCongestion: 18, weatherFactor: 12, turnaroundRisk: 18, peakHourIndex: 16 },
      primaryReason: 'Afternoon off-peak window offers steady clearance.',
      explanation: 'Lowest historical holding pattern delay on the DEL-BOM corridor.'
    }
  },
  {
    id: 'AS-DEL-BOM-SG8169',
    flightNumber: 'SG-8169',
    airline: 'SpiceJet',
    airlineCode: 'SG',
    origin: 'DEL',
    originTerminal: 'T3',
    destination: 'BOM',
    destinationTerminal: 'T1',
    departureTime: '17:50',
    arrivalTime: '20:10',
    duration: '2h 20m',
    durationMinutes: 140,
    stops: 0,
    stopDetails: null,
    aircraft: 'Boeing 737-800',
    aircraftCategory: 'Narrowbody',
    baseFare: 3950,
    taxes: 650,
    totalFare: 4600,
    seatsAvailable: 3,
    cabinClass: 'Economy',
    seatPitch: '30 in',
    baggage: { cabin: '7 kg', checkIn: '15 kg' },
    amenities: { wifi: false, mealIncluded: false, usbPower: false, entertainment: false },
    historicalOtp: 76.2,
    carbonKg: 132,
    delayRisk: {
      score: 68,
      level: 'High',
      factors: { routeCongestion: 78, weatherFactor: 24, turnaroundRisk: 72, peakHourIndex: 82 },
      primaryReason: 'Evening rush hour compounded by prior multi-sector rotations.',
      explanation: 'Inbound aircraft operates 3 prior legs; evening departure slot has frequent 25-40m gate hold.'
    }
  },
  {
    id: 'AS-DEL-BOM-6E4521-1STOP',
    flightNumber: '6E-4521 / 6E-512',
    airline: 'IndiGo',
    airlineCode: '6E',
    origin: 'DEL',
    originTerminal: 'T2',
    destination: 'BOM',
    destinationTerminal: 'T2',
    departureTime: '11:10',
    arrivalTime: '15:25',
    duration: '4h 15m',
    durationMinutes: 255,
    stops: 1,
    stopDetails: { airport: 'HYD', duration: '1h 15m layover' },
    aircraft: 'Airbus A320neo',
    aircraftCategory: 'Narrowbody',
    baseFare: 3600,
    taxes: 610,
    totalFare: 4210,
    seatsAvailable: 9,
    cabinClass: 'Economy',
    seatPitch: '30 in',
    baggage: { cabin: '7 kg', checkIn: '15 kg' },
    amenities: { wifi: false, mealIncluded: false, usbPower: true, entertainment: false },
    historicalOtp: 88.0,
    carbonKg: 145,
    delayRisk: {
      score: 42,
      level: 'Moderate',
      factors: { routeCongestion: 38, weatherFactor: 16, turnaroundRisk: 52, peakHourIndex: 34 },
      primaryReason: 'Connecting leg adds dependency on Hyderabad transfer timeliness.',
      explanation: 'Layover time of 1h 15m is within standard connection buffer.'
    }
  },

  // BLR -> DEL
  {
    id: 'AS-BLR-DEL-6E213',
    flightNumber: '6E-213',
    airline: 'IndiGo',
    airlineCode: '6E',
    origin: 'BLR',
    originTerminal: 'T1',
    destination: 'DEL',
    destinationTerminal: 'T2',
    departureTime: '06:40',
    arrivalTime: '09:25',
    duration: '2h 45m',
    durationMinutes: 165,
    stops: 0,
    stopDetails: null,
    aircraft: 'Airbus A321neo',
    aircraftCategory: 'Narrowbody',
    baseFare: 5200,
    taxes: 760,
    totalFare: 5960,
    seatsAvailable: 8,
    cabinClass: 'Economy',
    seatPitch: '31 in',
    baggage: { cabin: '7 kg', checkIn: '15 kg' },
    amenities: { wifi: false, mealIncluded: false, usbPower: true, entertainment: false },
    historicalOtp: 95.1,
    carbonKg: 135,
    delayRisk: {
      score: 16,
      level: 'Low',
      factors: { routeCongestion: 12, weatherFactor: 10, turnaroundRisk: 14, peakHourIndex: 18 },
      primaryReason: 'Clear morning airspace over Deccan plateau into Delhi.',
      explanation: 'Terminal 1 swift pushback with no ATC runway hold expected.'
    }
  },
  {
    id: 'AS-BLR-DEL-AI505',
    flightNumber: 'AI-505',
    airline: 'Air India',
    airlineCode: 'AI',
    origin: 'BLR',
    originTerminal: 'T2 (Garden Terminal)',
    destination: 'DEL',
    destinationTerminal: 'T3',
    departureTime: '10:00',
    arrivalTime: '12:50',
    duration: '2h 50m',
    durationMinutes: 170,
    stops: 0,
    stopDetails: null,
    aircraft: 'Boeing 787-8 Dreamliner',
    aircraftCategory: 'Widebody',
    baseFare: 6300,
    taxes: 890,
    totalFare: 7190,
    seatsAvailable: 6,
    cabinClass: 'Economy',
    seatPitch: '33 in',
    baggage: { cabin: '7 kg', checkIn: '25 kg' },
    amenities: { wifi: true, mealIncluded: true, usbPower: true, entertainment: true },
    historicalOtp: 88.5,
    carbonKg: 142,
    delayRisk: {
      score: 26,
      level: 'Moderate',
      factors: { routeCongestion: 28, weatherFactor: 15, turnaroundRisk: 22, peakHourIndex: 25 },
      primaryReason: 'Midday arrival at Delhi T3.',
      explanation: 'Stable flight corridor with minor traffic sequencing upon arrival.'
    }
  },
  {
    id: 'AS-BLR-DEL-UK808',
    flightNumber: 'UK-808',
    airline: 'Vistara',
    airlineCode: 'UK',
    origin: 'BLR',
    originTerminal: 'T2 (Garden Terminal)',
    destination: 'DEL',
    destinationTerminal: 'T3',
    departureTime: '18:15',
    arrivalTime: '21:05',
    duration: '2h 50m',
    durationMinutes: 170,
    stops: 0,
    stopDetails: null,
    aircraft: 'Airbus A321neo',
    aircraftCategory: 'Narrowbody',
    baseFare: 6800,
    taxes: 940,
    totalFare: 7740,
    seatsAvailable: 2,
    cabinClass: 'Economy',
    seatPitch: '32 in',
    baggage: { cabin: '7 kg', checkIn: '15 kg' },
    amenities: { wifi: true, mealIncluded: true, usbPower: true, entertainment: true },
    historicalOtp: 87.2,
    carbonKg: 136,
    delayRisk: {
      score: 54,
      level: 'Moderate',
      factors: { routeCongestion: 62, weatherFactor: 18, turnaroundRisk: 58, peakHourIndex: 65 },
      primaryReason: 'Evening Delhi arrival peak holding stack.',
      explanation: 'High demand slot; minor 15-20 min holding pattern over Delhi airspace common.'
    }
  },

  // BOM -> BLR
  {
    id: 'AS-BOM-BLR-6E348',
    flightNumber: '6E-348',
    airline: 'IndiGo',
    airlineCode: '6E',
    origin: 'BOM',
    originTerminal: 'T2',
    destination: 'BLR',
    destinationTerminal: 'T1',
    departureTime: '07:10',
    arrivalTime: '08:50',
    duration: '1h 40m',
    durationMinutes: 100,
    stops: 0,
    stopDetails: null,
    aircraft: 'Airbus A320neo',
    aircraftCategory: 'Narrowbody',
    baseFare: 3600,
    taxes: 580,
    totalFare: 4180,
    seatsAvailable: 11,
    cabinClass: 'Economy',
    seatPitch: '30 in',
    baggage: { cabin: '7 kg', checkIn: '15 kg' },
    amenities: { wifi: false, mealIncluded: false, usbPower: true, entertainment: false },
    historicalOtp: 93.9,
    carbonKg: 86,
    delayRisk: {
      score: 18,
      level: 'Low',
      factors: { routeCongestion: 18, weatherFactor: 10, turnaroundRisk: 15, peakHourIndex: 20 },
      primaryReason: 'Morning business shuttle with priority departure sequencing.',
      explanation: 'High operational priority route for IndiGo network.'
    }
  },
  {
    id: 'AS-BOM-BLR-QP1104',
    flightNumber: 'QP-1104',
    airline: 'Akasa Air',
    airlineCode: 'QP',
    origin: 'BOM',
    originTerminal: 'T2',
    destination: 'BLR',
    destinationTerminal: 'T1',
    departureTime: '14:20',
    arrivalTime: '16:00',
    duration: '1h 40m',
    durationMinutes: 100,
    stops: 0,
    stopDetails: null,
    aircraft: 'Boeing 737 MAX 8',
    aircraftCategory: 'Narrowbody',
    baseFare: 3250,
    taxes: 520,
    totalFare: 3770,
    seatsAvailable: 14,
    cabinClass: 'Economy',
    seatPitch: '31 in',
    baggage: { cabin: '7 kg', checkIn: '15 kg' },
    amenities: { wifi: false, mealIncluded: false, usbPower: true, entertainment: false },
    historicalOtp: 92.0,
    carbonKg: 79,
    delayRisk: {
      score: 22,
      level: 'Low',
      factors: { routeCongestion: 20, weatherFactor: 12, turnaroundRisk: 22, peakHourIndex: 18 },
      primaryReason: 'Afternoon off-peak sector.',
      explanation: 'Low runway occupancy at both BOM and BLR.'
    }
  },

  // DEL -> GOI
  {
    id: 'AS-DEL-GOI-6E6354',
    flightNumber: '6E-6354',
    airline: 'IndiGo',
    airlineCode: '6E',
    origin: 'DEL',
    originTerminal: 'T2',
    destination: 'GOI',
    destinationTerminal: 'Integrated Terminal',
    departureTime: '10:45',
    arrivalTime: '13:20',
    duration: '2h 35m',
    durationMinutes: 155,
    stops: 0,
    stopDetails: null,
    aircraft: 'Airbus A320neo',
    aircraftCategory: 'Narrowbody',
    baseFare: 5900,
    taxes: 820,
    totalFare: 6720,
    seatsAvailable: 5,
    cabinClass: 'Economy',
    seatPitch: '30 in',
    baggage: { cabin: '7 kg', checkIn: '15 kg' },
    amenities: { wifi: false, mealIncluded: false, usbPower: true, entertainment: false },
    historicalOtp: 91.0,
    carbonKg: 126,
    delayRisk: {
      score: 25,
      level: 'Low',
      factors: { routeCongestion: 22, weatherFactor: 24, turnaroundRisk: 20, peakHourIndex: 22 },
      primaryReason: 'Mid-morning tourist route departure.',
      explanation: 'Stable coastal wind vectors at Dabolim runway 26.'
    }
  },
  {
    id: 'AS-DEL-GOI-AI883',
    flightNumber: 'AI-883',
    airline: 'Air India',
    airlineCode: 'AI',
    origin: 'DEL',
    originTerminal: 'T3',
    destination: 'GOI',
    destinationTerminal: 'Integrated Terminal',
    departureTime: '15:10',
    arrivalTime: '17:55',
    duration: '2h 45m',
    durationMinutes: 165,
    stops: 0,
    stopDetails: null,
    aircraft: 'Airbus A320neo',
    aircraftCategory: 'Narrowbody',
    baseFare: 6400,
    taxes: 880,
    totalFare: 7280,
    seatsAvailable: 8,
    cabinClass: 'Economy',
    seatPitch: '32 in',
    baggage: { cabin: '7 kg', checkIn: '20 kg' },
    amenities: { wifi: false, mealIncluded: true, usbPower: true, entertainment: false },
    historicalOtp: 85.0,
    carbonKg: 130,
    delayRisk: {
      score: 38,
      level: 'Moderate',
      factors: { routeCongestion: 36, weatherFactor: 28, turnaroundRisk: 42, peakHourIndex: 35 },
      primaryReason: 'Dabolim military enclave runway window restrictions.',
      explanation: 'Naval training window at Dabolim (INS Hansa) may introduce brief holding pattern.'
    }
  }
];

// Dynamic generator to guarantee that ANY origin-destination pair in India produces rich, realistic flight data
export function generateFlightsForRoute(origin, destination, travelDate = '2026-10-25') {
  // If matching flights already in seed, return them first, plus supplemental
  const exactMatches = SEED_FLIGHTS.filter(
    (f) => f.origin === origin && f.destination === destination
  ).map(f => ({ ...f, travelDate }));

  if (exactMatches.length >= 4) {
    return exactMatches;
  }

  // Calculate approximate flight duration based on airports
  const durationMap = {
    'DEL-BOM': 135, 'BOM-DEL': 135,
    'DEL-BLR': 165, 'BLR-DEL': 165,
    'BOM-BLR': 100, 'BLR-BOM': 100,
    'DEL-GOI': 155, 'GOI-DEL': 155,
    'DEL-HYD': 130, 'HYD-DEL': 130,
    'BOM-CCU': 160, 'CCU-BOM': 160,
    'DEL-CCU': 135, 'CCU-DEL': 135,
    'DEL-MAA': 175, 'MAA-DEL': 175,
    'BLR-HYD': 70,  'HYD-BLR': 70,
    'BOM-GOI': 75,  'GOI-BOM': 75,
    'DEL-SXR': 95,  'SXR-DEL': 95,
    'DEL-IXC': 55,  'IXC-DEL': 55,
    'DEL-GAU': 150, 'GAU-DEL': 150,
    'BOM-PNQ': 50,  'PNQ-BOM': 50,
  };

  const key = `${origin}-${destination}`;
  const baseDuration = durationMap[key] || 130;

  // Generate 5-6 realistic schedule departures across different airlines
  const scheduleSlots = [
    { dep: '06:15', carrier: '6E', codeNum: '2104', ac: 'Airbus A321neo', cat: 'Narrowbody', fare: 4400, risk: 14, stops: 0 },
    { dep: '08:45', carrier: 'AI', codeNum: '622',  ac: 'Boeing 787-8 Dreamliner', cat: 'Widebody', fare: 5650, risk: 29, stops: 0 },
    { dep: '11:30', carrier: 'UK', codeNum: '915',  ac: 'Airbus A320neo', cat: 'Narrowbody', fare: 6200, risk: 36, stops: 0 },
    { dep: '14:20', carrier: 'QP', codeNum: '1410', ac: 'Boeing 737 MAX 8', cat: 'Narrowbody', fare: 3950, risk: 19, stops: 0 },
    { dep: '18:10', carrier: 'SG', codeNum: '8412', ac: 'Boeing 737-800', cat: 'Narrowbody', fare: 3750, risk: 65, stops: 0 },
    { dep: '20:45', carrier: '6E', codeNum: '5190', ac: 'Airbus A320neo', cat: 'Narrowbody', fare: 4800, risk: 48, stops: 0 },
    { dep: '12:00', carrier: 'IX', codeNum: '334',  ac: 'Boeing 737 MAX 8', cat: 'Narrowbody', fare: 3500, risk: 42, stops: 1, via: 'HYD' }
  ];

  const generated = scheduleSlots.map((slot, index) => {
    const depH = parseInt(slot.dep.split(':')[0], 10);
    const depM = parseInt(slot.dep.split(':')[1], 10);
    const totalMinutes = depH * 60 + depM + (slot.stops === 1 ? baseDuration + 75 : baseDuration);
    const arrH = Math.floor(totalMinutes / 60) % 24;
    const arrM = totalMinutes % 60;
    const arrTime = `${String(arrH).padStart(2, '0')}:${String(arrM).padStart(2, '0')}`;
    const durH = Math.floor((slot.stops === 1 ? baseDuration + 75 : baseDuration) / 60);
    const durM = (slot.stops === 1 ? baseDuration + 75 : baseDuration) % 60;
    const durStr = `${durH}h ${durM}m`;

    const airlineMeta = AIRLINE_DETAILS[slot.carrier] || AIRLINE_DETAILS['6E'];
    const taxes = Math.round(slot.fare * 0.14);
    const totalFare = slot.fare + taxes;

    const riskLevel = slot.risk <= 25 ? 'Low' : slot.risk <= 55 ? 'Moderate' : 'High';
    const primaryReason =
      slot.risk <= 25
        ? 'Morning off-peak vector clearance with high slot compliance.'
        : slot.risk <= 55
        ? 'Moderate airspace density during transitional traffic sector.'
        : 'High evening congestion factor and cascading rotational aircraft turnaround.';

    return {
      id: `AS-${origin}-${destination}-${slot.carrier}${slot.codeNum}`,
      flightNumber: `${slot.carrier}-${slot.codeNum}`,
      travelDate,
      airline: airlineMeta.name,
      airlineCode: slot.carrier,
      origin,
      originTerminal: origin === 'DEL' ? (index % 2 === 0 ? 'T2' : 'T3') : 'T1',
      destination,
      destinationTerminal: destination === 'BOM' ? 'T2' : 'T1',
      departureTime: slot.dep,
      arrivalTime: arrTime,
      duration: durStr,
      durationMinutes: slot.stops === 1 ? baseDuration + 75 : baseDuration,
      stops: slot.stops,
      stopDetails: slot.stops === 1 ? { airport: slot.via, duration: '1h 15m layover' } : null,
      aircraft: slot.ac,
      aircraftCategory: slot.cat,
      baseFare: slot.fare,
      taxes,
      totalFare,
      seatsAvailable: 3 + (index * 2),
      cabinClass: 'Economy',
      seatPitch: slot.cat === 'Widebody' ? '33 in' : '31 in',
      baggage: { cabin: '7 kg', checkIn: slot.carrier === 'AI' ? '25 kg' : '15 kg' },
      amenities: {
        wifi: slot.carrier === 'UK' || slot.carrier === 'AI',
        mealIncluded: slot.carrier === 'UK' || slot.carrier === 'AI',
        usbPower: slot.carrier !== 'SG',
        entertainment: slot.cat === 'Widebody'
      },
      historicalOtp: airlineMeta.avgOtp,
      carbonKg: Math.round(baseDuration * 0.85),
      delayRisk: {
        score: slot.risk,
        level: riskLevel,
        factors: {
          routeCongestion: Math.min(95, Math.round(slot.risk * 1.1)),
          weatherFactor: 12 + (index * 3),
          turnaroundRisk: Math.min(90, Math.round(slot.risk * 0.95)),
          peakHourIndex: depH >= 8 && depH <= 11 ? 75 : depH >= 17 && depH <= 21 ? 82 : 20
        },
        primaryReason,
        explanation: `Historical simulated telemetry for ${origin} to ${destination} indicates ${riskLevel.toLowerCase()} variance for ${slot.dep} departure slot.`
      }
    };
  });

  return [...exactMatches, ...generated.filter(g => !exactMatches.some(e => e.flightNumber === g.flightNumber))];
}
