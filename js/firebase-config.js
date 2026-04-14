// ═══════════════════════════════════════════════════════════════
// FIREBASE CONFIGURATION
// ═══════════════════════════════════════════════════════════════
//
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (or use existing)
// 3. Go to Project Settings → General → Your Apps → Add Web App
// 4. Copy the firebaseConfig object and paste it below
// 5. Enable Authentication:
//    - Go to Authentication → Sign-in Method → Enable Google
// 6. Create Firestore Database:
//    - Go to Firestore Database → Create Database → Start in test mode
//    - Then go to Rules tab and paste these security rules:
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//  match /users/{userId}/data/{docId} {
//    allow read, write: if request.auth != null && request.auth.uid == userId;
//  }
//      }
//    }
//
// ═══════════════════════════════════════════════════════════════

const firebaseConfig = {
  apiKey: "AIzaSyDh_GZhf8DV9EM_Kgt9_Ij9GiykCcmcBlI",
  authDomain: "eliteprep-38928.firebaseapp.com",
  projectId: "eliteprep-38928",
  storageBucket: "eliteprep-38928.firebasestorage.app",
  messagingSenderId: "735263390036",
  appId: "1:735263390036:web:bc4c386d6c91f27a8770c1",
  measurementId: "G-M008JG5PE5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
