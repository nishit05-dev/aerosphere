# AeroSphere — Kotlin + Spring Boot REST API Service

This backend service powers the **AeroSphere — Intelligent Passenger Travel Platform**, providing server-side flight schedule searches, explainable heuristic delay risk modeling, route congestion telemetry, and Firebase-secured passenger itinerary endpoints.

---

## 🚀 Key Technologies
- **Language**: Kotlin 1.9 (JVM 17+)
- **Framework**: Spring Boot 3.3.x (`spring-boot-starter-web`, `spring-boot-starter-security`, `spring-boot-starter-validation`)
- **Build System**: Gradle Kotlin DSL (`build.gradle.kts`)
- **Authentication**: Firebase Admin SDK (`com.google.firebase:firebase-admin:9.3.0`)
- **Architecture**: Stateless REST API with JWT Bearer Token Security Filter

---

## 🔒 Security Architecture & Firebase Admin SDK

### Zero Credential Exposure Rule
- **Frontend**: Contains only public Firebase Client credentials (API Key, Project ID) to initiate client login and generate short-lived JWT tokens (`idToken`).
- **Backend**: Verifies incoming `Authorization: Bearer <idToken>` requests using `FirebaseAuth.getInstance().verifyIdToken()`.
- **Service Account**: Stored exclusively on the backend server, referenced via the `FIREBASE_CREDENTIALS_PATH` environment variable. Never exposed to web browsers or committed to Git.

### Connecting Live Firebase Service Account
1. Download your service account key from [Firebase Console](https://console.firebase.google.com/) -> Project Settings -> Service Accounts -> **Generate new private key**.
2. Save the file securely on your server or local path (e.g., `config/serviceAccountKey.json`).
3. Set the environment variable before starting the Spring Boot server:
   ```bash
   # On Windows PowerShell:
   $env:FIREBASE_CREDENTIALS_PATH="C:\path\to\serviceAccountKey.json"

   # On Linux/macOS:
   export FIREBASE_CREDENTIALS_PATH="/path/to/serviceAccountKey.json"
   ```
4. If no service account JSON is supplied, the backend seamlessly runs in **Secure Academic Mock Verification Mode**, allowing evaluation of protected endpoints without live Google Cloud billing.

---

## 🛠️ How to Build and Run

### Prerequisites
- JDK 17 (Auto-provisioned to `~/.gradle/jdks/eclipse_adoptium-17-amd64-windows.2` via Foojay Toolchains)
- Gradle Wrapper (included: `gradlew.bat` / `gradlew`)

### Running Locally (PowerShell)
```powershell
cd C:\Users\LOQ\aerosphere\backend
$env:JAVA_HOME = "C:\Users\LOQ\.gradle\jdks\eclipse_adoptium-17-amd64-windows.2"
.\gradlew.bat bootRun
```
*Alternatively, you can run the pre-compiled Spring Boot executable JAR directly:*
```powershell
& "C:\Users\LOQ\.gradle\jdks\eclipse_adoptium-17-amd64-windows.2\bin\java.exe" -jar build\libs\aerosphere-backend-1.0.0-SNAPSHOT.jar
```
The server will start on port `8080` with CORS enabled for `http://localhost:5173`.

---

## 📡 REST API Endpoints Specification

| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Service health probe & timestamp |
| `GET` | `/api/flights/search` | Public | Query Indian domestic schedules by `origin`, `destination`, `date`, `cabin` |
| `GET` | `/api/flights/{id}` | Public | Detailed aircraft, gate, baggage, and OTP specs |
| `POST` | `/api/delay/predict` | Public | Explainable delay prediction heuristic engine |
| `GET` | `/api/analytics/summary` | Public | Hourly airspace congestion, fare progression, airline OTP |
| `GET` | `/api/trips` | **Secured** (Bearer JWT) | Retrieve saved itineraries for authenticated user |
| `POST` | `/api/trips` | **Secured** (Bearer JWT) | Create new booked passenger itinerary |
| `DELETE` | `/api/trips/{tripId}` | **Secured** (Bearer JWT) | Remove saved trip from user profile |

---

## 🧪 Testing with cURL

### Search Flights
```bash
curl -X GET "http://localhost:8080/api/flights/search?origin=DEL&destination=BOM"
```

### Delay Risk Prediction
```bash
curl -X POST "http://localhost:8080/api/delay/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "DEL",
    "destination": "BOM",
    "departureTime": "19:00",
    "stops": 0,
    "airline": "SpiceJet",
    "aircraft": "Boeing 737-800"
  }'
```

### Save Itinerary (Secured)
```bash
curl -X POST "http://localhost:8080/api/trips" \
  -H "Authorization: Bearer demo-rahul-sharma" \
  -H "Content-Type: application/json" \
  -d '{
    "flightId": "AS-DEL-BOM-6E2041",
    "travelDate": "2026-10-25",
    "passengers": 1,
    "cabinClass": "Economy"
  }'
```

---

## 🎓 Academic Notice
This backend service is developed for academic evaluation and capstone demonstration. Data models and heuristic risk calculations represent predictive simulations and do not reflect real-time civil aviation clearances.
