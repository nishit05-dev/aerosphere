package com.aerosphere.backend.model

data class Trip(
    val tripId: String,
    val pnr: String,
    val flight: Flight,
    val userId: String,
    val userName: String,
    val userEmail: String,
    val travelDate: String,
    val passengers: Int = 1,
    val cabinClass: String = "Economy",
    val seat: String,
    val gate: String,
    val status: String = "Confirmed (Scheduled)",
    val bookingTime: String,
    val countdownDays: Int = 4
)

data class CreateTripRequest(
    val flightId: String,
    val travelDate: String,
    val passengers: Int = 1,
    val cabinClass: String = "Economy",
    val seat: String? = null
)
