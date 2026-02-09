import React from "react";

export default function FilterView({
  onlyOpen,
  setOnlyOpen,
  includeClothes,
  setIncludeClothes,
  radiusKm,
  setRadiusKm,
  onReset,
}) {
  return (
    <aside className="gl-card gl-filterCard">
      <div className="gl-cardTitle">필터</div>

      <div className="gl-filterGroup">
        <label className="gl-check">
          <input type="checkbox" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)} />
          <span className="gl-checkBox" aria-hidden="true" />
          <span className="gl-checkText">운영중만</span>
        </label>

        <label className="gl-check">
          <input
            type="checkbox"
            checked={includeClothes}
            onChange={(e) => setIncludeClothes(e.target.checked)}
          />
          <span className="gl-checkBox" aria-hidden="true" />
          <span className="gl-checkText">의상센터</span>
        </label>
      </div>

      <div className="gl-divider" />

      <div className="gl-radioGroup">
        {[3, 5, 10].map((km) => (
          <label key={km} className="gl-radio">
            <input type="radio" name="radius" checked={radiusKm === km} onChange={() => setRadiusKm(km)} />
            <span className="gl-radioDot" aria-hidden="true" />
            <span className="gl-radioText">{km}km</span>
          </label>
        ))}
      </div>

      <div className="gl-filterBtns">
        <button className="gl-btn gl-btnOutline" onClick={() => alert("현재 위치 업데이트(샘플)")} type="button">
          현재 위치 업데이트
        </button>
        <button className="gl-btn gl-btnGhost" onClick={onReset} type="button">
          초기화
        </button>
      </div>
    </aside>
  );
}
