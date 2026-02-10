import React, { useState } from "react";
import { HiOutlineUserCircle, HiOutlineClock, HiOutlineChevronLeft, HiCheckCircle } from "react-icons/hi2";
import "./InquiryPostDetailPage.css";

export default function InquiryPostDetailPage({ post, onBack, user, onAdminReply }) {
  const [replyInput, setReplyInput] = useState("");

  // 1. 로그인 여부 체크: 로그아웃 상태면 상세 내용을 볼 수 없음
  if (!user) {
    return (
      <div className="gl-post-detail-container">
        <button className="gl-back-btn" onClick={onBack}>
          <HiOutlineChevronLeft /> 목록으로 돌아가기
        </button>
        <div className="gl-login-required-box">
          🔒 비밀글 및 문의 상세 내용은 로그인 후 확인 가능합니다.
        </div>
      </div>
    );
  }

  if (!post) return null;

  // 관리자 답변 등록 핸들러
  const handleReplySubmit = () => {
    if (!replyInput.trim()) return;
    // 부모(Home.jsx)의 함수를 호출하여 답변을 등록하고 상태를 '완료'로 변경
    onAdminReply(post.id, replyInput);
    setReplyInput("");
  };

  return (
    <div className="gl-post-detail-container">
      {/* 상단 네비게이션 */}
      <button className="gl-back-btn" onClick={onBack}>
        <HiOutlineChevronLeft /> 목록으로 돌아가기
      </button>

      <article className="gl-post-card">
        {/* 게시글 헤더: 상태 배지, 제목, 메타정보 */}
        <header className="gl-inquiry-header">
          <span className={`gl-status-badge ${post.status === "완료" ? "is-complete" : "is-waiting"}`}>
            {post.status === "완료" ? "답변완료" : "답변대기"}
          </span>
          <h1 className="gl-post-title">{post.title}</h1>
          <div className="gl-post-meta">
            <span className="gl-meta-item"><HiOutlineUserCircle /> {post.author}</span>
            <span className="gl-meta-item"><HiOutlineClock /> 2026-{post.date}</span>
            <span className="gl-meta-item">조회 {post.views || 0}</span>
          </div>
        </header>

        {/* 문의 내용 본문 */}
        <main className="gl-post-content">
          <div className="gl-content-label">문의 내용</div>
          <div className="gl-content-text">{post.content}</div>
        </main>

        {/* 관리자 답변 섹션 */}
        <footer className="gl-admin-section">
          {post.reply ? (
            /* 답변이 완료된 경우 표시되는 박스 */
            <div className="gl-reply-display-box">
              <div className="gl-reply-header">
                <span className="gl-reply-label"><HiCheckCircle /> 관리자 답변</span>
                <span className="gl-reply-date">2026-02-10</span>
              </div>
              <div className="gl-reply-content">{post.reply}</div>
            </div>
          ) : user?.isAdmin ? (
            /* 관리자이고 답변이 없는 경우에만 보이는 작성 양식 */
            <div className="gl-admin-reply-form">
              <div className="gl-reply-label">관리자 답변 작성</div>
              <textarea 
                placeholder="문의에 대한 답변을 입력해주세요."
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
              />
              <button className="gl-reply-submit-btn" onClick={handleReplySubmit}>
                답변 등록하기
              </button>
            </div>
          ) : (
            <div className="gl-waiting-msg">관리자의 답변을 기다리고 있습니다.</div>
          )}
        </footer>
      </article>
    </div>
  );
}