package com.aerosphere.backend.service

import com.aerosphere.backend.model.CreateTripRequest
import com.aerosphere.backend.model.Trip
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.concurrent.ConcurrentHashMap
import kotlin.random.Random

@Service
class TripService(private val flightService: FlightService) {

    private val tripsByUser = ConcurrentHashMap<String, MutableList<Trip>>()

    fun getTripsForUser(userId: String): List<Trip> {
        return tripsByUser[userId] ?: emptyList()
    }

    fun createTrip(userId: String, userName: String, userEmail: String, request: CreateTripRequest): Trip? {
        val flight = flightService.getFlightById(request.flightId) ?: return null

        val pnr = "AS" + Random.nextInt(1000, 9999)
        val row = Random.nextInt(4, 28)
        val letter = listOf("A", "B", "C", "D", "E", "F").random()
        val seat = request.seat ?: "$row$letter"
        val gate = listOf("G04", "G12", "G18", "G22", "G31").random()

        val trip = Trip(
            tripId = "TRIP-" + Random.nextInt(100000, 999999),
            pnr = pnr,
            flight = flight,
            userId = userId,
            userName = userName,
            userEmail = userEmail,
            travelDate = request.travelDate,
            passengers = request.passengers,
            cabinClass = request.cabinClass,
            seat = seat,
            gate = gate,
            status = "Confirmed (Scheduled)",
            bookingTime = Instant.now().toString(),
            countdownDays = 4
        )

        tripsByUser.computeIfAbsent(userId) { mutableListOf() }.add(0, trip)
        return trip
    }

    fun deleteTrip(userId: String, tripId: String): Boolean {
        val list = tripsByUser[userId] ?: return false
        return list.removeIf { it.tripId == tripId }
    }
}
