import React from "react";
import { HiOutlineUserCircle, HiOutlineClock, HiOutlineChevronLeft } from "react-icons/hi2";
import "./NoticeBoardDetailPage.css";

export default function NoticeBoardDetailPage({ post, onBack }) {
  if (!post) return null;

  return (
    <div className="gl-notice-detail-container">
      <button className="gl-back-btn" onClick={onBack}>
        <HiOutlineChevronLeft /> 목록으로
      </button>

      <article className="gl-notice-card">
        <header className="gl-notice-header">
          {/* 상단 고정글인 경우 공지 배지 표시 */}
          {post.isPinned && <span className="gl-badge-notice">공지</span>}
          <h1 className="gl-notice-title">{post.title}</h1>
          
          <div className="gl-notice-meta">
            <span className="gl-meta-item"><HiOutlineUserCircle /> {post.author}</span>
            <span className="gl-meta-item"><HiOutlineClock /> {post.date}</span>
            <span className="gl-meta-item">조회 {post.views}</span>
          </div>
        </header>

        <main className="gl-notice-content">
          <div className="gl-content-body">
            {post.content}
          </div>
        </main>
      </article>
    </div>
  );
}