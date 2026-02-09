import { useMemo, useState } from "react";

export default function useHospitalResults({ hospitals, user }) {
  // Filters / UI state
  const [q, setQ] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(true);
  const [includeClothes, setIncludeClothes] = useState(false);
  const [radiusKm, setRadiusKm] = useState(10);
  const [sortMode, setSortMode] = useState("추천"); // 추천/거리

  // Bookmark state
  const [bookmarkOpen, setBookmarkOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    return hospitals
      .filter((h) => {
        if (onlyOpen && !h.open) return false;
        if (!includeClothes && h.category === "clothes") return false;
        if (h.distanceKm > radiusKm) return false;
        if (!keyword) return true;

        return (
          h.name.toLowerCase().includes(keyword) ||
          h.addr.toLowerCase().includes(keyword) ||
          h.type.toLowerCase().includes(keyword)
        );
      })
      .sort((a, b) => {
        if (sortMode === "거리") return a.distanceKm - b.distanceKm;
        if (a.open !== b.open) return a.open ? -1 : 1;
        return a.distanceKm - b.distanceKm;
      });
  }, [hospitals, q, onlyOpen, includeClothes, radiusKm, sortMode]);

  const resetFilters = () => {
    setQ("");
    setOnlyOpen(true);
    setIncludeClothes(false);
    setRadiusKm(10);
    setSortMode("추천");
  };

  const isBookmarked = (hospitalId) => bookmarks.some((b) => b.hospitalId === hospitalId);

  const addBookmark = (h) => {
    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    if (isBookmarked(h.id)) return;

    const item = {
      id: Date.now(),
      hospitalId: h.id,
      name: h.name,
      type: h.type,
      addr: h.addr,
      phone: h.phone,
      distanceKm: h.distanceKm,
      savedAt: new Date().toLocaleString(),
    };
    setBookmarks((prev) => [item, ...prev]);
  };

  const removeBookmark = (hospitalId) => {
    setBookmarks((prev) => prev.filter((b) => b.hospitalId !== hospitalId));
  };

  return {
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
  };
}

