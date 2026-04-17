import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <div style={{ color: "white", textAlign: "center", padding: "40px" }}>Loading...</div>;
  }

  // Redirect to login if user is not authenticated
  return user ? children : <Navigate to="/login" />;
}