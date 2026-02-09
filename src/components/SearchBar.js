import React from "react";

export default function SearchBar({ q, setQ }) {
  return (
    <section className="gl-searchBarWrap">
      <div className="gl-searchBar">
        <span className="gl-searchIcon" aria-hidden="true">
          🔍
        </span>
        <input
          className="gl-searchInput"
          placeholder="병원명/지역/주소 검색"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
    </section>
  );
}
