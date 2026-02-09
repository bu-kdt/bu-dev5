import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { TiPin } from "react-icons/ti";
import "./NoticePage.css";

export default function NoticePage() {
  // 시안 기반 샘플 데이터
  const notices = [
    { id: 1, type: "pinned", title: "2024년 겨울철 응급실 운영시간 안내", author: "root", views: 1245, date: "02-01" },
    { id: 2, type: "pinned", title: "[중요] 개인정보 처리방침 변경 안내", author: "root", views: 892, date: "01-28" },
    { id: 3, type: "normal", no: 1, title: "AED(자동심장충격기) 위치 안내", author: "root", views: 567, date: "01-25" },
    { id: 4, type: "normal", no: 2, title: "설 연휴 진료 일정 안내", author: "root", views: 1834, date: "01-20" },
    { id: 5, type: "normal", no: 3, title: "병원 주차장 이용 안내", author: "root", views: 723, date: "01-15" },
    { id: 6, type: "normal", no: 4, title: "코로나19 검사 및 예방접종 안내", author: "root", views: 2103, date: "01-10" },
    { id: 7, type: "normal", no: 5, title: "진료과목 및 의료진 소개", author: "root", views: 445, date: "01-05" },
    { id: 8, type: "normal", no: 6, title: "신규 의료장비 도입 안내", author: "root", views: 656, date: "12-28" },
  ];

  return (
    <div className="gl-notice-page">
      <div className="gl-notice-header">
        <h2 className="gl-notice-title">공지사항</h2>
        <p className="gl-notice-subtitle">병원의 중요한 소식과 안내사항을 확인하세요</p>
      </div>

      <div className="gl-notice-search-container">
        <div className="gl-notice-search-box">
          <HiOutlineSearch className="gl-notice-search-icon" />
          <input type="text" placeholder="공지사항 검색..." className="gl-notice-search-input" />
        </div>
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
            {notices.map((n) => (
              <tr key={n.id} className={n.type === "pinned" ? "is-pinned" : ""}>
                <td>{n.type === "pinned" ? <TiPin className="gl-pin-icon" /> : n.no}</td>
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  {n.type === "pinned" && <span className="gl-notice-tag">공지</span>}
                  <span className="gl-title-text">{n.title}</span>
                </td>
                <td>{n.author}</td>
                <td>👁 {n.views}</td>
                <td>{n.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="gl-notice-footer">
        전체 {notices.length}개의 공지사항 | 현재 1 / 1 페이지
      </div>
    </div>
  );
}