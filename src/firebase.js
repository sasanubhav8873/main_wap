import { initializeApp, getApp, getApps } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Evaluate if Firebase is properly configured
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "your-api-key-here" &&
  firebaseConfig.projectId
);

let app;
let auth;
let db;
let googleProvider;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.warn("Firebase initialization failed, falling back to mock mode:", error);
  }
} else {
  console.log("Firebase credentials not fully set up. Running in robust local-storage Mock Mode.");
}

/* ────────────────────────────────────────────────────────── */
/*                      MOCK DATABASE SETUP                   */
/* ────────────────────────────────────────────────────────── */

const getMockUsers = () => {
  const users = localStorage.getItem("mock_users");
  return users ? JSON.parse(users) : {};
};

const saveMockUser = (key, userData) => {
  const users = getMockUsers();
  users[key] = userData;
  localStorage.setItem("mock_users", JSON.stringify(users));
};

let mockAuthCallbacks = [];
let mockCurrentUser = null;

// Load saved session on init
const initMockSession = () => {
  const savedSession = localStorage.getItem("mock_session");
  if (savedSession) {
    try {
      mockCurrentUser = JSON.parse(savedSession);
    } catch (e) {
      localStorage.removeItem("mock_session");
    }
  }
};
initMockSession();

const triggerMockAuthChange = () => {
  mockAuthCallbacks.forEach(cb => cb(mockCurrentUser));
};

/* ────────────────────────────────────────────────────────── */
/*                       UNIFIED AUTH SERVICES                */
/* ────────────────────────────────────────────────────────── */

/**
 * Listens to persistent authentication changes (Live or Mock)
 */
export const subscribeToAuthChanges = (callback) => {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch role from Firestore
        const role = await getUserRole(user.uid);
        callback({
          uid: user.uid,
          email: user.email,
          name: user.displayName || "User",
          role: role
        });
      } else {
        callback(null);
      }
    });
  } else {
    mockAuthCallbacks.push(callback);
    // Trigger immediately with current mock user state
    callback(mockCurrentUser);
    return () => {
      mockAuthCallbacks = mockAuthCallbacks.filter(cb => cb !== callback);
    };
  }
};

/**
 * Registers a new user with Email, Password, Name, and Role (Bypassing Firestore)
 */
export const signUpUser = async (email, password, name, role) => {
  if (isFirebaseConfigured && auth) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Set displayName on Firebase User Profile
    await updateProfile(user, { displayName: name });
    
    // Store role and profile data locally (Ignoring Firestore database writes for speed)
    await saveUserRole(user.uid, name, email, role);
    
    return { uid: user.uid, email: user.email, name, role };
  } else {
    // Mock Signup
    const normalizedEmail = email.toLowerCase().trim();
    const users = getMockUsers();
    
    if (users[normalizedEmail]) {
      const error = new Error("The email address is already in use by another account.");
      error.code = "auth/email-already-in-use";
      throw error;
    }
    
    const uid = "mock-uid-" + Math.random().toString(36).substr(2, 9);
    const userData = { uid, email: normalizedEmail, name, role };
    
    // Store in mock db
    saveMockUser(normalizedEmail, userData);
    saveMockUser(uid, userData);
    
    mockCurrentUser = userData;
    localStorage.setItem("mock_session", JSON.stringify(userData));
    triggerMockAuthChange();
    
    return userData;
  }
};

/**
 * Logs in an existing user with Email and Password (Bypassing Firestore)
 */
export const signInUser = async (email, password) => {
  if (isFirebaseConfigured && auth) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const role = await getUserRole(user.uid);
    return { uid: user.uid, email: user.email, name: user.displayName || "User", role };
  } else {
    // Mock Signin
    const normalizedEmail = email.toLowerCase().trim();
    const users = getMockUsers();
    const user = users[normalizedEmail];
    
    if (!user) {
      const error = new Error("There is no user record corresponding to this identifier.");
      error.code = "auth/user-not-found";
      throw error;
    }
    
    // In mock mode, any password works for immediate testing ease!
    mockCurrentUser = user;
    localStorage.setItem("mock_session", JSON.stringify(user));
    triggerMockAuthChange();
    
    return user;
  }
};

/**
 * Authenticates user using Google Auth Popup (Bypassing Firestore)
 */
export const signInWithGoogle = async () => {
  if (isFirebaseConfigured && auth && googleProvider) {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    const role = await getUserRole(user.uid);
    return { uid: user.uid, email: user.email, name: user.displayName || "Google User", role };
  } else {
    // Mock Google Signin
    const uid = "mock-google-uid-12345";
    const email = "google-user@example.com";
    const name = "Google Explorer";
    const role = await getUserRole(uid); // Might be null if first time
    
    const userData = { uid, email, name, role };
    mockCurrentUser = userData;
    localStorage.setItem("mock_session", JSON.stringify(userData));
    triggerMockAuthChange();
    
    return userData;
  }
};

/**
 * Retrieves the user role from LocalStorage (Completely ignores Firestore database read)
 */
export const getUserRole = async (uid) => {
  // Read role locally from browser database for 0ms instantaneous load speeds
  const users = getMockUsers();
  const user = users[uid];
  return user ? user.role : null;
};

/**
 * Directly updates/saves the user role (Completely ignores Firestore database write)
 */
export const saveUserRole = async (uid, name, email, role) => {
  const userData = { uid, email, name, role };
  saveMockUser(uid, userData);
  
  // Key by email too if mock email exists
  if (email) {
    saveMockUser(email.toLowerCase().trim(), userData);
  }
  
  // Update active mock session if matching
  if (mockCurrentUser && mockCurrentUser.uid === uid) {
    mockCurrentUser = userData;
    localStorage.setItem("mock_session", JSON.stringify(userData));
    triggerMockAuthChange();
  }
};

/**
 * Cleanly signs out the user (Live or Mock)
 */
export const logOutUser = async () => {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  } else {
    mockCurrentUser = null;
    localStorage.removeItem("mock_session");
    triggerMockAuthChange();
  }
};
