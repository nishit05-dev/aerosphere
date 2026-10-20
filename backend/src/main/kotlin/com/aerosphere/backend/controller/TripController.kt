package com.aerosphere.backend.controller

import com.aerosphere.backend.model.CreateTripRequest
import com.aerosphere.backend.model.Trip
import com.aerosphere.backend.security.FirebaseUserPrincipal
import com.aerosphere.backend.service.TripService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/trips")
class TripController(private val tripService: TripService) {

    @GetMapping
    fun getUserTrips(@AuthenticationPrincipal principal: FirebaseUserPrincipal?): ResponseEntity<List<Trip>> {
        val uid = principal?.uid ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        val trips = tripService.getTripsForUser(uid)
        return ResponseEntity.ok(trips)
    }

    @PostMapping
    fun createTrip(
        @AuthenticationPrincipal principal: FirebaseUserPrincipal?,
        @RequestBody request: CreateTripRequest
    ): ResponseEntity<Trip> {
        val uid = principal?.uid ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        val userName = principal.displayName.ifBlank { "Distinguished Traveler" }
        val userEmail = principal.email.ifBlank { "traveler@aerosphere.in" }

        val created = tripService.createTrip(uid, userName, userEmail, request)
            ?: return ResponseEntity.badRequest().build()

        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @DeleteMapping("/{tripId}")
    fun deleteTrip(
        @AuthenticationPrincipal principal: FirebaseUserPrincipal?,
        @PathVariable tripId: String
    ): ResponseEntity<Void> {
        val uid = principal?.uid ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        val deleted = tripService.deleteTrip(uid, tripId)
        return if (deleted) ResponseEntity.noContent().build() else ResponseEntity.notFound().build()
    }
}
