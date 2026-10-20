import { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { BarChart3, Clock, AlertTriangle, ShieldCheck, Fuel, ArrowUpRight } from 'lucide-react';
import { apiService } from '../services/apiService';
import {
  HOURLY_CONGESTION_DATA,
  SEVEN_DAY_FARE_FORECAST,
  AIRLINE_PERFORMANCE_METRICS,
  FLEET_EFFICIENCY_METRICS
} from '../data/analyticsData';

export function AnalyticsDashboard() {
  const [data, setData] = useState({
    hourlyCongestion: HOURLY_CONGESTION_DATA,
    sevenDayForecast: SEVEN_DAY_FARE_FORECAST,
    airlinePerformance: AIRLINE_PERFORMANCE_METRICS,
    fleetEfficiency: FLEET_EFFICIENCY_METRICS,
    source: 'AeroSphere Heuristic Simulation Engine'
  });

  useEffect(() => {
    let active = true;
    apiService.getAnalyticsData().then((res) => {
      if (active && res) {
        setData(res);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const customTooltipStyle = {
    backgroundColor: '#FFFFFF',
    borderColor: '#D5CEBF',
    borderRadius: '8px',
    color: '#0F172A',
    fontSize: '12px',
    boxShadow: '0 4px 12px rgba(23, 45, 70, 0.1)',
    border: '1px solid #D5CEBF'
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Dashboard Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#FAF9F5',
          border: '1px solid #D5CEBF',
          padding: '5px 14px',
          borderRadius: '16px',
          color: '#172D46',
          fontSize: '12px',
          fontWeight: 700,
          marginBottom: '10px'
        }}>
          <BarChart3 size={14} color="#172D46" />
          <span>Indian Aviation Network Intelligence</span>
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#172D46',
          marginBottom: '8px',
          letterSpacing: '-0.02em'
        }}>
          Flight Operations & Airfare Analytics
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
          Simulated analytical indicators tracking hourly airspace saturation, dynamic fare progression, carrier OTP benchmarks, and aircraft fleet emission efficiency.
        </p>
        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>
          Data Source: <strong style={{ color: '#39796B' }}>{data.source}</strong> (Indian Domestic Corridor Baseline)
        </div>
      </div>

      {/* KPI Top Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* KPI 1 */}
        <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              Avg Domestic Delay
            </span>
            <Clock size={16} color="#172D46" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A' }}>14.2 min</div>
          <div style={{ fontSize: '11px', color: '#39796B', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <ArrowUpRight size={13} />
            <span>-2.1m vs previous rotation slot</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              Prime Departure Window
            </span>
            <ShieldCheck size={16} color="#39796B" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#39796B' }}>05:30 – 07:15</div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
            94.6% on-time pushback rate
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              Peak Evening Saturation
            </span>
            <AlertTriangle size={16} color="#B98245" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#B98245' }}>18:45 – 20:30</div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
            Up to 32m holding pattern delay
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-panel" style={{ padding: '18px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              Efficiency Benchmark
            </span>
            <Fuel size={16} color="#172D46" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#172D46' }}>A321neo</div>
          <div style={{ fontSize: '11px', color: '#39796B', marginTop: '4px', fontWeight: 600 }}>
            62g CO₂e / passenger-km
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }} className="analytics-charts-grid-responsive">
        {/* Chart 1: Airspace Congestion by Departure Hour */}
        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '10px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#172D46' }}>
              Airspace Congestion & Delay by Departure Hour
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              Hourly departures index vs. average delay (minutes)
            </p>
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.hourlyCongestion}>
                <defs>
                  <linearGradient id="colorCongestion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#172D46" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#172D46" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="colorDelay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C0392B" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#C0392B" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EFEA" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="congestionIndex"
                  name="Congestion Index"
                  stroke="#172D46"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCongestion)"
                />
                <Area
                  type="monotone"
                  dataKey="avgDelayMins"
                  name="Avg Delay (Mins)"
                  stroke="#C0392B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorDelay)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: 7-Day Fare Trends */}
        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '10px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#172D46' }}>
              7-Day Metro Corridor Fare Trends (₹)
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              Dynamic airfare variations across key Indian domestic routes
            </p>
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.sevenDayForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EFEA" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={['dataMin - 500', 'dataMax + 500']} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="delBom"
                  name="DEL → BOM"
                  stroke="#172D46"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="blrDel"
                  name="BLR → DEL"
                  stroke="#B98245"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="bomBlr"
                  name="BOM → BLR"
                  stroke="#39796B"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Airline On-Time Performance */}
        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '10px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#172D46' }}>
              Carrier On-Time Performance (OTP %)
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              Comparative punctuality index across major Indian scheduled carriers
            </p>
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.airlinePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EFEA" />
                <XAxis dataKey="airline" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={[70, 100]} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar
                  dataKey="otp"
                  name="On-Time Rate (%)"
                  fill="#172D46"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Fleet Carbon Footprint */}
        <div className="glass-panel" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid #E2DDD5', borderRadius: '10px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#172D46' }}>
              Fleet Carbon Emission Benchmark
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              Emissions (g CO₂e per passenger-kilometer) by aircraft family
            </p>
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.fleetEfficiency} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EFEA" />
                <XAxis type="number" stroke="#64748B" fontSize={11} />
                <YAxis dataKey="model" type="category" stroke="#64748B" fontSize={11} width={85} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar
                  dataKey="co2GramsPerPaxKm"
                  name="CO₂ g/Pax-km (Lower is cleaner)"
                  fill="#39796B"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
