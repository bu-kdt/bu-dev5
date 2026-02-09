import React from "react";

export default function MegaMenu({
  menuItems,
  activeMenu,
  setActiveMenu,
  showMega,
  setShowMega,
  onMenuClick, // Home.jsx에서 전달받은 화면 전환 함수
}) {
  return (
    <nav
      className="gl-nav"
      onMouseEnter={() => {
        setShowMega(true);
        if (activeMenu === null) setActiveMenu(0);
      }}
      onMouseLeave={() => {
        setShowMega(false);
        setActiveMenu(null);
      }}
    >
      <div className="gl-navRow">
        {menuItems.map((m, idx) => (
          <a
            key={idx}
            className={`gl-navItem ${activeMenu === idx ? "is-active" : ""}`}
            href={m.href}
            onMouseEnter={() => setActiveMenu(idx)}
            onClick={(e) => {
              e.preventDefault();
              onMenuClick(m.label); // 부모 메뉴 클릭 시 라벨 전달
            }}
          >
            {m.label}
          </a>
        ))}
      </div>

      {showMega && (
        <div className="gl-mega">
          <div className="gl-megaInner">
            {menuItems.map((m, idx) => (
              <div
                key={idx}
                className={`gl-megaCol ${activeMenu === idx ? "is-active" : ""}`}
                onMouseEnter={() => setActiveMenu(idx)}
              >
                <div className="gl-megaTitle">{m.label}</div>
                <div className="gl-megaList">
                  {m.subItems.map((s, sIdx) => (
                    <a
                      key={sIdx}
                      className="gl-megaLink"
                      href={s.href}
                      onClick={(e) => {
                        e.preventDefault();
                        // [수정] 부모 라벨(m.label) 대신 서브 메뉴 라벨(s.label)을 전달합니다.
                        onMenuClick(s.label); 
                      }}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}