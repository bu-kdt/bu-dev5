import React, { useState, useEffect } from "react";
import { IoCloseOutline, IoEyeOutline } from "react-icons/io5";
import "./Login.css";

export default function Login({ onLogin, onBack }) {
  // 0: 로그인, 1: 회원가입, 2: 아이디 찾기, 3: 비밀번호 찾기
  const [view, setView] = useState(0);

  // 초기 사용자 데이터 (시뮬레이션)
  const [userMap, setUserMap] = useState(() => {
    const m = new Map();
    m.set("user1", { userId: "user1", password: "Password1!", name: "사용자1", phone: "01012345678" });
    return m;
  });

  // 상태 관리
  const [errors, setErrors] = useState({});
  const [loginForm, setLoginForm] = useState({ userId: "", pw: "" });
  const [regForm, setRegForm] = useState({
    name: "", userId: "", pw: "", pwConfirm: "", birth: "", phone: "", addr: ""
  });
  const [idCheckMsg, setIdCheckMsg] = useState({ text: "", isSuccess: false });
  const [findPhone, setFindPhone] = useState("");
  const [findIdForPw, setFindIdForPw] = useState("");
  const [findResultMsg, setFindResultMsg] = useState({ text: "", isSuccess: false });

  // 뷰 변경 시 초기화
  const changeView = (newView) => {
    setView(newView);
    setErrors({});
    setLoginForm({ userId: "", pw: "" });
    setRegForm({ name: "", userId: "", pw: "", pwConfirm: "", birth: "", phone: "", addr: "" });
    setIdCheckMsg({ text: "", isSuccess: false });
    setFindPhone("");
    setFindIdForPw("");
    setFindResultMsg({ text: "", isSuccess: false });
  };

  // 1. 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    const inputId = loginForm.userId.trim();
    const inputPw = loginForm.pw;

    // ✅ 관리자 계정(root) 우선 체크 로직 추가
    if (inputId === "root" && inputPw === "root") {
      onLogin({ userid: "root", password: "root", name: "최고관리자" });
      return;
    }

    // 기존 일반 사용자 로그인 로직 유지
    const u = userMap.get(inputId);
    if (!u || u.password !== inputPw) {
      setErrors({ loginCommon: "아이디 또는 비밀번호가 올바르지 않습니다." });
      return;
    }
    onLogin({ userid: u.userId, name: u.name }); // App.jsx와 키값 통일 (userid)
  };

  // 2. 아이디 중복 확인
  const checkDuplicate = () => {
    if (!regForm.userId) {
      setErrors({ ...errors, regUserId: "필수 정보입니다." });
      return;
    }
    if (userMap.has(regForm.userId) || regForm.userId === "root") { // root도 중복으로 간주
      setIdCheckMsg({ text: "이미 사용 중인 아이디입니다.", isSuccess: false });
    } else {
      setIdCheckMsg({ text: "사용 가능한 아이디입니다.", isSuccess: true });
    }
  };

  // 3. 회원가입 처리
  const handleRegister = (e) => {
    e.preventDefault();
    if (!idCheckMsg.isSuccess) {
      setErrors({ ...errors, regUserId: "아이디 중복 확인이 필요합니다." });
      return;
    }
    if (regForm.pw !== regForm.pwConfirm) return; 

    const newUserMap = new Map(userMap);
    newUserMap.set(regForm.userId, { ...regForm, password: regForm.pw });
    setUserMap(newUserMap);
    alert("회원가입이 완료되었습니다!");
    changeView(0);
  };

  return (
    <div className="lg-page">
      <div className={`lg-card ${view === 1 ? "lg-card-wide" : ""}`}>
        <div className="lg-card-head">
          <h2 className="lg-card-title">
            {view === 0 && "로그인"}
            {view === 1 && "회원가입"}
            {view === 2 && "아이디 찾기"}
            {view === 3 && "비밀번호 찾기"}
          </h2>
          <button className="lg-close-btn" onClick={onBack}><IoCloseOutline /></button>
        </div>

        {/* 0. 로그인 화면 */}
        {view === 0 && (
          <div className="lg-body">
            <form className="lg-form" onSubmit={handleLogin}>
              <div className="lg-field">
                <input 
                  className="lg-input"
                  placeholder="아이디" 
                  value={loginForm.userId} 
                  onChange={e => setLoginForm({...loginForm, userId: e.target.value})}
                />
              </div>
              <div className="lg-field">
                <div className="lg-input-pw-wrap">
                  <input 
                    className="lg-input"
                    type="password" 
                    placeholder="비밀번호" 
                    value={loginForm.pw}
                    onChange={e => setLoginForm({...loginForm, pw: e.target.value})}
                  />
                  <IoEyeOutline className="lg-pw-eye" />
                </div>
                {errors.loginCommon && <p className="lg-error-msg">{errors.loginCommon}</p>}
              </div>
              <button type="submit" className="lg-btn-primary lg-mt-20">로그인</button>
            </form>
            <div className="lg-footer-links">
              <span onClick={() => changeView(1)}>회원가입</span>
              <span className="lg-sep">|</span>
              <span onClick={() => changeView(2)}>아이디 찾기</span>
              <span className="lg-sep">|</span>
              <span onClick={() => changeView(3)}>비밀번호 찾기</span>
            </div>
          </div>
        )}

        {/* 1. 회원가입 화면 */}
        {view === 1 && (
          <div className="lg-body lg-scrollable">
            <form className="lg-form" onSubmit={handleRegister}>
              <div className="lg-field">
                <label className="lg-label">이름 <span className="lg-req">*</span></label>
                <input 
                  className="lg-input" 
                  placeholder="이름을 입력하세요" 
                  onChange={e => setRegForm({...regForm, name: e.target.value})} 
                />
              </div>
              <div className="lg-field">
                <label className="lg-label">아이디 <span className="lg-req">*</span></label>
                <div className="lg-input-row">
                  <input 
                    className="lg-input" 
                    placeholder="아이디 입력" 
                    onChange={e => {
                      setRegForm({...regForm, userId: e.target.value});
                      setIdCheckMsg({text:"", isSuccess:false});
                    }} 
                  />
                  <button type="button" className="lg-btn-outline-sm" onClick={checkDuplicate}>중복확인</button>
                </div>
                {idCheckMsg.text && (
                  <p className={idCheckMsg.isSuccess ? "lg-success-msg" : "lg-error-msg"}>{idCheckMsg.text}</p>
                )}
              </div>
              <div className="lg-field">
                <label className="lg-label">비밀번호 <span className="lg-req">*</span></label>
                <input 
                  className="lg-input" 
                  type="password" 
                  placeholder="비밀번호 입력" 
                  onChange={e => setRegForm({...regForm, pw: e.target.value})} 
                />
              </div>
              <div className="lg-field">
                <label className="lg-label">비밀번호 확인 <span className="lg-req">*</span></label>
                <input 
                  className={`lg-input ${regForm.pwConfirm && regForm.pw !== regForm.pwConfirm ? "lg-input-error" : ""}`}
                  type="password" 
                  placeholder="비밀번호 재입력" 
                  onChange={e => setRegForm({...regForm, pwConfirm: e.target.value})} 
                />
                {regForm.pwConfirm && regForm.pw !== regForm.pwConfirm && (
                  <p className="lg-error-msg">비밀번호가 일치하지 않습니다.</p>
                )}
                {regForm.pwConfirm && regForm.pw === regForm.pwConfirm && (
                  <p className="lg-success-msg">비밀번호가 일치합니다.</p>
                )}
              </div>
              <div className="lg-field">
                <label className="lg-label">생년월일 <span className="lg-req">*</span></label>
                <input className="lg-input" type="date" onChange={e => setRegForm({...regForm, birth: e.target.value})} />
              </div>
              <div className="lg-field">
                <label className="lg-label">휴대폰 번호 <span className="lg-req">*</span></label>
                <input className="lg-input" placeholder="010-1234-5678" onChange={e => setRegForm({...regForm, phone: e.target.value})} />
              </div>
              <div className="lg-field">
                <label className="lg-label">주소 (선택)</label>
                <input className="lg-input" placeholder="주소 입력" onChange={e => setRegForm({...regForm, addr: e.target.value})} />
              </div>
              <button type="submit" className="lg-btn-primary lg-mt-20">가입하기</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}