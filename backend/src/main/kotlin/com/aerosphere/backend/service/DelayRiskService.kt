package com.aerosphere.backend.service

import com.aerosphere.backend.model.DelayPredictionRequest
import com.aerosphere.backend.model.DelayPredictionResponse
import com.aerosphere.backend.model.FactorBreakdown
import org.springframework.stereotype.Service
import kotlin.math.max
import kotlin.math.min

@Service
class DelayRiskService {

    companion object {
        const val DISCLAIMER =
            "Demo delay risk estimates are heuristic predictive indicators calculated for academic demonstration and simulation purposes only. They do not represent certified airline operations or real-time DGCA/ATC flight dispatch predictions."
    }

    fun calculateRisk(request: DelayPredictionRequest): DelayPredictionResponse {
        val parts = request.departureTime.split(":")
        val hour = parts.getOrNull(0)?.toIntOrNull() ?: 8

        // 1. Time Slot Congestion (35%)
        val (timeFactor, timeReason) = when {
            (hour in 7..10) || (hour in 18..21) ->
                Pair(88, "Peak slot rush (${request.departureTime} IST): heavy outbound traffic sequences at departure runway.")
            (hour in 11..14) || (hour in 21..23) ->
                Pair(45, "Moderate transitional slot (${request.departureTime} IST): intermediate clearance queues.")
            hour in 5..6 ->
                Pair(18, "First bank morning pushback: pristine runway availability with near-zero holding stack.")
            else ->
                Pair(22, "Off-peak operating window with low apron and runway queuing.")
        }

        // 2. Hub Corridor Density (25%)
        val majorHubs = setOf("DEL", "BOM", "BLR")
        val (routeFactor, routeReason) = when {
            majorHubs.contains(request.origin) && majorHubs.contains(request.destination) ->
                Pair(75, "Dense Metro-to-Metro corridor (${request.origin} <-> ${request.destination}): tight en-route airways and restricted arrival acceptance rates.")
            majorHubs.contains(request.origin) || majorHubs.contains(request.destination) ->
                Pair(45, "Single-hub corridor: potential tarmac taxi delays at major metropolitan airport.")
            else ->
                Pair(25, "Standard domestic corridor with regular ATC capacity.")
        }

        // 3. Aircraft Turnaround & Stopover Risk (25%)
        val isWidebody = request.aircraft.contains("787") || request.aircraft.contains("Widebody")
        var turnaroundFactor = when {
            request.stops > 0 -> 65
            hour >= 17 -> 55
            else -> 20
        }
        if (isWidebody) turnaroundFactor += 6

        val turnaroundReason = when {
            request.stops > 0 -> "Multi-sector flight: downstream connection buffer depends on preceding leg inbound punctuality."
            hour >= 17 -> "Late-day rotation: aircraft has flown 3-4 prior sectors, increasing cumulative delay risk."
            else -> "Point-to-point direct rotation with minimal rotational delay propagation."
        }

        // 4. Carrier Dispatch Resilience (15%)
        val (airlineScore, airlineReason) = when (request.airline) {
            "IndiGo" -> Pair(18, "High fleet interchangeability and quick 30-minute apron turnaround.")
            "Akasa Air" -> Pair(20, "Young Boeing 737 MAX fleet with strong dispatch reliability.")
            "Vistara" -> Pair(24, "Full-service handling with standardized boarding intervals.")
            "Air India" -> Pair(38, "Mixed fleet operations and extensive widebody/narrowbody cross-scheduling.")
            "Air India Express" -> Pair(32, "Medium fleet density across secondary tier-2 hubs.")
            "SpiceJet" -> Pair(62, "Higher historical rotational volatility in evening departures.")
            else -> Pair(30, "Average historical fleet on-time resilience.")
        }

        val weighted = (timeFactor * 0.35 + routeFactor * 0.25 + turnaroundFactor * 0.25 + airlineScore * 0.15).toInt()
        val score = max(8, min(95, weighted))

        val level: String
        val badgeColor: String
        val levelDesc: String
        val advice: String

        if (score >= 56) {
            level = "High"
            badgeColor = "#EF4444"
            levelDesc = "Elevated probability of 25-45 minute holding pattern or departure gate pushback hold."
            advice = "Consider booking flights before 08:00 IST or choosing a non-stop morning rotation to bypass cumulative delay cascading."
        } else if (score >= 26) {
            level = "Moderate"
            badgeColor = "#F59E0B"
            levelDesc = "Moderate risk of 10-20 minute sequencing adjustment or arrival holding stack."
            advice = "Buffer at least 45 minutes if coordinating onward ground connections or check-in baggage retrieval."
        } else {
            level = "Low"
            badgeColor = "#10B981"
            levelDesc = "Minimal probability of departure or arrival delay (>85% likelihood of on-time arrival)."
            advice = "Flight schedule is well-optimized for punctuality."
        }

        val breakdown = listOf(
            FactorBreakdown("Airspace & Departure Hour Peak", "35%", timeFactor, timeReason),
            FactorBreakdown("Route & Runway Congestion", "25%", routeFactor, routeReason),
            FactorBreakdown("Aircraft Turnaround & Propagation", "25%", turnaroundFactor, turnaroundReason),
            FactorBreakdown("Carrier Dispatch Resilience", "15%", airlineScore, airlineReason)
        ).sortedByDescending { it.valScore }

        return DelayPredictionResponse(
            score = score,
            level = level,
            badgeColor = badgeColor,
            levelDescription = levelDesc,
            primaryDriver = breakdown.first().name,
            recommendedAction = advice,
            confidenceMetric = "91.4% (Simulated Historical Baseline)",
            breakdown = breakdown,
            disclaimer = DISCLAIMER
        )
    }
}
