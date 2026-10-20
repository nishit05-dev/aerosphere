package com.aerosphere.backend.controller

import com.aerosphere.backend.model.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/analytics")
class AnalyticsController {

    @GetMapping("/summary")
    fun getSummary(): ResponseEntity<AnalyticsSummaryResponse> {
        val congestion = listOf(
            HourlyCongestionPoint("06:00", 32, 35, 8),
            HourlyCongestionPoint("08:00", 68, 88, 24),
            HourlyCongestionPoint("10:00", 58, 72, 20),
            HourlyCongestionPoint("14:00", 42, 48, 12),
            HourlyCongestionPoint("18:00", 78, 96, 32),
            HourlyCongestionPoint("20:00", 74, 86, 28)
        )

        val forecast = listOf(
            FareForecastPoint("Wed Oct 21", 5200, 3900, 5800, 68),
            FareForecastPoint("Thu Oct 22", 4900, 3700, 5400, 62),
            FareForecastPoint("Fri Oct 23", 6800, 4800, 7400, 92),
            FareForecastPoint("Sat Oct 24", 5900, 4300, 6600, 81),
            FareForecastPoint("Sun Oct 25", 7200, 5100, 7900, 96)
        )

        val airlines = listOf(
            AirlinePerformance("IndiGo", 92.4, 0.42, 365, 4.4),
            AirlinePerformance("Akasa Air", 91.2, 0.58, 25, 4.5),
            AirlinePerformance("Vistara", 89.6, 0.76, 70, 4.7),
            AirlinePerformance("Air India", 85.8, 1.38, 145, 4.1),
            AirlinePerformance("SpiceJet", 78.5, 3.15, 55, 3.5)
        )

        return ResponseEntity.ok(AnalyticsSummaryResponse(congestion, forecast, airlines))
    }
}
