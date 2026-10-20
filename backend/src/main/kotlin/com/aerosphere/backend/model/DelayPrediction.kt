package com.aerosphere.backend.model

data class DelayPredictionRequest(
    val origin: String = "DEL",
    val destination: String = "BOM",
    val departureTime: String = "08:00",
    val stops: Int = 0,
    val airline: String = "IndiGo",
    val aircraft: String = "Airbus A320neo"
)

data class FactorBreakdown(
    val name: String,
    val weight: String,
    val valScore: Int,
    val description: String
)

data class DelayPredictionResponse(
    val score: Int,
    val level: String, // "Low", "Moderate", "High"
    val badgeColor: String,
    val levelDescription: String,
    val primaryDriver: String,
    val recommendedAction: String,
    val confidenceMetric: String,
    val breakdown: List<FactorBreakdown>,
    val disclaimer: String
)
