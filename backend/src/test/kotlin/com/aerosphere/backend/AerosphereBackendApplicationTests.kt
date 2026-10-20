package com.aerosphere.backend

import com.aerosphere.backend.model.CreateTripRequest
import com.aerosphere.backend.model.DelayPredictionRequest
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post
import org.springframework.test.web.servlet.delete

@SpringBootTest
@AutoConfigureMockMvc
class AerosphereBackendApplicationTests {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @Test
    fun contextLoads() {
    }

    @Test
    fun `health endpoint returns UP status and demo mode indicator`() {
        mockMvc.get("/api/health")
            .andExpect {
                status { isOk() }
                jsonPath("$.status") { value("UP") }
                jsonPath("$.service") { value("AeroSphere Intelligent Passenger Travel Backend") }
            }
    }

    @Test
    fun `flight search returns domestic schedule for DEL to BOM`() {
        mockMvc.get("/api/flights/search") {
            param("origin", "DEL")
            param("destination", "BOM")
            param("date", "2026-10-25")
            param("cabin", "Economy")
        }.andExpect {
            status { isOk() }
            jsonPath("$") { isArray() }
            jsonPath("$.length()") { value(org.hamcrest.Matchers.greaterThanOrEqualTo(5)) }
            jsonPath("$[0].origin") { value("DEL") }
            jsonPath("$[0].destination") { value("BOM") }
            jsonPath("$[0].delayRisk.score") { isNumber() }
        }
    }

    @Test
    fun `flight search for non-seed route dynamically generates realistic domestic options`() {
        mockMvc.get("/api/flights/search") {
            param("origin", "CCU")
            param("destination", "MAA")
            param("date", "2026-10-28")
        }.andExpect {
            status { isOk() }
            jsonPath("$") { isArray() }
            jsonPath("$.length()") { value(5) }
            jsonPath("$[0].origin") { value("CCU") }
            jsonPath("$[0].destination") { value("MAA") }
            jsonPath("$[0].airline") { isNotEmpty() }
        }
    }

    @Test
    fun `delay prediction API returns heuristic breakdown and academic disclaimer`() {
        val request = DelayPredictionRequest(
            origin = "DEL",
            destination = "BOM",
            departureTime = "08:30",
            stops = 0,
            airline = "IndiGo",
            aircraft = "Airbus A321neo"
        )

        mockMvc.post("/api/delay/predict") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(request)
        }.andExpect {
            status { isOk() }
            jsonPath("$.score") { isNumber() }
            jsonPath("$.level") { isNotEmpty() }
            jsonPath("$.primaryDriver") { isNotEmpty() }
            jsonPath("$.disclaimer") { isNotEmpty() }
            jsonPath("$.breakdown") { isArray() }
        }
    }

    @Test
    fun `analytics summary returns congestion and performance metrics`() {
        mockMvc.get("/api/analytics/summary")
            .andExpect {
                status { isOk() }
                jsonPath("$.hourlyCongestion") { isArray() }
                jsonPath("$.sevenDayForecast") { isArray() }
                jsonPath("$.airlinePerformance") { isArray() }
            }
    }

    @Test
    fun `unauthenticated access to trips endpoint is denied`() {
        mockMvc.get("/api/trips")
            .andExpect {
                status { isForbidden() }
            }
    }

    @Test
    fun `invalid token format in academic mode is rejected`() {
        mockMvc.get("/api/trips") {
            header("Authorization", "Bearer invalid-garbage-token-xyz")
        }.andExpect {
            status { isForbidden() }
        }
    }

    @Test
    fun `valid demo token allows creating, fetching, and deleting isolated user trips`() {
        val token = "Bearer demo-token-traveler-riya"

        // 1. Initially empty or existing trips for this demo user
        mockMvc.get("/api/trips") {
            header("Authorization", token)
        }.andExpect {
            status { isOk() }
            jsonPath("$") { isArray() }
        }

        // 2. Create a trip for seed flight AS-DEL-BOM-6E2041
        val tripRequest = CreateTripRequest(
            flightId = "AS-DEL-BOM-6E2041",
            travelDate = "2026-10-25",
            passengers = 1,
            cabinClass = "Economy",
            seat = "14A"
        )

        val createResult = mockMvc.post("/api/trips") {
            header("Authorization", token)
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(tripRequest)
        }.andExpect {
            status { isCreated() }
            jsonPath("$.tripId") { isNotEmpty() }
            jsonPath("$.pnr") { isNotEmpty() }
            jsonPath("$.flight.flightNumber") { value("6E-2041") }
            jsonPath("$.userName") { value("Riya Sharma (Traveler Persona)") }
        }.andReturn()

        val responseJson = objectMapper.readTree(createResult.response.contentAsString)
        val tripId = responseJson.get("tripId").asText()

        // 3. User can fetch the created trip
        mockMvc.get("/api/trips") {
            header("Authorization", token)
        }.andExpect {
            status { isOk() }
            jsonPath("$[?(@.tripId == '$tripId')]") { isNotEmpty() }
        }

        // 4. Another user cannot see this trip (user isolation)
        val otherUserToken = "Bearer demo-token-business-arjun"
        mockMvc.get("/api/trips") {
            header("Authorization", otherUserToken)
        }.andExpect {
            status { isOk() }
            jsonPath("$[?(@.tripId == '$tripId')]") { isEmpty() }
        }

        // 5. Delete the trip
        mockMvc.delete("/api/trips/$tripId") {
            header("Authorization", token)
        }.andExpect {
            status { isNoContent() }
        }
    }
}
