import React, { useState } from "react";
import { 
  HiOutlineUserCircle, 
  HiOutlineClock, 
  HiOutlineChevronLeft,
  HiOutlineChatBubbleLeftRight // 댓글 아이콘 추가
} from "react-icons/hi2";
import "./PostDetailPage.css";

export default function PostDetailPage({ post, onBack, onAddComment }) {
  const [commentInput, setCommentInput] = useState("");

  // ✅ 댓글 등록 핸들러
  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    
    // Home.jsx의 handleAddComment 호출
    onAddComment(post.id, commentInput); 
    setCommentInput(""); // 입력창 초기화
  };

  if (!post) return null;

  return (
    <div className="gl-post-detail-container">
      {/* 상단 네비게이션: 목록으로 이동 */}
      <button className="gl-back-btn" onClick={onBack}>
        <HiOutlineChevronLeft /> 목록으로 돌아가기
      </button>

      <article className="gl-post-card">
        {/* 1. 게시글 헤더 영역 */}
        <header className="gl-post-header">
          <h1 className="gl-post-title">{post.title}</h1>
          <div className="gl-post-meta">
            <span className="gl-meta-item"><HiOutlineUserCircle /> {post.author}</span>
            <span className="gl-meta-item"><HiOutlineClock /> 2026-{post.date}</span>
            <span className="gl-meta-item">조회 {post.views}</span>
            <span className="gl-meta-item is-red">추천 {post.likes}</span>
          </div>
        </header>

        {/* 2. 게시글 본문 영역 */}
        <main className="gl-post-content">
          {post.content}
        </main>

        {/* 3. 추천 버튼 영역 */}
        <footer className="gl-post-footer">
          <button className="gl-like-btn">❤️ 이 글 추천하기</button>
        </footer>

        {/* 4. 댓글 섹션 (신규 추가) */}
        <section className="gl-comment-section">
          <div className="gl-comment-header">
            <HiOutlineChatBubbleLeftRight />
            <h3>댓글 <span>{post.comments.length}</span></h3>
          </div>
          
          {/* 댓글 입력 영역 */}
          <div className="gl-comment-input-wrap">
            <textarea 
              placeholder="게시글에 대한 따뜻한 댓글을 남겨주세요." 
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button onClick={handleCommentSubmit} className="gl-comment-submit-btn">
              등록
            </button>
          </div>

          {/* 댓글 리스트 영역 */}
          <div className="gl-comment-list">
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="gl-comment-item">
                  <div className="gl-comment-info">
                    <span className="gl-comment-author">{comment.author}</span>
                    <span className="gl-comment-date">{comment.date}</span>
                  </div>
                  <p className="gl-comment-text">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="gl-no-comments">첫 번째 댓글을 남겨보세요!</p>
            )}
          </div>
        </section>
      </article>
    </div>
  );
}