import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../api/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { updateProfile } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      return userCredential;
    } catch (error) {
      console.error("Signup error:", error.code, error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      throw error;
    }
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};