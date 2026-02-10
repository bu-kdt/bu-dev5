import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { TiPin } from "react-icons/ti";
import "./NoticePage.css";

// ✅ Home.jsx에서 데이터와 함수들을 프롭스로 받아옵니다.
export default function NoticePage({ notices, isAdmin, onWrite, onSelectNotice }) {
  return (
    <div className="gl-notice-page">
      <div className="gl-notice-header">
        <h2 className="gl-notice-title">공지사항</h2>
        <p className="gl-notice-subtitle">병원의 중요한 소식과 안내사항을 확인하세요</p>
      </div>

      {/* 검색창 및 관리자 글쓰기 버튼 영역 */}
      <div className="gl-notice-search-container" style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
        <div className="gl-notice-search-box" style={{ flex: 1, maxWidth: '800px' }}>
          <HiOutlineSearch className="gl-notice-search-icon" />
          <input type="text" placeholder="공지사항 검색..." className="gl-notice-search-input" />
        </div>
        
        {/* ✅ 핵심 1: 관리자(isAdmin) 계정으로 로그인했을 때만 글쓰기 버튼이 보입니다. */}
        {isAdmin && (
          <button className="gl-notice-write-btn" onClick={onWrite}>
            글쓰기
          </button>
        )}
      </div>

      <div className="gl-notice-table-card">
        <table className="gl-notice-table">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>번호</th>
              <th>제목</th>
              <th style={{ width: "120px" }}>작성자</th>
              <th style={{ width: "100px" }}>조회수</th>
              <th style={{ width: "100px" }}>날짜</th>
            </tr>
          </thead>
          <tbody>
            {/* ✅ Home.jsx의 실시간 데이터를 기반으로 리스트를 생성합니다. */}
            {notices && notices.map((n) => (
              <tr key={n.id} className={n.isPinned ? "is-pinned" : ""}>
                <td className="gl-td-no">
                  {n.isPinned ? <TiPin className="gl-pin-icon" /> : n.id}
                </td>
                {/* ✅ 핵심 2: 제목 클릭 시 상세 페이지(onSelectNotice)로 이동합니다. */}
                <td 
                  style={{ textAlign: "left", paddingLeft: "20px", cursor: "pointer" }} 
                  onClick={() => onSelectNotice(n.id)}
                >
                  <div className="gl-title-inner">
                    {n.isPinned && <span className="gl-notice-tag">공지</span>}
                    <span className="gl-title-text">{n.title}</span>
                  </div>
                </td>
                <td>{n.author}</td>
                <td>{n.views}</td>
                <td>{n.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="gl-notice-footer">
        전체 {notices?.length || 0}개의 공지사항 | 현재 1 / 1 페이지
      </div>
    </div>
  );
}