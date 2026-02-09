import React from "react";
import { HiOutlineSearch, HiOutlineLockClosed } from "react-icons/hi";
import "./InquiryBoardPage.css";

export default function InquiryBoardPage() {
  // 시안 기반 샘플 데이터
  const inquiries = [
    { id: 1, status: "완료", title: "병원 정보 수정 요청", author: "hospital_manager", views: 5, date: "02-07", isPrivate: false },
    { id: 2, status: "완료", title: "회원 탈퇴 문의", author: "user456", views: 12, date: "02-06", isPrivate: true },
    { id: 3, status: "대기", title: "검색 기능 오류 제보", author: "tester123", views: 8, date: "02-05", isPrivate: false },
    { id: 4, status: "완료", title: "앱 버전도 개발 계획이 있나요?", author: "mobile_user", views: 23, date: "02-03", isPrivate: false },
  ];

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
        <button className="gl-inquiry-write-btn">문의하기</button>
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
                    {item.status}
                  </span>
                </td>
                <td className="gl-td-title">
                  <div className="gl-title-inner">
                    {item.isPrivate && <HiOutlineLockClosed className="gl-lock-icon" />}
                    <span className="gl-title-text">{item.title}</span>
                  </div>
                </td>
                <td className="gl-td-author">{item.author}</td>
                <td className="gl-td-views">{item.views}</td>
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