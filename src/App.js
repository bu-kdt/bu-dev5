import React, { useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  const [page, setPage] = useState("home"); // 'home' | 'login'
  const [user, setUser] = useState(null);

  const goHome = () => setPage("home");
  const goLogin = () => setPage("login");

  const onLogin = (payload) => {
    setUser(payload);
    setPage("home");
  };

  const onLogout = () => {
    setUser(null);
  };

  if (page === "login") {
    return <Login onLogin={onLogin} onBack={goHome} />;
  }

  return <Home user={user} onLogout={onLogout} onGoLogin={goLogin} onGoHome={goHome} />;
}


