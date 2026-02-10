import React, { useState } from "react";
import { HiOutlineCloudArrowUp, HiOutlineChevronLeft } from "react-icons/hi2";
import { BsPinAngleFill } from "react-icons/bs";
import "./NoticeBoardWritePostPage.css";

export default function NoticeBoardWritePostPage({ onBack, onCreateNotice }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false); // 상단 고정 여부

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    onCreateNotice({ title, content, isPinned });
  };

  return (
    <div className="gl-notice-write-container">
      <header className="gl-notice-write-header">
        <h1>공지사항 작성</h1>
      </header>

      <div className="gl-notice-write-card">
        {/* 작성자: 관리자로 고정 */}
        <div className="gl-write-field">
          <label>작성자</label>
          <input type="text" value="관리자 (Admin)" readOnly className="gl-read-only-input" />
        </div>

        <div className="gl-write-field">
          <label>제목</label>
          <input 
            type="text" 
            placeholder="제목을 입력하세요" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="gl-write-field">
          <label>내용</label>
          <textarea 
            placeholder="내용을 입력하세요" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 사진 첨부 영역 */}
        <div className="gl-write-field">
          <label>사진 첨부</label>
          <div className="gl-file-upload-zone">
            <HiOutlineCloudArrowUp className="gl-upload-icon" />
            <p>이미지를 클릭하거나 드래그하여 업로드</p>
            <span>PNG, JPG, GIF (최대 5MB)</span>
          </div>
        </div>

        {/* 상단 고정 옵션 */}
        <div className="gl-pin-option">
          <label className="gl-checkbox-label">
            <input 
              type="checkbox" 
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
            />
            <span className="gl-custom-checkbox"></span>
            <BsPinAngleFill className="gl-pin-icon" /> 상단 고정
          </label>
        </div>

        <footer className="gl-write-footer">
          <button className="gl-btn-cancel" onClick={onBack}>취소</button>
          <button className="gl-btn-submit" onClick={handleSubmit}>작성하기</button>
        </footer>
      </div>
    </div>
  );
}