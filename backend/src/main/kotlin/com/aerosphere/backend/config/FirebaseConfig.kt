package com.aerosphere.backend.config

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import java.io.File
import java.io.FileInputStream
import jakarta.annotation.PostConstruct

@Configuration
class FirebaseConfig(
    @Value("\${aerosphere.firebase.credentials-path:}") private val credentialsPath: String
) {
    private val logger = LoggerFactory.getLogger(FirebaseConfig::class.java)

    final var isLiveFirebaseInitialized: Boolean = false
        private set

    @PostConstruct
    fun initializeFirebase() {
        if (FirebaseApp.getApps().isNotEmpty()) {
            isLiveFirebaseInitialized = true
            return
        }

        try {
            if (credentialsPath.isNotBlank() && File(credentialsPath).exists()) {
                val serviceAccount = FileInputStream(credentialsPath)
                val options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build()

                FirebaseApp.initializeApp(options)
                isLiveFirebaseInitialized = true
                logger.info("[AeroSphere Security] Firebase Admin SDK successfully initialized from {}", credentialsPath)
            } else {
                logger.warn("[AeroSphere Security] No Firebase service-account JSON provided at '{}'. Running in Secure Mock Token Verification Mode for academic demo.", credentialsPath)
                isLiveFirebaseInitialized = false
            }
        } catch (e: Exception) {
            logger.error("[AeroSphere Security] Failed to initialize Firebase Admin SDK: {}. Falling back to demo mock mode.", e.message)
            isLiveFirebaseInitialized = false
        }
    }
}
