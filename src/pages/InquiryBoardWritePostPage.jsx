import React, { useState } from "react";
import { HiXMark, HiOutlineCloudArrowUp, HiOutlineLockClosed } from "react-icons/hi2"; 
import "./InquiryBoardWritePostPage.css";

export default function InquiryBoardWritePostPage({ onBack, user, onCreateInquiry }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false); // 비밀글 설정 상태

  // 문의 등록 핸들러
  const handleRegister = () => {
    if (!title.trim() || !content.trim()) {
      alert("문의 제목과 내용을 모두 입력해주세요.");
      return;
    }
    // 부모 컴포넌트로 데이터 전달
    onCreateInquiry({ title, content, isPrivate });
  };

  return (
    <div className="gl-inquiry-write-container">
      <div className="gl-inquiry-write-card">
        {/* 상단 헤더: 타이틀 및 닫기 버튼 */}
        <header className="gl-inquiry-write-header">
          <h2>문의하기</h2>
          <button className="gl-close-btn" onClick={onBack}>
            <HiXMark />
          </button>
        </header>

        <main className="gl-inquiry-write-body">
          {/* 작성자: 사용자 이름 자동 적용 */}
          <div className="gl-input-group">
            <label>작성자</label>
            <input 
              type="text" 
              value={user?.name || ""} 
              readOnly 
              className="gl-input-read" 
            />
          </div>

          {/* 제목 입력 */}
          <div className="gl-input-group">
            <label>제목</label>
            <input 
              type="text" 
              placeholder="문의 제목을 입력하세요" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 내용 입력 */}
          <div className="gl-input-group">
            <label>내용</label>
            <textarea 
              placeholder="문의 내용을 자세히 작성해주세요" 
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

          {/* 비밀글 설정 옵션 */}
          <div className="gl-private-option">
            <label className="gl-checkbox-label">
              <input 
                type="checkbox" 
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <span className="gl-custom-checkbox"></span>
              <HiOutlineLockClosed className="gl-lock-icon" />
              비밀글로 작성
            </label>
          </div>

          {/* 안내 문구 박스 */}
          <div className="gl-inquiry-info-box">
            💡 답변은 평균 1-2일 내에 등록됩니다. 급한 문의사항은 고객센터(1577-0000)로 연락주세요.
          </div>
        </main>

        {/* 하단 버튼 영역 */}
        <footer className="gl-inquiry-write-footer">
          <button className="gl-btn-cancel" onClick={onBack}>취소</button>
          <button className="gl-btn-submit" onClick={handleRegister}>
            문의하기
          </button>
        </footer>
      </div>
    </div>
  );
}