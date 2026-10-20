package com.aerosphere.backend.config

import com.aerosphere.backend.security.FirebaseAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val firebaseAuthenticationFilter: FirebaseAuthenticationFilter
) {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .cors { } // Managed via CorsConfig
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .authorizeHttpRequests { auth ->
                auth
                    // Public Endpoints
                    .requestMatchers("/api/health").permitAll()
                    .requestMatchers("/api/flights/**").permitAll()
                    .requestMatchers("/api/delay/**").permitAll()
                    .requestMatchers("/api/analytics/**").permitAll()
                    // Secured Endpoints (Passenger itineraries)
                    .requestMatchers("/api/trips/**").authenticated()
                    .anyRequest().permitAll()
            }
            .addFilterBefore(firebaseAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }
}
