import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import "./InfoBoardPage.css";

// posts를 부모(Home.jsx)로부터 프롭스로 전달받습니다.
export default function InfoBoardPage({ posts, onWrite, onSelectPost }) {
  return (
    <div className="gl-info-board-page">
      {/* 상단 검색 및 글쓰기 영역 */}
      <header className="gl-board-header">
        <div className="gl-board-search-box">
          <HiOutlineSearch className="gl-board-search-icon" />
          <input type="text" placeholder="게시글 검색..." className="gl-board-search-input" />
        </div>
        {/* ✅ 글쓰기 버튼 클릭 시 onWrite 실행 */}
        <button className="gl-board-write-btn" onClick={onWrite}>글쓰기</button>
      </header>

      {/* 게시판 테이블 영역 */}
      <div className="gl-board-table-card">
        <table className="gl-board-table">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>번호</th>
              <th>제목</th>
              <th style={{ width: "120px" }}>작성자</th>
              <th style={{ width: "100px" }}>조회</th>
              <th style={{ width: "100px" }}>추천</th>
              <th style={{ width: "100px" }}>날짜</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="gl-td-no">{p.id}</td>
                {/* ✅ 제목 클릭 시 상세 페이지 이동 */}
                <td className="gl-td-title" onClick={() => onSelectPost(p)}>
                  <span className="gl-title-text">{p.title}</span>
                  {/* ✅ 요청하신 (댓글수) 형식으로 표시 */}
                  <span className="gl-comment-count-text">
                    {p.comments.length > 0 && ` (${p.comments.length})`}
                  </span>
                </td>
                <td className="gl-td-author">{p.author}</td>
                <td className="gl-td-views">{p.views}</td>
                <td className="gl-td-likes">{p.likes}</td>
                <td className="gl-td-date">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 하단 정보 영역 */}
      <footer className="gl-board-footer">
        전체 {posts.length}개의 게시글 | 현재 1 / 1 페이지
      </footer>
    </div>
  );
}