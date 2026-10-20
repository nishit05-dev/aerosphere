/**
 * AeroSphere Heuristic Explainable Delay Risk Engine
 * Academic simulation module providing interpretable delay likelihood estimates.
 * 
 * NOTE: For demonstration purposes only. Not certified for flight operations.
 */

export const DISCLAIMER_TEXT =
  'Demo delay risk estimates are heuristic predictive indicators calculated for academic demonstration and simulation purposes only. They do not represent certified airline operations or real-time DGCA/ATC flight dispatch predictions.';

export function calculateExplainableDelayRisk({
  origin = 'DEL',
  destination = 'BOM',
  departureTime = '08:00',
  stops = 0,
  airline = 'IndiGo',
  aircraft = 'Airbus A320neo'
}) {
  const [hoursStr] = (departureTime || '08:00').split(':');
  const hour = parseInt(hoursStr, 10);
  const isWidebody = aircraft.includes('787') || aircraft.includes('Widebody');

  // 1. Departure Time Slot Congestion Factor (Weight: 35%)
  let timeFactor = 15;
  let timeReason = 'Off-peak operating window with low apron and runway queuing.';
  if ((hour >= 7 && hour <= 10) || (hour >= 18 && hour <= 21)) {
    timeFactor = 88;
    timeReason = `Peak slot rush (${departureTime} IST): heavy outbound traffic sequences at departure runway.`;
  } else if ((hour >= 11 && hour <= 14) || (hour >= 21 && hour <= 23)) {
    timeFactor = 45;
    timeReason = `Moderate transitional slot (${departureTime} IST): intermediate clearance queues.`;
  } else if (hour >= 5 && hour < 7) {
    timeFactor = 18;
    timeReason = 'First bank morning pushback: pristine runway availability with near-zero holding stack.';
  }

  // 2. Route & Hub Density Factor (Weight: 25%)
  const majorHubs = ['DEL', 'BOM', 'BLR'];
  let routeFactor = 25;
  let routeReason = 'Standard domestic corridor with regular ATC capacity.';
  if (majorHubs.includes(origin) && majorHubs.includes(destination)) {
    routeFactor = 75;
    routeReason = `Dense Metro-to-Metro corridor (${origin} ⇄ ${destination}): tight en-route airways and restricted arrival acceptance rates.`;
  } else if (majorHubs.includes(origin) || majorHubs.includes(destination)) {
    routeFactor = 45;
    routeReason = `Single-hub corridor: potential tarmac taxi delays at ${majorHubs.includes(origin) ? origin : destination}.`;
  }

  // 3. Aircraft Turnaround & Stopover Risk (Weight: 25%)
  let turnaroundFactor = 20;
  let turnaroundReason = 'Point-to-point direct rotation with minimal rotational delay propagation.';
  if (stops > 0) {
    turnaroundFactor = 65;
    turnaroundReason = 'Multi-sector flight: downstream connection buffer depends on preceding leg inbound punctuality.';
  } else if (hour >= 17) {
    turnaroundFactor = 55;
    turnaroundReason = 'Late-day rotation: aircraft has flown 3-4 prior sectors, increasing cumulative delay risk.';
  }

  if (isWidebody) {
    turnaroundFactor += 6;
  }

  // 4. Airline Fleet Operational Resilience (Weight: 15%)
  const airlineResilience = {
    'IndiGo': { score: 18, reason: 'High fleet interchangeability and quick 30-minute apron turnaround.' },
    'Akasa Air': { score: 20, reason: 'Young Boeing 737 MAX fleet with strong dispatch reliability.' },
    'Vistara': { score: 24, reason: 'Full-service handling with standardized boarding intervals.' },
    'Air India': { score: 38, reason: 'Mixed fleet operations and extensive widebody/narrowbody cross-scheduling.' },
    'Air India Express': { score: 32, reason: 'Medium fleet density across secondary tier-2 hubs.' },
    'SpiceJet': { score: 62, reason: 'Higher historical rotational volatility in evening departures.' }
  };
  const airlineData = airlineResilience[airline] || { score: 30, reason: 'Average historical fleet on-time resilience.' };

  // Calculate Weighted Risk Score (0 - 100)
  const weightedScore = Math.round(
    timeFactor * 0.35 +
    routeFactor * 0.25 +
    turnaroundFactor * 0.25 +
    airlineData.score * 0.15
  );

  const score = Math.max(8, Math.min(95, weightedScore));

  let level = 'Low';
  let badgeColor = '#10B981'; // emerald
  let levelDescription = 'Minimal probability of departure or arrival delay (>85% likelihood of on-time arrival).';
  if (score >= 56) {
    level = 'High';
    badgeColor = '#EF4444'; // red
    levelDescription = 'Elevated probability of 25-45 minute holding pattern or departure gate pushback hold.';
  } else if (score >= 26) {
    level = 'Moderate';
    badgeColor = '#F59E0B'; // amber
    levelDescription = 'Moderate risk of 10-20 minute sequencing adjustment or arrival holding stack.';
  }

  // Find primary driver
  const factors = [
    { name: 'Airspace & Departure Hour Peak', weight: '35%', val: timeFactor, description: timeReason },
    { name: 'Route & Runway Congestion', weight: '25%', val: routeFactor, description: routeReason },
    { name: 'Aircraft Turnaround & Propagation', weight: '25%', val: turnaroundFactor, description: turnaroundReason },
    { name: 'Carrier Dispatch Resilience', weight: '15%', val: airlineData.score, description: airlineData.reason }
  ];

  factors.sort((a, b) => b.val - a.val);
  const primaryDriver = factors[0].name;

  let advice = 'Flight schedule is well-optimized for punctuality.';
  if (level === 'High') {
    advice = 'Consider booking flights before 08:00 IST or choosing a non-stop morning rotation to bypass cumulative delay cascading.';
  } else if (level === 'Moderate') {
    advice = 'Buffer at least 45 minutes if coordinating onward ground connections or check-in baggage retrieval.';
  }

  return {
    score,
    level,
    badgeColor,
    levelDescription,
    primaryDriver,
    recommendedAction: advice,
    confidenceMetric: '91.4% (Simulated Historical Baseline)',
    breakdown: factors,
    disclaimer: DISCLAIMER_TEXT
  };
}
