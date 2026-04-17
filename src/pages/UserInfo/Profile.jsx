import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is not authenticated after loading completes
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div style={{ color: "white", padding: "20px", textAlign: "center" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  // If no user after loading, don't show anything (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h2>Profile</h2>
      
      <p>Name: {user.displayName || "Not set"}</p>
      <p>Email: {user.email || "Not available"}</p>

    </div>
  );
}