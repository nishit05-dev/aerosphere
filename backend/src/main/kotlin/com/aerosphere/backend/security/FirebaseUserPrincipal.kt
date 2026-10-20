package com.aerosphere.backend.security

import java.security.Principal

data class FirebaseUserPrincipal(
    val uid: String,
    val email: String,
    val displayName: String,
    val isVerified: Boolean = true
) : Principal {
    override fun getName(): String = uid
}
