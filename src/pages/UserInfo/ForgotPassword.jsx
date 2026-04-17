import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./auth.scss";

export default function ForgotPassword() {
    const { resetPassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            await resetPassword(email);
            console.log("RESET EMAIL SENT")
            setMessage("Reset link sent ✅");
        } catch (err) {
            console.log(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Reset Password</h2>

                <form onSubmit={handleSubmit}>
                    <div className="auth-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {message && <p className="success-text">{message}</p>}
                    {error && <p className="error-text">{error}</p>}

                    <button className="auth-button">Send Reset Link</button>
                </form>

                <p className="auth-switch">
                    Back to <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}