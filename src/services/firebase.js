import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword as fbSignInWithEmail,
  createUserWithEmailAndPassword as fbCreateUserWithEmail,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup as fbSignInWithPopup,
  updateProfile as fbUpdateProfile
} from 'firebase/auth';

// Standard public client-side Firebase configuration (NOT service account credentials)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

const isLiveFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes('YOUR_') &&
  firebaseConfig.apiKey.length > 10
);

let app = null;
let liveAuth = null;
let googleProvider = null;

if (isLiveFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    liveAuth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    console.info('[AeroSphere] Live Firebase Authentication initialized successfully.');
  } catch (err) {
    console.warn('[AeroSphere] Live Firebase initialization failed, falling back to local simulation:', err);
    liveAuth = null;
  }
}

export { app, isLiveFirebaseConfigured, liveAuth };

// Unified Auth Interface that bridges Live Firebase Auth with Smart Academic Simulation Auth
const SIMULATED_USER_KEY = 'aerosphere_simulated_user';
const listeners = new Set();

function getStoredSimulatedUser() {
  try {
    const raw = localStorage.getItem(SIMULATED_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function notifySimulatedListeners(user) {
  listeners.forEach(cb => {
    try {
      cb(user);
    } catch (e) {
      console.error(e);
    }
  });
}

export async function loginWithEmail(email, password) {
  if (isLiveFirebaseConfigured && liveAuth) {
    return await fbSignInWithEmail(liveAuth, email, password);
  }

  // Simulated fallback
  await new Promise(r => setTimeout(r, 400));
  const user = {
    uid: 'demo-user-' + Math.random().toString(36).substring(2, 9),
    email,
    displayName: email.split('@')[0].replace('.', ' ').replace(/^(\w)/, c => c.toUpperCase()),
    photoURL: null,
    isAnonymous: false,
    authProvider: 'Academic Demo Auth'
  };
  localStorage.setItem(SIMULATED_USER_KEY, JSON.stringify(user));
  notifySimulatedListeners(user);
  return { user };
}

export async function registerWithEmail(name, email, password) {
  if (isLiveFirebaseConfigured && liveAuth) {
    const userCredential = await fbCreateUserWithEmail(liveAuth, email, password);
    if (name && userCredential.user) {
      await fbUpdateProfile(userCredential.user, { displayName: name });
    }
    return userCredential;
  }

  // Simulated fallback
  await new Promise(r => setTimeout(r, 450));
  const user = {
    uid: 'demo-user-' + Math.random().toString(36).substring(2, 9),
    email,
    displayName: name || email.split('@')[0],
    photoURL: null,
    isAnonymous: false,
    authProvider: 'Academic Demo Auth'
  };
  localStorage.setItem(SIMULATED_USER_KEY, JSON.stringify(user));
  notifySimulatedListeners(user);
  return { user };
}

export async function loginWithGoogle() {
  if (isLiveFirebaseConfigured && liveAuth && googleProvider) {
    return await fbSignInWithPopup(liveAuth, googleProvider);
  }

  // Demo Google simulation
  await new Promise(r => setTimeout(r, 400));
  const user = {
    uid: 'demo-google-109284',
    email: 'aerosphere.pilot@college.edu',
    displayName: 'AeroSphere Aviator',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    isAnonymous: false,
    authProvider: 'Google (Simulated)'
  };
  localStorage.setItem(SIMULATED_USER_KEY, JSON.stringify(user));
  notifySimulatedListeners(user);
  return { user };
}

export async function loginWithDemoPersona(personaType = 'frequent') {
  await new Promise(r => setTimeout(r, 300));
  const personas = {
    frequent: {
      uid: 'persona-rahul-sharma',
      email: 'rahul.sharma@aviation-demo.in',
      displayName: 'Capt. Rahul Sharma',
      tier: 'Diamond SkyClub Elite',
      avatar: '👨‍✈️',
      authProvider: 'AeroSphere Demo Persona'
    },
    business: {
      uid: 'persona-priya-verma',
      email: 'priya.verma@techindia.org',
      displayName: 'Dr. Priya Verma',
      tier: 'Sapphire Business Pass',
      avatar: '👩‍💼',
      authProvider: 'AeroSphere Demo Persona'
    }
  };

  const user = personas[personaType] || personas.frequent;
  localStorage.setItem(SIMULATED_USER_KEY, JSON.stringify(user));
  notifySimulatedListeners(user);
  return { user };
}

export async function logoutUser() {
  if (isLiveFirebaseConfigured && liveAuth) {
    await fbSignOut(liveAuth);
  }
  localStorage.removeItem(SIMULATED_USER_KEY);
  notifySimulatedListeners(null);
}

export async function getIdToken(user) {
  if (!user) return null;
  if (isLiveFirebaseConfigured && user.getIdToken) {
    try {
      return await user.getIdToken();
    } catch (e) {
      console.warn('[AeroSphere Auth] Error fetching live ID token, falling back:', e);
    }
  }
  // Academic Demo Token format recognized by AeroSphere backend filter
  return `demo-token-${user.uid}`;
}

export function subscribeToAuthChanges(callback) {
  if (isLiveFirebaseConfigured && liveAuth) {
    return fbOnAuthStateChanged(liveAuth, (user) => {
      callback(user);
    });
  }

  // Simulation subscription
  listeners.add(callback);
  callback(getStoredSimulatedUser());
  return () => {
    listeners.delete(callback);
  };
}
