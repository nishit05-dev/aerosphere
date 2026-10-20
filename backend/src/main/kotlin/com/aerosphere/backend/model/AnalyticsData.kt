package com.aerosphere.backend.model

data class HourlyCongestionPoint(
    val time: String,
    val departures: Int,
    val congestionIndex: Int,
    val avgDelayMins: Int
)

data class FareForecastPoint(
    val day: String,
    val delBom: Int,
    val bomBlr: Int,
    val blrDel: Int,
    val demandScore: Int
)

data class AirlinePerformance(
    val airline: String,
    val otp: Double,
    val cancellationRate: Double,
    val fleetSize: Int,
    val satisfaction: Double
)

data class AnalyticsSummaryResponse(
    val hourlyCongestion: List<HourlyCongestionPoint>,
    val sevenDayForecast: List<FareForecastPoint>,
    val airlinePerformance: List<AirlinePerformance>
)
