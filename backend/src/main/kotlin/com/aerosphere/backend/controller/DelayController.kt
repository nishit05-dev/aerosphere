package com.aerosphere.backend.controller

import com.aerosphere.backend.model.DelayPredictionRequest
import com.aerosphere.backend.model.DelayPredictionResponse
import com.aerosphere.backend.service.DelayRiskService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/delay")
class DelayController(private val delayRiskService: DelayRiskService) {

    @PostMapping("/predict")
    fun predict(@RequestBody request: DelayPredictionRequest): ResponseEntity<DelayPredictionResponse> {
        val response = delayRiskService.calculateRisk(request)
        return ResponseEntity.ok(response)
    }
}
