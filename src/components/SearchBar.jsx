import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6"; // [수정] 아이콘 임포트 추가
import "./SearchBar.css";

export default function SearchBar({ q, setQ }) {
  return (
    <section className="gl-searchBarWrap">
      <div className="gl-searchBar">
        {/* 왼쪽 셀렉트 박스 영역 */}
        <select className="gl-searchSelect">
          <option>전체</option>
          <option>병원명</option>
          <option>지역</option>
        </select>
        
        {/* 중앙 구분선 */}
        <div className="gl-searchDivider" />
        
        {/* 오른쪽 입력 영역 */}
        <div className="gl-searchInputInner">
          {/* [수정] 텍스트 이모지를 FaMagnifyingGlass 컴포넌트로 변경 */}
          <FaMagnifyingGlass className="gl-searchIcon" />
          <input
            className="gl-searchInput"
            placeholder="병원명/지역/주소 검색"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}