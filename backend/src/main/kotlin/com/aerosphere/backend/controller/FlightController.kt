package com.aerosphere.backend.controller

import com.aerosphere.backend.model.Flight
import com.aerosphere.backend.service.FlightService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/flights")
class FlightController(private val flightService: FlightService) {

    @GetMapping("/search")
    fun search(
        @RequestParam(defaultValue = "DEL") origin: String,
        @RequestParam(defaultValue = "BOM") destination: String,
        @RequestParam(defaultValue = "2026-10-25") date: String,
        @RequestParam(defaultValue = "Economy") cabin: String
    ): ResponseEntity<List<Flight>> {
        val flights = flightService.searchFlights(origin, destination, date, cabin)
        return ResponseEntity.ok(flights)
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): ResponseEntity<Flight> {
        val flight = flightService.getFlightById(id)
            ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(flight)
    }
}
