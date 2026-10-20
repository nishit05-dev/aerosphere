package com.aerosphere.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AeroSphereApplication

fun main(args: Array<String>) {
    runApplication<AeroSphereApplication>(*args)
}
