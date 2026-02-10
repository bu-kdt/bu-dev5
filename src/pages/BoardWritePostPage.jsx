import React, { useState } from "react";
import { HiXMark, HiOutlineCloudArrowUp } from "react-icons/hi2"; 
import "./BoardWritePostPage.css";

export default function BoardWritePostPage({ onBack, user, onCreatePost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleRegister = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    // 등록 시에도 이름을 함께 넘겨줍니다.
    onCreatePost({ title, content });
  };

  return (
    <div className="gl-write-container">
      <div className="gl-write-card">
        <header className="gl-write-header">
          <h2>글쓰기</h2>
          <button className="gl-close-btn" onClick={onBack}>
            <HiXMark />
          </button>
        </header>

        <main className="gl-write-body">
          <div className="gl-input-group">
            <label>작성자</label>
            <input 
              type="text" 
              // ✅ userid 대신 name으로 수정했습니다.
              value={user?.name || ""} 
              readOnly 
              className="gl-input-read" 
            />
          </div>

          <div className="gl-input-group">
            <label>제목</label>
            <input 
              type="text" 
              placeholder="제목을 입력하세요" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="gl-input-group">
            <label>내용</label>
            <textarea 
              placeholder="내용을 입력하세요" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="gl-input-group">
            <label>사진 첨부</label>
            <div className="gl-file-upload-zone">
              <HiOutlineCloudArrowUp className="gl-upload-icon" />
              <p>이미지를 클릭하거나 드래그하여 업로드</p>
              <span>PNG, JPG, GIF (최대 5MB)</span>
            </div>
          </div>
        </main>

        <footer className="gl-write-footer">
          <button className="gl-btn-cancel" onClick={onBack}>취소</button>
          <button className="gl-btn-submit" onClick={handleRegister}>
            등록하기
          </button>
        </footer>
      </div>
    </div>
  );
}