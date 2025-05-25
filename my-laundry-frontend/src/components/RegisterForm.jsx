import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/AuthForm.module.css";
import logoImage from "../assets/laundry.png"; // sesuaikan path gambarnya

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(username, email, password);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.cardWrapper}>
        <div className={styles.logoSide}>
          <img
            src={logoImage}
            alt="Register Illustration"
            className={styles.logoImage}
          />
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Register</h2>

          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && (
            <div
              style={{
                color: "green",
                marginBottom: "1rem",
                fontWeight: "600",
              }}
            >
              {success}
            </div>
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputField}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              required
            />
            <button
              type="button"
              className={styles.showPassBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className={styles.passwordWrapper}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.inputField}
              required
            />
            <button
              type="button"
              className={styles.showPassBtn}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className={styles.submitButton}>
            Register
          </button>

          <div
            className={styles.linksContainer}
            style={{ marginTop: "1.5rem" }}
          >
            Already have account?{" "}
            <Link to="/login" className={styles.link}>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
