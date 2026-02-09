import React, { useState } from "react";
import { HiXMark } from "react-icons/hi2"; // 닫기 아이콘
import { HiOutlineCloudArrowUp } from "react-icons/hi2"; // 업로드 아이콘
import "./BoardWritePostPage.css";

export default function BoardWritePostPage({ onBack, user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="gl-write-container">
      <div className="gl-write-card">
        {/* 상단 헤더: 제목 및 닫기 버튼 */}
        <header className="gl-write-header">
          <h2>글쓰기</h2>
          <button className="gl-close-btn" onClick={onBack}>
            <HiXMark />
          </button>
        </header>

        <main className="gl-write-body">
          {/* 작성자: 시안의 'bu' 계정 반영 */}
          <div className="gl-input-group">
            <label>작성자</label>
            <input 
              type="text" 
              value={user?.userid || "bu"} 
              readOnly 
              className="gl-input-read" 
            />
          </div>

          {/* 제목 입력 */}
          <div className="gl-input-group">
            <label>제목</label>
            <input 
              type="text" 
              placeholder="제목을 입력하세요" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 내용 입력 */}
          <div className="gl-input-group">
            <label>내용</label>
            <textarea 
              placeholder="내용을 입력하세요" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          {/* 사진 첨부 영역 */}
          <div className="gl-input-group">
            <label>사진 첨부</label>
            <div className="gl-file-upload-zone">
              <HiOutlineCloudArrowUp className="gl-upload-icon" />
              <p>이미지를 클릭하거나 드래그하여 업로드</p>
              <span>PNG, JPG, GIF (최대 5MB)</span>
            </div>
          </div>
        </main>

        {/* 하단 버튼 영역 */}
        <footer className="gl-write-footer">
          <button className="gl-btn-cancel" onClick={onBack}>취소</button>
          <button className="gl-btn-submit">등록하기</button>
        </footer>
      </div>
    </div>
  );
}