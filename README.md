# AeroSphere — Intelligent Passenger Travel Platform

> **Premium, Futuristic Aviation Intelligence & Passenger Portal for College Engineering Project**

AeroSphere is a modern airline-technology web platform designed to streamline flight searches, flight comparisons, explainable delay-risk diagnostics, and passenger itinerary management across the Indian domestic aviation network.

---

## 🌟 Key Features

1. **Aviation Dashboard & Smart Search**:
   - Origin & Destination airport selectors across 15+ Indian commercial hubs (DEL, BOM, BLR, HYD, MAA, CCU, GOI, PNQ, etc.).
   - Date picker, passenger counters, cabin class selectors (Economy, Premium Economy, Business), and quick route swap.
   - Popular high-frequency corridor shortcuts (Delhi ⇄ Mumbai, Bengaluru ⇄ Delhi, etc.).

2. **Indian Domestic Flight Listings**:
   - Detailed schedules for major scheduled carriers: IndiGo, Air India, Vistara, Akasa Air, SpiceJet, Air India Express.
   - Realistic aircraft equipment (Airbus A320neo, A321neo, Boeing 737 MAX 8, Boeing 787-8 Dreamliner).
   - Non-stop and connecting routing with layover durations and terminal gate info.
   - Transparent Indian Rupee (₹) pricing with base fare and aviation taxes breakdowns.

3. **Multi-Flight Comparison Matrix**:
   - Side-by-side comparative telemetry for up to 3 flights simultaneously.
   - Benchmarking across fare, duration, seat pitch/legroom, baggage allowances, in-flight amenities (Wi-Fi, power, meals), delay risk, and carbon emissions.

4. **Explainable Delay-Risk Engine**:
   - Transparent heuristic predictive model calculating delay likelihood (Low, Moderate, Elevated).
   - Causal breakdown across 4 weighted factors:
     - Airspace & Departure Hour Peak (35%)
     - Route & Runway Hub Congestion (25%)
     - Aircraft Turnaround & Rotational Cascading Risk (25%)
     - Carrier Dispatch Agility & Historical OTP (15%)
   - Prominent academic limitation disclaimer banner.

5. **Operational Analytics (Recharts)**:
   - Route Congestion & Delays by Departure Hour (Area & Trend chart).
   - 7-Day Fare Volatility Progression across Metro Corridors (Line chart).
   - Airline On-Time Performance (OTP %) vs Industry Benchmarks (Bar chart).
   - Aircraft Fleet Fuel Efficiency & Carbon Footprint (Horizontal Bar chart).

6. **Firebase Authentication & Demo Personas**:
   - Email/Password login and registration using Firebase Auth.
   - Google Sign-In support.
   - 1-Click Academic Demo Personas (*Capt. Rahul Sharma - Diamond SkyClub*, *Dr. Priya Verma - Sapphire Business Pass*) for immediate evaluation without setup friction.
   - Safe client architecture: zero server service-account credential exposure on the frontend.

7. **Saved Itineraries & Digital Boarding Pass**:
   - Book and save flights with auto-generated PNRs and seat assignments.
   - Interactive, printable **AeroSphere SkyPass** with biometric barcode, QR code, and departure terminal gate information.

8. **Kotlin + Spring Boot REST API**:
   - Complete production-grade backend module under `backend/` built with Kotlin 1.9, Spring Boot 3.3.x, and Spring Security.
   - Firebase JWT Bearer Token validation filter protecting user itinerary endpoints.

---

## 🛠️ Project Structure

```
aerosphere/
├── backend/                       # Kotlin + Spring Boot REST API
│   ├── build.gradle.kts           # Gradle Kotlin DSL configuration
│   ├── settings.gradle.kts
│   ├── README-BACKEND.md          # Backend architecture & execution guide
│   ├── application-test.http      # API test requests for cURL / HTTP client
│   └── src/main/
│       ├── kotlin/com/aerosphere/backend/
│       │   ├── AeroSphereApplication.kt
│       │   ├── config/            # SecurityConfig, FirebaseConfig, CorsConfig
│       │   ├── controller/        # FlightController, DelayController, TripController, etc.
│       │   ├── model/             # Flight, Trip, DelayPrediction, Analytics
│       │   ├── security/          # FirebaseAuthenticationFilter, UserPrincipal
│       │   └── service/           # FlightService, DelayRiskService, TripService
│       └── resources/
│           └── application.yml
├── public/                        # Static assets (favicons, icons)
├── src/
│   ├── assets/                    # Platform graphics
│   ├── components/                # Modular React components
│   │   ├── Navbar.jsx             # Top branding, navigation & user avatar
│   │   ├── FlightSearch.jsx       # Aviation search box & airport selector
│   │   ├── FlightCard.jsx         # Boarding telemetry card with delay badge
│   │   ├── FlightList.jsx         # Filter sidebar, sort tabs & card stream
│   │   ├── FlightComparisonModal.jsx # 3-way side-by-side comparison matrix
│   │   ├── FlightDetailModal.jsx  # Detailed itinerary & alternative recommendations
│   │   ├── DelayIntelligenceView.jsx # Dedicated explainable delay simulator
│   │   ├── AnalyticsDashboard.jsx # Recharts operational intelligence charts
│   │   ├── SavedTripsView.jsx     # Itinerary dossier & countdown
│   │   ├── BoardingPassModal.jsx  # Authentic digital SkyPass with barcode
│   │   ├── AuthModal.jsx          # Firebase login & 1-click demo personas
│   │   ├── BackendGuideModal.jsx  # Interactive Spring Boot API architecture guide
│   │   ├── Toast.jsx              # System notifications
│   │   └── Footer.jsx             # Academic attribution & disclaimers
│   ├── context/                   # React Contexts (AuthContext, FlightContext)
│   ├── data/                      # Indian airports & domestic flight schedules
│   ├── services/                  # Delay model, Firebase client, API service
│   ├── styles/                    # Deep navy & electric blue theme system
│   ├── App.jsx                    # Root view controller
│   └── main.jsx
├── .env.example                   # Client environment variables template
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Frontend (React + Vite)
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build production bundle
npm run build
```

### 2. Backend (Kotlin + Spring Boot)
```bash
cd backend
gradle bootRun
```
*Note: The React frontend operates seamlessly even without starting the Spring Boot server by using its built-in intelligent simulated engine.*

---

## 🔒 Security Compliance
- Public Firebase client keys may be configured in `.env` via `VITE_FIREBASE_*`.
- Firebase Private Service Account JSON keys are strictly confined to the backend server and passed via the `FIREBASE_CREDENTIALS_PATH` environment variable.

---

## 🎓 Academic Notice & Disclaimers
AeroSphere was developed as a college capstone engineering project. All flight schedules, delay probabilities, and bookings are simulated model outputs and do not represent actual civil aviation clearances or airline schedules.
