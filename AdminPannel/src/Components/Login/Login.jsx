import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaFilm,
  FaShieldAlt,
  FaInfoCircle,
} from "react-icons/fa";

import loginLogo from "../../assets/loginlogo.png";
import loginBg from "../../assets/login-bg.png";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Empty validation
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);

    // Demo login
    setTimeout(() => {
      if (
        username.trim() === "admin" &&
        password === "12345"
      ) {
        // Save login status
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username.trim());

        // Remember username
        if (rememberMe) {
          localStorage.setItem(
            "rememberedUser",
            username.trim()
          );
        } else {
          localStorage.removeItem("rememberedUser");
        }

        setSuccess("Login successful! Redirecting...");

        setLoading(false);

        // Redirect after successful login
            setTimeout(() => {
        navigate("/gallery-management");
      }, 1000);

      } else {
        setError("Invalid username or password.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="Login">

      <div className="Login-container">

        {/* ================= LEFT SECTION ================= */}

        <div
          className="Login-left"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        >

          <div className="Login-leftOverlay"></div>

          <div className="Login-leftContent">

            {/* Logo + Brand */}

            <div className="Login-brand">

              <img
                src={loginLogo}
                alt="OCWA Logo"
                className="Login-logo"
              />

              <div className="Login-brandText">

                <h2>OCWA</h2>

                <p className="Login-brandYellow">
                  ODISHA CINE WORKERS ASSOCIATION
                </p>

                <p>
                  UNITED WE STAND, CINEMA WE BUILD
                </p>

              </div>

            </div>


            {/* Main Heading */}

            <div className="Login-intro">

              <h1>OCWA</h1>

              <div className="Login-yellowLine"></div>

              <p>
                Welcome to the OCWA Dashboard.
                <br />
                Manage members, events, communications,
                <br />
                and association activities with ease.
              </p>

            </div>


            {/* Security Card */}

            <div className="Login-securityCard">

              <div className="Login-securityIcon">
                <FaShieldAlt />
              </div>

              <div className="Login-securityText">

                <h3>
                  Secure Access
                </h3>

                <p>
                  Your security is our priority.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= RIGHT SECTION ================= */}

        <div className="Login-right">

          <div className="Login-formWrapper">

            {/* Cinema Icon */}

            <div className="Login-iconCircle">
              <FaFilm />
            </div>


            {/* Heading */}

            <div className="Login-heading">

              <h1>
                Welcome Back
              </h1>

              <p>
                Sign in to continue to your dashboard
              </p>

            </div>


            {/* Login Form */}

            <form
              className="Login-form"
              onSubmit={handleLogin}
            >

              {/* Username */}

              <div className="Login-inputBox">

                <FaUser
                  className="Login-inputIcon"
                />

                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  autoComplete="username"
                  required
                />

              </div>


              {/* Password */}

              <div className="Login-inputBox">

                <FaLock
                  className="Login-inputIcon"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="Login-eyeButton"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>


              {/* Remember Me */}

              <div className="Login-options">

                <label className="Login-remember">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                  />

                  <span className="Login-customCheckbox"></span>

                  <span>
                    Remember me
                  </span>

                </label>

              </div>


              {/* Demo Credentials */}

              <div className="Login-demoBox">

                <FaInfoCircle />

                <p>

                  <strong>
                    Username:
                  </strong>{" "}
                  admin

                  <span>|</span>

                  <strong>
                    Password:
                  </strong>{" "}
                  12345

                </p>

              </div>


              {/* Error */}

              {error && (
                <div className="Login-error">
                  {error}
                </div>
              )}


              {/* Success */}

              {success && (
                <div className="Login-success">
                  ✓ {success}
                </div>
              )}


              {/* Login Button */}

              <button
                type="submit"
                className="Login-button"
                disabled={loading}
              >

                <span>
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </span>

              </button>

            </form>


            {/* Footer */}

            <div className="Login-footer">
              © 2026 OCWA. All rights reserved.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;