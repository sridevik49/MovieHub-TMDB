import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./auth.scss";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});

  // 🔐 Password strength
  const getStrength = (pass) => {
    if (pass.length < 6) return "Weak";
    if (pass.match(/^(?=.*[A-Z])(?=.*\d).{6,}$/)) return "Strong";
    return "Medium";
  };

  const strength = getStrength(password);

  const validate = () => {
    let newErrors = {};

    if (!email) newErrors.email = "Email is required";

    if (!name) newErrors.name = "Name is required";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    if (password !== confirmPassword)
      newErrors.confirm = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await signup(email, password, name);
      navigate("/");
    } catch (err) {
      console.error("Signup error code:", err.code);
      
      let message = "Signup failed. Please try again.";

      switch (err.code) {
        case "auth/email-already-in-use":
          message = "Email already registered. Please login or use another email";
          break;

        case "auth/invalid-email":
          message = "Invalid email format";
          break;

        case "auth/weak-password":
          message = "Password is too weak. Use at least 6 characters with numbers and uppercase letters";
          break;

        case "auth/operation-not-allowed":
          message = "Signup is currently disabled";
          break;

        case "auth/too-many-requests":
          message = "Too many signup attempts. Please try again later";
          break;

        case "auth/network-request-failed":
          message = "Network error. Check your internet connection";
          break;

        default:
          message = err.message || "Signup failed. Please try again.";
      }

      setErrors({ firebase: message });
    }
  };

  const isValid =
    email &&
    name &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    password.length >= 6;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="auth-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="auth-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          {/* Password */}
          <div className="auth-group password-group">
            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>

            {/* Strength */}
            {password && (
              <p className={`strength ${strength.toLowerCase()}`}>
                {strength} Password
              </p>
            )}

            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="auth-group password-group">
            <label>Confirm</label>

            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <span
                className="eye-icon"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                <i className={`fa-solid ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>

            {errors.confirm && (
              <p className="error-text">{errors.confirm}</p>
            )}
          </div>

          {/* Firebase error */}
          {errors.firebase && (
            <p className="error-text center">{errors.firebase}</p>
          )}

          <button className="auth-button" disabled={!isValid}>
            Signup
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}