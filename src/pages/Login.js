import React, { useMemo, useState } from "react";
import "./Login.css";

export default function Login({ onLogin, onBack }) {
  const users = useMemo(() => {
    // HashMap(Map) 기반(요구하던 방식 유지)
    const m = new Map();
    m.set("user1", { userId: "user1", password: "1111", name: "사용자1" });
    m.set("user2", { userId: "user2", password: "2222", name: "사용자2" });
    m.set("admin", { userId: "admin", password: "1234", name: "관리자" });
    return m;
  }, []);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");

    const u = users.get(userId.trim());
    if (!u || u.password !== password) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    onLogin({ userId: u.userId, name: u.name });
  };

  return (
    <div className="lg-page">
      <div className="lg-card">
        <div className="lg-top">
          <div className="lg-title">로그인</div>
          <div className="lg-sub">골든 링크 서비스를 이용하려면 로그인하세요</div>
        </div>

        <form className="lg-form" onSubmit={submit}>
          <label className="lg-field">
            <span className="lg-label">아이디</span>
            <input
              className="lg-input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="예: user1"
              autoComplete="username"
            />
          </label>

          <label className="lg-field">
            <span className="lg-label">비밀번호</span>
            <input
              className="lg-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="예: 1111"
              autoComplete="current-password"
            />
          </label>

          {error && <div className="lg-error">{error}</div>}

          <button type="submit" className="lg-btnPrimary">
            로그인
          </button>

          <button type="button" className="lg-btnGhost" onClick={onBack}>
            뒤로가기
          </button>

          <div className="lg-hint">
            테스트 계정: <b>user1/1111</b>, <b>user2/2222</b>, <b>admin/1234</b>
          </div>
        </form>
      </div>
    </div>
  );
}
