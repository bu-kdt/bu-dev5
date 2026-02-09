import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import MegaMenu from "../components/MegaMenu";
import SearchBar from "../components/SearchBar";
import FilterView from "../components/FilterView";
import MapView from "../components/MapView";
import ResultView from "../components/ResultView";
import Bookmark from "../components/Bookmark";

// 페이지 컴포넌트 임포트
import IntroducePage from "./IntroducePage";
import NoticePage from "./NoticePage";
import InfoBoardPage from "./InfoBoardPage";
import InquiryBoardPage from "./InquiryBoardPage";
import EmergencyPrinciplesPage from "./EmergencyPrinciplesPage";
import SituationFirstAidPage from "./SituationFirstAidPage";
import AEDGuidePage from "./AEDGuidePage";
import AEDVideoPage from "./AEDVideoPage";
import BoardWritePostPage from "./BoardWritePostPage"; 
import PostDetailPage from "./PostDetailPage"; 

// 스타일 임포트
import "../styles/components.css";

import useHospitalResults from "../hooks/useHospitalResults";
import sampleHospitals from "../data/SampleHospitals";

export default function Home({ user, onLogout, onGoLogin, onGoHome }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showMega, setShowMega] = useState(false);
  
  // ✅ 화면 모드 및 게시글 관리 상태
  const [viewMode, setViewMode] = useState("search");
  const [selectedPostId, setSelectedPostId] = useState(null); // ID로 관리하여 데이터 동기화 유지

  // ✅ 게시글 데이터를 Home에서 상태로 관리 (댓글 실시간 연동을 위함)
  const [posts, setPosts] = useState([
    { id: 1, title: "병원 예약 시 유용한 팁 공유합니다", content: "진료 전 미리 문진표를 작성해두세요.", comments: [], author: "user123", views: 342, likes: 45, date: "02-07" },
    { id: 2, title: "강남구 소아과 추천 부탁드립니다", content: "밤 9시까지 하는 곳 아시는 분?", comments: [], author: "parent_mom", views: 189, likes: 23, date: "02-06" },
    { id: 3, title: "건강검진 후기 - 서울대학교병원", content: "시설이 정말 깨끗하고 시스템이 체계적입니다.", comments: [], author: "healthy_life", views: 456, likes: 67, date: "02-05" },
    { id: 4, title: "야간 진료 가능한 병원 정보 공유", content: "강남권역 24시간 진료 리스트입니다.", comments: [], author: "nightworker", views: 523, likes: 89, date: "02-04" },
  ]);

  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isResultOpen, setIsResultOpen] = useState(true);

  const {
    q, setQ, onlyOpen, setOnlyOpen, includeClothes, setIncludeClothes,
    radiusKm, setRadiusKm, sortMode, setSortMode, resetFilters,
    filtered, bookmarkOpen, setBookmarkOpen, bookmarks, addBookmark, removeBookmark, isBookmarked,
  } = useHospitalResults({ hospitals: sampleHospitals, user });

  // ✅ 메뉴 클릭 핸들러
  const handleMenuClick = (label) => {
    if (label === "소개글" || label === "서비스 소개") setViewMode("intro");
    else if (label === "병원/응급실 찾기" || label === "실시간 검색") setViewMode("search");
    else if (label === "공지사항" || label === "전체 공지") setViewMode("notice");
    else if (label === "정보공유 게시판") {
      setSelectedPostId(null);
      setViewMode("infoBoard");
    }
    else if (label === "관리자 문의 게시판") setViewMode("inquiryBoard");
    else if (label === "행동원칙") setViewMode("principles");
    else if (label === "상황별 처치") setViewMode("situation");
    else if (label === "AED 사용법") setViewMode("aedGuide");
    else if (label === "AED 사용설명 동영상") setViewMode("aedVideo");
    setShowMega(false);
  };

  // ✅ 게시글 선택 핸들러
  const handleSelectPost = (post) => {
    setSelectedPostId(post.id);
    setViewMode("postDetail");
  };

  // ✅ 댓글 추가 핸들러: 상세페이지에서 호출 시 전체 데이터 업데이트
  const handleAddComment = (postId, commentText) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: [
              ...post.comments, 
              { id: Date.now(), author: user?.userid || "guest", text: commentText, date: "방금 전" }
            ] 
          } 
        : post
    ));
  };

  const menuItems = useMemo(() => [
    { label: "소개글", href: "#", subItems: [{ label: "서비스 소개", href: "#" }] },
    { label: "병원/응급실 찾기", href: "#", subItems: [{ label: "실시간 검색", href: "#" }] },
    { label: "응급처치 요령", href: "#", subItems: [{ label: "행동원칙", href: "#" }, { label: "상황별 처치", href: "#" }] },
    { label: "AED", href: "#", subItems: [{ label: "AED 사용법", href: "#" }, { label: "AED 사용설명 동영상", href: "#" }] },
    { label: "게시판", href: "#", subItems: [{ label: "정보공유 게시판", href: "#" }, { label: "관리자 문의 게시판", href: "#" }] },
    { label: "공지사항", href: "#", subItems: [{ label: "전체 공지", href: "#" }] },
  ], []);

  return (
    <div className="gl-page">
      <header className="gl-header">
        <div className="gl-header-inner">
          <Header 
            user={user} onLogout={onLogout} onGoLogin={onGoLogin} 
            onGoHome={() => { setViewMode("search"); onGoHome(); }} 
            onOpenBookmark={() => setBookmarkOpen(true)} 
          />
          <MegaMenu 
            menuItems={menuItems} activeMenu={activeMenu} setActiveMenu={setActiveMenu} 
            showMega={showMega} setShowMega={setShowMega} 
            onMenuClick={handleMenuClick} 
          />
        </div>
      </header>

      <Bookmark open={bookmarkOpen && !!user} onClose={() => setBookmarkOpen(false)} bookmarks={bookmarks} onRemove={removeBookmark} />
      
      {viewMode === "search" && <SearchBar q={q} setQ={setQ} />}

      {/* 조건부 렌더링 영역 */}
      {viewMode === "search" ? (
        <main className={`gl-main ${!isFilterOpen ? "is-filter-closed" : ""} ${!isResultOpen ? "is-result-closed" : ""}`}>
          {isFilterOpen ? (
            <FilterView onlyOpen={onlyOpen} setOnlyOpen={setOnlyOpen} includeClothes={includeClothes} setIncludeClothes={setIncludeClothes} radiusKm={radiusKm} setRadiusKm={setRadiusKm} onReset={resetFilters} onClose={() => setIsFilterOpen(false)} />
          ) : (
            <button className="gl-open-toggle-btn gl-toggle-filter" onClick={() => setIsFilterOpen(true)}>› 필터</button>
          )}
          <MapView />
          {isResultOpen ? (
            <ResultView user={user} items={filtered} sortMode={sortMode} onToggleSort={() => setSortMode(p => p === "추천" ? "거리" : "추천")} isBookmarked={isBookmarked} onAddBookmark={addBookmark} onRemoveBookmark={removeBookmark} onClose={() => setIsResultOpen(false)} />
          ) : (
            <button className="gl-open-toggle-btn gl-toggle-result" onClick={() => setIsResultOpen(true)}>‹ 추천결과</button>
          )}
        </main>
      ) : viewMode === "intro" ? (
        <IntroducePage />
      ) : viewMode === "notice" ? (
        <NoticePage /> 
      ) : viewMode === "infoBoard" ? (
        /* ✅ posts 상태를 직접 전달하여 댓글 수 연동 */
        <InfoBoardPage 
          posts={posts} 
          onWrite={() => setViewMode("writePost")} 
          onSelectPost={handleSelectPost} 
        />
      ) : viewMode === "writePost" ? (
        <BoardWritePostPage onBack={() => setViewMode("infoBoard")} user={user} />
      ) : viewMode === "postDetail" ? (
        /* ✅ 선택된 ID에 해당하는 최신 포스트 데이터를 찾아 전달 */
        <PostDetailPage 
          post={posts.find(p => p.id === selectedPostId)} 
          onBack={() => setViewMode("infoBoard")} 
          onAddComment={handleAddComment} 
        />
      ) : viewMode === "inquiryBoard" ? (
        <InquiryBoardPage />
      ) : viewMode === "principles" ? (
        <EmergencyPrinciplesPage />
      ) : viewMode === "aedGuide" ? (
        <AEDGuidePage />
      ) : viewMode === "aedVideo" ? (
        <AEDVideoPage />
      ) : (
        <SituationFirstAidPage /> 
      )}
    </div>
  );
}