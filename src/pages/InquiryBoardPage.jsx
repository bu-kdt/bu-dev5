import React from "react";
import { HiOutlineSearch, HiOutlineLockClosed } from "react-icons/hi";
import "./InquiryBoardPage.css";

export default function InquiryBoardPage({ inquiries, onWrite, onSelectInquiry }) {
  return (
    /* ✅ 다른 게시판과 동일한 1100px 컨테이너 클래스 적용 */
    <div className="gl-board-container"> 
      
      {/* ✅ 중앙 정렬된 헤더 구조로 변경 */}
      <header className="gl-board-header">
        <h2>관리자 문의</h2>
        <p>문의사항을 남겨주시면 신속하게 답변드리겠습니다</p>
      </header>

      {/* ✅ 검색창과 버튼 위치/크기 통일 */}
      <div className="gl-board-controls">
        <div className="gl-board-search-box">
          <HiOutlineSearch className="gl-board-search-icon" />
          <input type="text" placeholder="문의 검색..." className="gl-board-search-input" />
        </div>
        <button className="gl-board-write-btn" onClick={onWrite}>
          문의하기
        </button>
      </div>

      {/* ✅ 테이블 카드 디자인 표준화 */}
      <div className="gl-board-table-card">
        <table className="gl-board-table">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>번호</th>
              <th style={{ width: "100px" }}>상태</th>
              <th>제목</th>
              <th style={{ width: "150px" }}>작성자</th>
              <th style={{ width: "100px" }}>조회</th>
              <th style={{ width: "120px" }}>날짜</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <span className={`gl-status-badge ${item.status === "완료" ? "is-complete" : "is-waiting"}`}>
                    {item.status || "대기"}
                  </span>
                </td>
                {/* 제목 클릭 시 상세보기 로직 유지 */}
                <td 
                  className="gl-td-title" 
                  onClick={() => onSelectInquiry(item.id)}
                >
                  <div className="gl-title-inner">
                    {item.isPrivate && <HiOutlineLockClosed className="gl-lock-icon" />}
                    <span className="gl-title-text">{item.title}</span>
                  </div>
                </td>
                <td>{item.author}</td>
                <td>{item.views || 0}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="gl-board-footer">
        전체 {inquiries.length}개의 문의 | 현재 1 / 1 페이지
      </footer>
    </div>
  );
}