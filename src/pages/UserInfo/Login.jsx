import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./auth.scss";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.error("Login error code:", err.code);
            
            let message = "Login failed. Try again.";

            switch (err.code) {
                case "auth/invalid-email":
                    message = "Invalid email format";
                    break;

                case "auth/invalid-credential":
                case "auth/user-not-found":
                case "auth/wrong-password":
                    message = "Incorrect email or password";
                    break;

                case "auth/user-disabled":
                    message = "This account has been disabled";
                    break;

                case "auth/too-many-requests":
                    message = "Too many login attempts. Please try again later";
                    break;

                case "auth/network-request-failed":
                    message = "Network error. Check your internet connection";
                    break;

                default:
                    message = err.message || "Login failed. Please try again.";
            }

            setError(message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="auth-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="auth-group password-group">
                        <label>Password</label>

                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <span
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </span>
                        </div>
                    </div>

                    {/* 🔥 Error Message UI */}
                    {error && <p className="error-text">{error}</p>}

                    <p className="auth-switch">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </p>

                    <button className="auth-button" type="submit">
                        Login
                    </button>
                </form>

                <p className="auth-switch">
                    Don’t have an account? <Link to="/signup">Signup</Link>
                </p>
            </div>
        </div>
    );
}