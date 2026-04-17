import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzbu_UqT8vVx9oeiqfP_eA4HrbZBF1JLY",
  authDomain: "tmdb-project-7a4ec.firebaseapp.com",
  projectId: "tmdb-project-7a4ec",
  storageBucket: "tmdb-project-7a4ec.firebasestorage.app",
  messagingSenderId: "208427060737",
  appId: "1:208427060737:web:ca09058ca28b0e3d98fa00"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);