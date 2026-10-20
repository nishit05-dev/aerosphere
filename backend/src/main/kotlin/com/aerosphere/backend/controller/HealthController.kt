package com.aerosphere.backend.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.Instant

@RestController
@RequestMapping("/api")
class HealthController {

    @GetMapping("/health")
    fun health(): ResponseEntity<Map<String, Any>> {
        return ResponseEntity.ok(
            mapOf(
                "status" to "UP",
                "service" to "AeroSphere Intelligent Passenger Travel Backend",
                "version" to "1.0.0-SNAPSHOT",
                "timestamp" to Instant.now().toString(),
                "environment" to "Academic Simulation / Spring Boot 3.3.x"
            )
        )
    }
}
