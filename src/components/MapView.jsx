import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
// import axios from "axios";
import myLocationIcon from "../me.png";
import hospitalIcon from "../hospital.png";

const MapView = forwardRef(
  (
    {
      onlyOpen,
      includeClothes,
      radiusKm,
      onHospitalsLoaded,
      onLocationChange,
    },
    ref
  ) => {
    const mapRef = useRef(null);
    const kakaoMapRef = useRef(null);
    const myMarkerRef = useRef(null);
    const markersRef = useRef([]);
    const circleRef = useRef(null);
    const myLocationRef = useRef(null);
    const openInfoRef = useRef(null);

    /* =========================
       거리 계산 (Haversine)
    ========================= */
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;

      return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    };

    /* =========================
       ✅ fetch 유틸 (axios.get 대체)
    ========================= */
    const fetchJson = async (url, options = {}) => {
      const res = await fetch(url, {
        method: options.method || "GET",
        headers: {
          ...(options.headers || {}),
        },
        credentials: "include",
        body: options.body,
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || `HTTP ${res.status}`);
      }

      // 응답이 비어있을 수도 있으니 방어
      const text = await res.text();
      return text ? JSON.parse(text) : null;
    };

    /* =========================
       지도 초기화
    ========================= */
    useEffect(() => {
      if (!window.kakao || !window.kakao.maps) return;

      window.kakao.maps.load(async () => {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 4,
        });

        kakaoMapRef.current = map;

        try {
          const data = await fetchJson("http://localhost:8080/api/hospitals");
          const list = Array.isArray(data) ? data : [];
          drawHospitals(list);
          onHospitalsLoaded?.(list);
        } catch (e) {
          console.error("병원 목록 로드 실패:", e);
          drawHospitals([]);
          onHospitalsLoaded?.([]);
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* =========================
       마커 & 원 정리
    ========================= */
    const clearMarkers = () => {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
    };

    const clearCircle = () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };

    /* =========================
       병원 마커 그리기
    ========================= */
    const drawHospitals = (data) => {
      const map = kakaoMapRef.current;
      if (!map) return;

      clearMarkers();

      data.forEach((h) => {
        if (!h.hlat || !h.hlon) return;

        const position = new window.kakao.maps.LatLng(
          Number(h.hlat),
          Number(h.hlon)
        );

        const markerImage = new window.kakao.maps.MarkerImage(
          hospitalIcon,
          new window.kakao.maps.Size(34, 34),
          { offset: new window.kakao.maps.Point(17, 17) }
        );

        const marker = new window.kakao.maps.Marker({
          position,
          map,
          image: markerImage,
        });

        markersRef.current.push(marker);

        // 🔥 마커 클릭 → 인포윈도우
        window.kakao.maps.event.addListener(marker, "click", () => {
          if (openInfoRef.current) {
            openInfoRef.current.close();
          }

          const currentLoc = myLocationRef.current;
          const encodedName = encodeURIComponent(h.hname || "");

          const directionUrl = currentLoc
            ? `https://map.kakao.com/link/from/내위치,${currentLoc.lat},${currentLoc.lng}/to/${encodedName},${h.hlat},${h.hlon}`
            : `https://map.kakao.com/link/to/${encodedName},${h.hlat},${h.hlon}`;

          const infowindow = new window.kakao.maps.InfoWindow({
            removable: true,
            content: `
              <div class="gl-infoCard">
                <div class="gl-infoTitle">${h.hname || "-"}</div>
                <div class="gl-infoRow">📍 ${h.haddress || "-"}</div>
                <div class="gl-infoRow">☎ ${h.htel || "-"}</div>
                <a href="${directionUrl}" target="_blank" class="gl-infoBtn">
                  🚗 길찾기
                </a>
              </div>
            `,
          });

          infowindow.open(map, marker);
          openInfoRef.current = infowindow;
        });
      });
    };

    /* =========================
       필터 적용
    ========================= */
    const applyFilters = (hospitals, lat, lon) => {
      let result = hospitals
        .filter((h) => h.hlat && h.hlon)
        .map((h) => {
          const hlat = Number(h.hlat);
          const hlon = Number(h.hlon);

          return {
            ...h,
            distance: calculateDistance(lat, lon, hlat, hlon),
          };
        });

      if (radiusKm) {
        result = result.filter((h) => h.distance <= radiusKm);
      }

      result.sort((a, b) => a.distance - b.distance);
      return result;
    };

    /* =========================
       현재 위치 기반 검색
    ========================= */
    const searchNearby = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          myLocationRef.current = { lat, lng: lon };
          onLocationChange?.({ lat, lng: lon });

          const moveLatLng = new window.kakao.maps.LatLng(lat, lon);
          kakaoMapRef.current.panTo(moveLatLng);

          // 내 위치 마커
          if (myMarkerRef.current) myMarkerRef.current.setMap(null);

          const marker = new window.kakao.maps.Marker({
            position: moveLatLng,
            image: new window.kakao.maps.MarkerImage(
              myLocationIcon,
              new window.kakao.maps.Size(40, 40),
              { offset: new window.kakao.maps.Point(20, 20) }
            ),
          });

          marker.setMap(kakaoMapRef.current);
          myMarkerRef.current = marker;

          // 반경 원
          clearCircle();
          if (radiusKm) {
            const circle = new window.kakao.maps.Circle({
              center: moveLatLng,
              radius: radiusKm * 1000,
              strokeWeight: 2,
              strokeColor: "#ff4d6d",
              strokeOpacity: 0.8,
              fillColor: "#ffccd5",
              fillOpacity: 0.3,
            });

            circle.setMap(kakaoMapRef.current);
            circleRef.current = circle;
          }

          try {
            const data = await fetchJson("http://localhost:8080/api/hospitals");
            const list = Array.isArray(data) ? data : [];

            const filtered = applyFilters(list, lat, lon);

            drawHospitals(filtered);
            onHospitalsLoaded?.(filtered);
          } catch (e) {
            console.error("주변 병원 로드 실패:", e);
            drawHospitals([]);
            onHospitalsLoaded?.([]);
          }
        },
        (err) => {
          console.error("위치 권한/조회 실패:", err);
          alert("현재 위치를 가져올 수 없습니다. 위치 권한을 허용해주세요.");
        }
      );
    };

    /* =========================
       이름 검색
    ========================= */
    const searchByName = async (name) => {
      try {
        const url = `http://localhost:8080/api/search?name=${encodeURIComponent(
          name || ""
        )}`;

        const data = await fetchJson(url);
        const list = Array.isArray(data) ? data : [];

        drawHospitals(list);
        onHospitalsLoaded?.(list);
      } catch (e) {
        console.error("이름 검색 실패:", e);
        drawHospitals([]);
        onHospitalsLoaded?.([]);
      }
    };

    useImperativeHandle(ref, () => ({
      searchByName,
      searchNearby,
      moveToMyLocation: searchNearby,
    }));

    return (
      <section className="gl-card gl-mapCard">
        <div className="gl-mapWrapper">
          <div ref={mapRef} className="gl-kakaoMap" />
        </div>
      </section>
    );
  }
);

export default MapView;
