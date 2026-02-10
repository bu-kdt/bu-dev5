import React from "react";

export default function MegaMenu({
  menuItems,
  activeMenu,
  setActiveMenu,
  showMega,
  setShowMega,
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
            key={m.label}
            className={`gl-navItem ${activeMenu === idx ? "is-active" : ""}`}
            href={m.href}
            onMouseEnter={() => setActiveMenu(idx)}
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
                key={m.label}
                className={`gl-megaCol ${activeMenu === idx ? "is-active" : ""}`}
                onMouseEnter={() => setActiveMenu(idx)}
              >
                <div className="gl-megaTitle">{m.label}</div>
                <div className="gl-megaList">
                  {m.subItems.map((s) => (
                    <a key={s.label} className="gl-megaLink" href={s.href}>
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
