import React from "react";
import { HiOutlineSearch, HiOutlineLockClosed } from "react-icons/hi";
import "./InquiryBoardPage.css";

// ✅ Home.jsx에서 전달받는 onSelectInquiry 프롭스를 추가합니다
export default function InquiryBoardPage({ inquiries, onWrite, onSelectInquiry }) {
  return (
    <div className="gl-inquiry-page">
      {/* 상단 안내 문구 */}
      <div className="gl-inquiry-top-info">
        문의사항을 남겨주시면 신속하게 답변드리겠습니다
      </div>

      {/* 검색 및 문의하기 버튼 */}
      <header className="gl-inquiry-header">
        <div className="gl-inquiry-search-box">
          <HiOutlineSearch className="gl-inquiry-search-icon" />
          <input type="text" placeholder="문의 검색..." className="gl-inquiry-search-input" />
        </div>
        <button className="gl-inquiry-write-btn" onClick={onWrite}>
          문의하기
        </button>
      </header>

      {/* 테이블 영역 */}
      <div className="gl-inquiry-table-card">
        <table className="gl-inquiry-table">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>번호</th>
              <th style={{ width: "100px" }}>상태</th>
              <th>제목</th>
              <th style={{ width: "150px" }}>작성자</th>
              <th style={{ width: "100px" }}>조회</th>
              <th style={{ width: "100px" }}>날짜</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item) => (
              <tr key={item.id}>
                <td className="gl-td-no">{item.id}</td>
                <td className="gl-td-status">
                  <span className={`gl-status-badge ${item.status === "완료" ? "is-complete" : "is-waiting"}`}>
                    {item.status || "대기"}
                  </span>
                </td>
                {/* ✅ 제목 클릭 시 onSelectInquiry(item.id)를 실행하도록 수정했습니다 */}
                <td 
                  className="gl-td-title" 
                  onClick={() => onSelectInquiry(item.id)}
                  style={{ cursor: "pointer" }} 
                >
                  <div className="gl-title-inner">
                    {/* 비밀글 아이콘 표시 */}
                    {item.isPrivate && <HiOutlineLockClosed className="gl-lock-icon" />}
                    <span className="gl-title-text">{item.title}</span>
                  </div>
                </td>
                <td className="gl-td-author">{item.author}</td>
                <td className="gl-td-views">{item.views || 0}</td>
                <td className="gl-td-date">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="gl-inquiry-footer">
        전체 {inquiries.length}개의 문의 | 현재 1 / 1 페이지
      </footer>
    </div>
  );
}