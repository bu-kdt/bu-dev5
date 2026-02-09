import React from "react";

export default function Bookmark({ open, onClose, bookmarks, onRemove }) {
  if (!open) return null;

  return (
    <div className="gl-bmView" role="dialog" aria-modal="true" aria-label="즐겨찾기">
      <button className="gl-bmBackdrop" type="button" onClick={onClose} aria-label="즐겨찾기 닫기" />

      <div className="gl-bmCard">
        <div className="gl-bmCardHead">
          <div className="gl-bmCardTitle">즐겨찾기</div>
          <button className="gl-bmCloseBtn" type="button" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <div className="gl-bmCardBody">
          {bookmarks.length === 0 ? (
            <div className="gl-bmEmpty">
              아직 즐겨찾기가 없습니다.<br />
              오른쪽 결과 카드에서 <b>“즐겨찾기 추가”</b>를 눌러보세요.
            </div>
          ) : (
            <div className="gl-bmList">
              {bookmarks.map((b) => (
                <div className="gl-bmItem" key={b.id}>
                  <div className="gl-bmTop">
                    <div className="gl-bmName">{b.name}</div>
                    <div className="gl-bmDist">{b.distanceKm}km</div>
                  </div>

                  <div className="gl-bmMeta">{b.addr}</div>
                  <div className="gl-bmMeta2">📞 {b.phone} · 저장 {b.savedAt}</div>

                  <div className="gl-bmActions">
                    <button
                      type="button"
                      className="gl-btn gl-btnOutline gl-btnSmall"
                      onClick={() => alert(`지도 이동/길찾기 연결(샘플): ${b.name}`)}
                    >
                      보기
                    </button>
                    <button
                      type="button"
                      className="gl-btn gl-btnGhost gl-btnSmall"
                      onClick={() => onRemove(b.hospitalId)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
