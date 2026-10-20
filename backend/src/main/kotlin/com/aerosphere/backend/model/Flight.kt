package com.aerosphere.backend.model

data class Baggage(
    val cabin: String = "7 kg",
    val checkIn: String = "15 kg"
)

data class Amenities(
    val wifi: Boolean = false,
    val mealIncluded: Boolean = false,
    val usbPower: Boolean = true,
    val entertainment: Boolean = false
)

data class DelayFactors(
    val routeCongestion: Int,
    val weatherFactor: Int,
    val turnaroundRisk: Int,
    val peakHourIndex: Int
)

data class DelayRisk(
    val score: Int,
    val level: String, // "Low", "Moderate", "High"
    val factors: DelayFactors,
    val primaryReason: String,
    val explanation: String
)

data class StopDetails(
    val airport: String,
    val duration: String
)

data class Flight(
    val id: String,
    val flightNumber: String,
    val airline: String,
    val airlineCode: String,
    val origin: String,
    val originTerminal: String,
    val destination: String,
    val destinationTerminal: String,
    val departureTime: String,
    val arrivalTime: String,
    val duration: String,
    val durationMinutes: Int,
    val stops: Int,
    val stopDetails: StopDetails? = null,
    val aircraft: String,
    val aircraftCategory: String,
    val baseFare: Int,
    val taxes: Int,
    val totalFare: Int,
    val seatsAvailable: Int,
    val cabinClass: String = "Economy",
    val seatPitch: String = "31 in",
    val baggage: Baggage = Baggage(),
    val amenities: Amenities = Amenities(),
    val historicalOtp: Double,
    val carbonKg: Int,
    val delayRisk: DelayRisk
)
