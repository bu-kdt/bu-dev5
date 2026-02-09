import React from "react";

export default function ResultView({
  user,
  items,
  sortMode,
  onToggleSort,
  isBookmarked,
  onAddBookmark,
  onRemoveBookmark,
}) {
  return (
    <aside className="gl-card gl-resultCard">
      <div className="gl-resultHeader">
        <div className="gl-resultTitle">
          추천 결과 <span className="gl-resultCount">({items.length})</span>
        </div>

        <button className="gl-sort" type="button" onClick={onToggleSort} title="정렬 방식 전환">
          <span className="gl-sortText">정렬 ({sortMode})</span>
        </button>
      </div>

      <div className="gl-resultList">
        {items.map((h, idx) => {
          const saved = isBookmarked(h.id);
          return (
            <div key={h.id} className="gl-resultItem">
              <div className="gl-resultTop">
                <div className="gl-rank">{idx + 1}</div>

                <div className="gl-resultMain">
                  <div className="gl-hName">{h.name}</div>
                  <div className="gl-hType">{h.type}</div>

                  <div className="gl-hBadges">
                    <span className={`gl-badge ${h.open ? "is-open" : "is-closed"}`}>
                      {h.open ? "운영중" : "휴진"}
                    </span>
                  </div>

                  <div className="gl-hMeta">
                    <div className="gl-metaRow">
                      <span className="gl-metaIco" aria-hidden="true">
                        📍
                      </span>
                      <span className="gl-metaText">{h.addr}</span>
                    </div>
                    <div className="gl-metaRow">
                      <span className="gl-metaIco" aria-hidden="true">
                        📞
                      </span>
                      <span className="gl-metaText">{h.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="gl-distance">{h.distanceKm}km</div>
              </div>

              <div className="gl-resultActions">
                <button
                  type="button"
                  className="gl-btn gl-btnOutline gl-btnSmall"
                  onClick={() => alert(`전화: ${h.phone}`)}
                >
                  <span className="gl-btnIco" aria-hidden="true">
                    📞
                  </span>
                  전화
                </button>

                <button
                  type="button"
                  className="gl-btn gl-btnPrimary gl-btnSmall"
                  onClick={() => alert(`진찰(샘플): ${h.name}`)}
                >
                  진찰 <span className="gl-arrow" aria-hidden="true">›</span>
                </button>

                <button
                  type="button"
                  className={`gl-btn gl-btnGhost gl-btnSmall ${saved ? "is-saved" : ""}`}
                  onClick={() => {
                    if (!user) {
                      alert("로그인 후 이용 가능합니다.");
                      return;
                    }
                    if (saved) onRemoveBookmark(h.id);
                    else onAddBookmark(h);
                  }}
                  title={saved ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                >
                  {saved ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                </button>
              </div>
            </div>
          );
        })}

        {items.length === 0 && <div className="gl-empty">검색/필터 조건에 맞는 결과가 없습니다.</div>}
      </div>
    </aside>
  );
}
