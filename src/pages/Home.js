import React, { useMemo, useState, useRef } from "react";
import Header from "../components/Header";
import MegaMenu from "../components/MegaMenu";
import SearchBar from "../components/SearchBar";
import FilterView from "../components/FilterView";
import MapView from "../components/MapView";
import ResultView from "../components/ResultView";
import Bookmark from "../components/Bookmark";

import useHospitalResults from "../hooks/useHospitalResults";
import sampleHospitals from "../data/SampleHospitals";

export default function Home({ user, onLogout, onGoLogin, onGoHome }) {
  // ===== 메가메뉴 상태 =====
  const [activeMenu, setActiveMenu] = useState(null);
  const [showMega, setShowMega] = useState(false);

  // ===== 지도 제어용 ref =====
  const mapRef = useRef(null);

  const handleMoveToMyLocation = () => {
    if (mapRef.current) {
      mapRef.current.moveToMyLocation();
    }
  };

  // ===== 메뉴 구성 =====
  const menuItems = useMemo(
    () => [
      {
        label: "병원/응급실 찾기",
        href: "#",
        subItems: [
          { label: "하위 메뉴1", href: "#" },
          { label: "하위 메뉴2", href: "#" },
          { label: "하위 메뉴3", href: "#" },
        ],
      },
      {
        label: "메뉴2",
        href: "#",
        subItems: [
          { label: "하위 메뉴1", href: "#" },
          { label: "하위 메뉴2", href: "#" },
          { label: "하위 메뉴3", href: "#" },
        ],
      },
      {
        label: "메뉴3",
        href: "#",
        subItems: [
          { label: "하위 메뉴1", href: "#" },
          { label: "하위 메뉴2", href: "#" },
          { label: "하위 메뉴3", href: "#" },
        ],
      },
      {
        label: "메뉴4",
        href: "#",
        subItems: [
          { label: "하위 메뉴1", href: "#" },
          { label: "하위 메뉴2", href: "#" },
          { label: "하위 메뉴3", href: "#" },
        ],
      },
      {
        label: "공지사항",
        href: "#",
        subItems: [
          { label: "하위 메뉴1", href: "#" },
          { label: "하위 메뉴2", href: "#" },
          { label: "하위 메뉴3", href: "#" },
        ],
      },
    ],
    []
  );

  // ===== 검색 / 필터 / 북마크 로직 =====
  const {
    q,
    setQ,
    onlyOpen,
    setOnlyOpen,
    includeClothes,
    setIncludeClothes,
    radiusKm,
    setRadiusKm,
    sortMode,
    setSortMode,
    resetFilters,
    filtered,
    bookmarkOpen,
    setBookmarkOpen,
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  } = useHospitalResults({ hospitals: sampleHospitals, user });

  return (
    <div className="gl-page">
      <header className="gl-header">
        <div className="gl-header-inner">
          <Header
            user={user}
            onLogout={onLogout}
            onGoLogin={onGoLogin}
            onGoHome={onGoHome}
            onOpenBookmark={() => setBookmarkOpen(true)}
          />

          <MegaMenu
            menuItems={menuItems}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            showMega={showMega}
            setShowMega={setShowMega}
          />
        </div>
      </header>

      <Bookmark
        open={bookmarkOpen && !!user}
        onClose={() => setBookmarkOpen(false)}
        bookmarks={bookmarks}
        onRemove={removeBookmark}
      />

      <SearchBar q={q} setQ={setQ} />

      <main className="gl-main">
        <FilterView
          onlyOpen={onlyOpen}
          setOnlyOpen={setOnlyOpen}
          includeClothes={includeClothes}
          setIncludeClothes={setIncludeClothes}
          radiusKm={radiusKm}
          setRadiusKm={setRadiusKm}
          onReset={resetFilters}
          onMoveToMyLocation={handleMoveToMyLocation}  /* ⭐ 여기 연결됨 */
        />

        <MapView ref={mapRef} />  {/* ⭐ 여기 ref 연결 */}

        <ResultView
          user={user}
          items={filtered}
          sortMode={sortMode}
          onToggleSort={() =>
            setSortMode((prev) => (prev === "추천" ? "거리" : "추천"))
          }
          isBookmarked={isBookmarked}
          onAddBookmark={addBookmark}
          onRemoveBookmark={removeBookmark}
        />
      </main>
    </div>
  );
}
