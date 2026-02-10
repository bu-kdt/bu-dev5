import React, { useMemo, useState, useRef } from "react";
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
import InquiryBoardWritePostPage from "./InquiryBoardWritePostPage"; 
import InquiryPostDetailPage from "./InquiryPostDetailPage"; 

// ✅ 공지사항 관련 페이지 임포트
import NoticeBoardWritePostPage from "./NoticeBoardWritePostPage";
import NoticeBoardDetailPage from "./NoticeBoardDetailPage";

// 스타일 임포트
import "../styles/components.css";

import useHospitalResults from "../hooks/useHospitalResults";
import sampleHospitals from "../data/SampleHospitals";

export default function Home({ user, onLogout, onGoLogin, onGoHome }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showMega, setShowMega] = useState(false);

  const mapRef = useRef(null);
  const handleMoveToMyLocation = () => {
    if (mapRef.current) {
      mapRef.current.moveToMyLocation();
    }
  };
  
  // ✅ 화면 모드 및 게시글 상태 관리
  const [viewMode, setViewMode] = useState("search");
  const [selectedPostId, setSelectedPostId] = useState(null);

  // ✅ 1. 정보공유 게시판 데이터 상태 (댓글 실시간 연동)
  const [posts, setPosts] = useState([
    { id: 1, title: "병원 예약 시 유용한 팁 공유합니다", content: "진료 전 미리 문진표를 작성해두세요.", comments: [], author: "user123", views: 342, likes: 45, date: "02-07" },
    { id: 2, title: "강남구 소아과 추천 부탁드립니다", content: "밤 9시까지 하는 곳 아시는 분?", comments: [], author: "parent_mom", views: 189, likes: 23, date: "02-06" },
    { id: 3, title: "건강검진 후기 - 서울대학교병원", content: "시설이 정말 깨끗하고 시스템이 체계적입니다.", comments: [], author: "healthy_life", views: 456, likes: 67, date: "02-05" },
    { id: 4, title: "야간 진료 가능한 병원 정보 공유", content: "강남권역 24시간 진료 리스트입니다.", comments: [], author: "nightworker", views: 523, likes: 89, date: "02-04" },
  ]);

  // ✅ 2. 관리자 문의 게시판 데이터 상태 (상세 내용 및 답변 필드 보존)
  const [inquiries, setInquiries] = useState([
    { id: 1, status: "완료", title: "비밀번호를 잊어버렸어요", content: "로그인 비밀번호를 찾을 수가 없습니다.", author: "김철수", date: "02-09", isPrivate: true, views: 5, reply: "비밀번호가 초기화되었습니다." },
    { id: 2, status: "대기", title: "예약 시스템 오류 문의", content: "병원 예약 버튼이 작동하지 않습니다.", author: "이영희", date: "02-08", isPrivate: false, views: 12, reply: null },
  ]);

  // ✅ 3. 공지사항 데이터 상태 (상단 고정 기능 포함)
  const [notices, setNotices] = useState([
    { id: 101, title: "2024년 겨울철 응급실 운영시간 안내", content: "운영시간 안내 내용입니다.", author: "root", views: 1245, date: "02-01", isPinned: true },
    { id: 102, title: "[중요] 개인정보 처리방침 변경 안내", content: "처리방침 변경 안내입니다.", author: "root", views: 892, date: "01-28", isPinned: true },
    { id: 1, title: "AED(자동심장충격기) 위치 안내", content: "AED 위치 안내 내용입니다.", author: "root", views: 567, date: "01-25", isPinned: false },
    { id: 2, title: "설 연휴 진료 일정 안내", content: "연휴 진료 일정 내용입니다.", author: "root", views: 1834, date: "01-20", isPinned: false },
  ]);

  // 병원 검색 필터 및 결과창 토글 상태 (기존 로직 유지)
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
    else if (label === "공지사항" || label === "전체 공지") {
      setSelectedPostId(null);
      setViewMode("notice");
    }
    else if (label === "정보공유 게시판") {
      setSelectedPostId(null);
      setViewMode("infoBoard");
    }
    else if (label === "관리자 문의 게시판") {
      setSelectedPostId(null);
      setViewMode("inquiryBoard");
    }
    else if (label === "행동원칙") setViewMode("principles");
    else if (label === "상황별 처치") setViewMode("situation");
    else if (label === "AED 사용법") setViewMode("aedGuide");
    else if (label === "AED 사용설명 동영상") setViewMode("aedVideo");
    setShowMega(false);
  };

  // ✅ 핸들러: 공지사항 생성
  const handleCreateNotice = (newNoticeData) => {
    const newNotice = {
      id: notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1,
      title: newNoticeData.title,
      content: newNoticeData.content,
      author: "root", 
      views: 0,
      date: new Date().toISOString().slice(5, 10),
      isPinned: newNoticeData.isPinned,
    };
    setNotices([newNotice, ...notices]);
    setViewMode("notice");
  };

  // ✅ 핸들러: 정보공유 게시글 생성
  const handleCreatePost = (newPostData) => {
    const newPost = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      title: newPostData.title,
      content: newPostData.content,
      author: user.name, 
      comments: [],
      views: 0,
      likes: 0,
      date: new Date().toISOString().slice(5, 10),
    };
    setPosts([newPost, ...posts]);
    setViewMode("infoBoard");
  };

  // ✅ 핸들러: 관리자 문의글 생성
  const handleCreateInquiry = (newInquiryData) => {
    const newInquiry = {
      id: inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1,
      title: newInquiryData.title,
      content: newInquiryData.content,
      author: user.name, 
      date: new Date().toISOString().slice(5, 10),
      isPrivate: newInquiryData.isPrivate,
      status: "대기",
      reply: null,
      views: 0
    };
    setInquiries([newInquiry, ...inquiries]);
    setViewMode("inquiryBoard");
  };

  // ✅ 핸들러: 게시글 선택
  const handleSelectPost = (post) => {
    setSelectedPostId(post.id);
    setViewMode("postDetail");
  };

  // ✅ 핸들러: 댓글 추가
  const handleAddComment = (postId, commentText) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, { id: Date.now(), author: user?.name || "guest", text: commentText, date: "방금 전" }] } : post
    ));
  };

  // ✅ 핸들러: 관리자 답변 등록
  const handleAdminReply = (inquiryId, replyText) => {
    setInquiries(prev => prev.map(item => 
      item.id === inquiryId ? { ...item, reply: replyText, status: "완료" } : item
    ));
    alert("답변이 등록되었습니다.");
    setViewMode("inquiryBoard");
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
          <Header user={user} onLogout={onLogout} onGoLogin={onGoLogin} onGoHome={() => { setViewMode("search"); onGoHome(); }} onOpenBookmark={() => setBookmarkOpen(true)} />
          <MegaMenu menuItems={menuItems} activeMenu={activeMenu} setActiveMenu={setActiveMenu} showMega={showMega} setShowMega={setShowMega} onMenuClick={handleMenuClick} />
        </div>
      </header>

      <Bookmark open={bookmarkOpen && !!user} onClose={() => setBookmarkOpen(false)} bookmarks={bookmarks} onRemove={removeBookmark} />
      
      {viewMode === "search" && <SearchBar q={q} setQ={setQ} />}

      {/* ✅ 조건부 렌더링 영역 (모든 요구사항 통합) */}
      {viewMode === "search" ? (
        <main className={`gl-main ${!isFilterOpen ? "is-filter-closed" : ""} ${!isResultOpen ? "is-result-closed" : ""}`}>
          {isFilterOpen ? (
            <FilterView onlyOpen={onlyOpen} setOnlyOpen={setOnlyOpen} includeClothes={includeClothes} setIncludeClothes={setIncludeClothes} radiusKm={radiusKm} setRadiusKm={setRadiusKm} onReset={resetFilters} onClose={() => setIsFilterOpen(false)} onMoveToMyLocation={handleMoveToMyLocation} />
          ) : (
            <button className="gl-open-toggle-btn gl-toggle-filter" onClick={() => setIsFilterOpen(true)}>› 필터</button>
          )}
          <MapView ref={mapRef} />
          {isResultOpen ? (
            <ResultView user={user} items={filtered} sortMode={sortMode} onToggleSort={() => setSortMode(p => p === "추천" ? "거리" : "추천")} isBookmarked={isBookmarked} onAddBookmark={addBookmark} onRemoveBookmark={removeBookmark} onClose={() => setIsResultOpen(false)} />
          ) : (
            <button className="gl-open-toggle-btn gl-toggle-result" onClick={() => setIsResultOpen(true)}>‹ 추천결과</button>
          )}
        </main>
      ) : viewMode === "intro" ? (
        <IntroducePage />
      ) : viewMode === "notice" ? (
        /* ✅ 공지사항 목록: 관리자 여부 전달 */
        <NoticePage 
          notices={notices} 
          isAdmin={user?.isAdmin} 
          onWrite={() => setViewMode("noticeWrite")} 
          onSelectNotice={(id) => { setSelectedPostId(id); setViewMode("noticeDetail"); }}
        />
      ) : viewMode === "noticeWrite" ? (
        /* ✅ 공지사항 작성 */
        <NoticeBoardWritePostPage onBack={() => setViewMode("notice")} onCreateNotice={handleCreateNotice} />
      ) : viewMode === "noticeDetail" ? (
        /* ✅ 공지사항 상세 */
        <NoticeBoardDetailPage 
          post={notices.find(n => n.id === selectedPostId)} 
          onBack={() => setViewMode("notice")} 
        />
      ) : viewMode === "infoBoard" ? (
        <InfoBoardPage 
          posts={posts} 
          onWrite={() => {
            if (!user) { alert("로그인이 필요합니다."); onGoLogin(); return; }
            setViewMode("writePost");
          }} 
          onSelectPost={handleSelectPost} 
        />
      ) : viewMode === "writePost" ? (
        <BoardWritePostPage onBack={() => setViewMode("infoBoard")} user={user} onCreatePost={handleCreatePost} />
      ) : viewMode === "postDetail" ? (
        <PostDetailPage post={posts.find(p => p.id === selectedPostId)} onBack={() => setViewMode("infoBoard")} onAddComment={handleAddComment} />
      ) : viewMode === "inquiryBoard" ? (
        <InquiryBoardPage 
          inquiries={inquiries} 
          onWrite={() => {
            if (!user) { alert("문의하기는 로그인 후 가능합니다."); onGoLogin(); return; }
            setViewMode("inquiryWrite");
          }} 
          onSelectInquiry={(id) => { setSelectedPostId(id); setViewMode("inquiryDetail"); }}
        />
      ) : viewMode === "inquiryWrite" ? (
        <InquiryBoardWritePostPage onBack={() => setViewMode("inquiryBoard")} user={user} onCreateInquiry={handleCreateInquiry} />
      ) : viewMode === "inquiryDetail" ? (
        <InquiryPostDetailPage 
          post={inquiries.find(i => i.id === selectedPostId)} 
          onBack={() => setViewMode("inquiryBoard")} 
          user={user} 
          onAdminReply={handleAdminReply} 
        />
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