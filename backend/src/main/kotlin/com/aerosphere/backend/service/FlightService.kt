package com.aerosphere.backend.service

import com.aerosphere.backend.data.DemoFlightCatalog
import com.aerosphere.backend.model.*
import org.springframework.stereotype.Service
import java.util.concurrent.ConcurrentHashMap

@Service
class FlightService(private val delayRiskService: DelayRiskService) {

    // Cache to store dynamically searched flights so getFlightById can always retrieve them
    private val flightCache = ConcurrentHashMap<String, Flight>()

    init {
        DemoFlightCatalog.SEED_FLIGHTS.forEach { flight ->
            flightCache[flight.id] = flight
        }
    }

    fun searchFlights(origin: String, destination: String, date: String, cabin: String): List<Flight> {
        val seedMatches = DemoFlightCatalog.SEED_FLIGHTS.filter { 
            it.origin.equals(origin, ignoreCase = true) && it.destination.equals(destination, ignoreCase = true) 
        }

        if (seedMatches.isNotEmpty()) {
            return seedMatches
        }

        // Dynamically generate realistic domestic schedule for any queried Indian pair
        val carriers = listOf(
            Triple("6E", "IndiGo", "Airbus A321neo"),
            Triple("AI", "Air India", "Boeing 787-8 Dreamliner"),
            Triple("UK", "Vistara", "Airbus A320neo"),
            Triple("QP", "Akasa Air", "Boeing 737 MAX 8"),
            Triple("SG", "SpiceJet", "Boeing 737-800")
        )

        val generated = carriers.mapIndexed { idx, (code, name, ac) ->
            val depHour = 6 + (idx * 3)
            val depTime = String.format("%02d:15", depHour)
            val arrHour = (depHour + 2) % 24
            val arrTime = String.format("%02d:35", arrHour)
            val base = 4200 + (idx * 650)
            val tax = (base * 0.14).toInt()

            val risk = delayRiskService.calculateRisk(
                DelayPredictionRequest(
                    origin = origin.uppercase(),
                    destination = destination.uppercase(),
                    departureTime = depTime,
                    stops = 0,
                    airline = name,
                    aircraft = ac
                )
            )

            val flightId = "AS-${origin.uppercase()}-${destination.uppercase()}-$code$idx"
            Flight(
                id = flightId,
                flightNumber = "$code-${1000 + idx * 24}",
                airline = name,
                airlineCode = code,
                origin = origin.uppercase(),
                originTerminal = if (idx % 2 == 0) "T1" else "T2",
                destination = destination.uppercase(),
                destinationTerminal = "T2",
                departureTime = depTime,
                arrivalTime = arrTime,
                duration = "2h 20m",
                durationMinutes = 140,
                stops = 0,
                aircraft = ac,
                aircraftCategory = if (ac.contains("787")) "Widebody" else "Narrowbody",
                baseFare = base,
                taxes = tax,
                totalFare = base + tax,
                seatsAvailable = 4 + idx,
                cabinClass = cabin.ifBlank { "Economy" },
                seatPitch = if (ac.contains("787")) "33 in" else "31 in",
                baggage = Baggage(cabin = "7 kg", checkIn = if (name == "Air India") "25 kg" else "15 kg"),
                amenities = Amenities(
                    wifi = name == "Air India" || name == "Vistara",
                    mealIncluded = name == "Air India" || name == "Vistara",
                    usbPower = true,
                    entertainment = name == "Air India" || name == "Vistara"
                ),
                historicalOtp = 90.0 - (idx * 2.0),
                carbonKg = 115,
                delayRisk = DelayRisk(
                    score = risk.score,
                    level = risk.level,
                    factors = DelayFactors(risk.score, 12, maxOf(10, risk.score - 5), minOf(95, risk.score + 5)),
                    primaryReason = risk.primaryDriver,
                    explanation = risk.recommendedAction
                )
            ).also { flight ->
                flightCache[flight.id] = flight
            }
        }

        return generated
    }

    fun getFlightById(id: String): Flight? {
        return flightCache[id] ?: DemoFlightCatalog.SEED_FLIGHTS.find { it.id == id }
    }
}
