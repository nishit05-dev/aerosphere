import { AuthProvider } from './context/AuthContext';
import { FlightProvider } from './context/FlightContext';
import { useFlight } from './context/useFlight';
import { Navbar } from './components/Navbar';
import { FlightSearch } from './components/FlightSearch';
import { FlightList } from './components/FlightList';
import { DelayIntelligenceView } from './components/DelayIntelligenceView';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SavedTripsView } from './components/SavedTripsView';
import { BackendGuideModal } from './components/BackendGuideModal';
import { FlightComparisonModal } from './components/FlightComparisonModal';
import { FlightDetailModal } from './components/FlightDetailModal';
import { BoardingPassModal } from './components/BoardingPassModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { AlertTriangle } from 'lucide-react';
import './App.css';

function MainAppContent() {
  const { activeView } = useFlight();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Academic Disclaimer Ribbon */}
      <div className="academic-notice-banner">
        <AlertTriangle size={14} color="#B98245" />
        <span>
          <strong>AeroSphere Academic Demonstration:</strong> All flight schedules, delay probabilities, and bookings are simulated for college research.
        </span>
      </div>

      {/* Main Global Navigation */}
      <Navbar />

      {/* Primary Dynamic Content Area */}
      <main style={{ flex: 1, padding: '28px 0' }}>
        <div className="app-container">
          {activeView === 'search' && (
            <>
              <FlightSearch />
              <FlightList />
            </>
          )}

          {activeView === 'delayIntel' && <DelayIntelligenceView />}

          {activeView === 'analytics' && <AnalyticsDashboard />}

          {activeView === 'savedTrips' && <SavedTripsView />}

          {activeView === 'backendGuide' && <BackendGuideModal />}
        </div>
      </main>

      {/* Modals & Overlays */}
      <FlightComparisonModal />
      <FlightDetailModal />
      <BoardingPassModal />
      <AuthModal />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <FlightProvider>
        <MainAppContent />
      </FlightProvider>
    </AuthProvider>
  );
}

export default App;
