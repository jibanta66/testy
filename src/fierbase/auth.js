// GoogleAuth.js
import React, { useState } from "react";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth";
import { app } from "../fierbase/fierbase";
import './auth.css';
const provider = new GoogleAuthProvider();

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleGoogleAuth = async () => {
    const auth = getAuth(app);
    try {
      // Set the persistence to 'none' or 'local'
      await setPersistence(auth, browserSessionPersistence);

      const result = await signInWithPopup(auth, provider);
      const newUser = result.user;
      setUser(newUser);
      console.log("User signed in/up with Google:", newUser);
    } catch (error) {
      console.error("Google authentication error:", error.message);
    }
  };

  const handleEmailAuth = async () => {
    const auth = getAuth(app);
    try {
      if (isLoginMode) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const loggedInUser = result.user;
        setUser(loggedInUser);
        console.log("User logged in with email:", loggedInUser);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = result.user;
        setUser(newUser);
        console.log("User signed up with email:", newUser);
      }
    } catch (error) {
      console.error("Email authentication error:", error.message);
    }
  };

  const handleToggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handleLogOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      setUser(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <body class="authbody">
    <div class="container">
  <h1>{isLoginMode ? "" : "Sign-Up"} SIGN UP</h1>

  {user ? (
    <div class="welcome-container">
      <p>Welcome, {user.displayName || user.email}!</p>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  ) : (
    <div class="button-container">
      <button class="google-auth-button" onClick={handleGoogleAuth}>Sign in/up with Google</button>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button class="email-auth-button" onClick={handleEmailAuth}>
        {isLoginMode ? "Login with Email" : "Sign up with Email"}
      </button>
      <p class="toggle-mode" onClick={handleToggleMode}>
        {isLoginMode ? "Don't have an account? Sign up here" : "Already have an account? Login here"}
      </p>
    </div>
  )}
</div>
  </body>
  );
};

export default GoogleAuth;
