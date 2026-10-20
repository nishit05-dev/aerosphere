package com.aerosphere.backend.security

import com.aerosphere.backend.config.FirebaseConfig
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseToken
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class FirebaseAuthenticationFilter(
    private val firebaseConfig: FirebaseConfig
) : OncePerRequestFilter() {

    private val filterLog = LoggerFactory.getLogger(FirebaseAuthenticationFilter::class.java)

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader("Authorization")

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            val idToken = authHeader.substring(7).trim()

            try {
                if (firebaseConfig.isLiveFirebaseInitialized) {
                    // Real verification against Firebase Admin SDK
                    val decodedToken: FirebaseToken = FirebaseAuth.getInstance().verifyIdToken(idToken)
                    val principal = FirebaseUserPrincipal(
                        uid = decodedToken.uid,
                        email = decodedToken.email ?: "",
                        displayName = decodedToken.name ?: "Verified Passenger"
                    )
                    val auth = UsernamePasswordAuthenticationToken(
                        principal,
                        idToken,
                        listOf(SimpleGrantedAuthority("ROLE_USER"))
                    )
                    SecurityContextHolder.getContext().authentication = auth
                    filterLog.debug("Successfully validated Firebase ID token for UID: ${decodedToken.uid}")
                } else {
                    // Demo / Mock Token Validation (Strictly separated for academic evaluation without service account)
                    if (idToken.startsWith("demo-token-") || idToken.startsWith("demo-") || idToken.startsWith("mock-token-")) {
                        val uid = when {
                            idToken.startsWith("demo-token-") -> idToken.removePrefix("demo-token-")
                            idToken.startsWith("mock-token-") -> idToken.removePrefix("mock-token-")
                            else -> idToken
                        }

                        val (name, email) = when (uid) {
                            "traveler-riya", "demo-traveler-riya" -> 
                                Pair("Riya Sharma (Traveler Persona)", "riya.sharma@aerosphere.in")
                            "business-arjun", "demo-business-arjun" -> 
                                Pair("Arjun Mehta (Business Persona)", "arjun.mehta@aerosphere.in")
                            "student-kabir", "demo-student-kabir" -> 
                                Pair("Kabir Verma (Student Persona)", "kabir.verma@aerosphere.in")
                            else -> 
                                Pair("Academic Evaluator ($uid)", "evaluator@university.edu")
                        }

                        val principal = FirebaseUserPrincipal(
                            uid = uid,
                            email = email,
                            displayName = name
                        )
                        val auth = UsernamePasswordAuthenticationToken(
                            principal,
                            idToken,
                            listOf(SimpleGrantedAuthority("ROLE_USER"))
                        )
                        SecurityContextHolder.getContext().authentication = auth
                        filterLog.info("Academic Demo token accepted for UID: $uid ($name)")
                    } else {
                        filterLog.warn("Rejected unauthorized token format in Academic Demo mode: ${idToken.take(12)}...")
                        SecurityContextHolder.clearContext()
                    }
                }
            } catch (e: Exception) {
                filterLog.warn("Firebase ID Token verification failed: ${e.message}")
                SecurityContextHolder.clearContext()
            }
        }

        filterChain.doFilter(request, response)
    }
}
