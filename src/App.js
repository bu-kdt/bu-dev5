import React, { useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  const [page, setPage] = useState("home"); // 'home' | 'login'
  const [user, setUser] = useState(null);

  const goHome = () => setPage("home");
  const goLogin = () => setPage("login");

  // ✅ 로그인 처리 로직 수정
  const onLogin = (payload) => {
    // payload에 담긴 userid와 password가 모두 'root'인지 확인합니다.
    if (payload.userid === "root" && payload.password === "root") {
      // 관리자 계정 정보 저장
      setUser({
        ...payload,
        name: "최고관리자", 
        isAdmin: true // 상세 페이지에서 답변 양식을 보여주기 위한 필수 값
      });
      alert("최고관리자 계정으로 로그인되었습니다.");
    } else {
      // 일반 사용자 정보 저장
      setUser({
        ...payload,
        isAdmin: false 
      });
    }
    setPage("home");
  };

  const onLogout = () => {
    setUser(null);
    alert("로그아웃 되었습니다.");
  };

  if (page === "login") {
    return <Login onLogin={onLogin} onBack={goHome} />;
  }

  return (
    <Home 
      user={user} 
      onLogout={onLogout} 
      onGoLogin={goLogin} 
      onGoHome={goHome} 
    />
  );
}

