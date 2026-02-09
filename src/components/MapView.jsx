import React, { useEffect, useRef, useState } from "react";

export default function MapView() {
  const mapRef = useRef(null);
  const kakaoMapRef = useRef(null);
  const myMarkerRef = useRef(null);
  const openInfoRef = useRef(null);
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      });

      kakaoMapRef.current = map;
      loadHospitals(map);
    });
  }, []);

  /* =========================
     🔥 병원 마커 로드
  ========================= */
  const loadHospitals = (map) => {
    fetch("http://localhost:8080/hospitals")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((h) => {
          if (!h.latitude || !h.longitude) return;

          const position = new window.kakao.maps.LatLng(
            Number(h.latitude),
            Number(h.longitude)
          );

          /* ✅ 병원 커스텀 아이콘 */
          const imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

          const imageSize = new window.kakao.maps.Size(30, 30);
          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize
          );

          const marker = new window.kakao.maps.Marker({
            position,
            map,
            image: markerImage,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            if (openInfoRef.current) openInfoRef.current.close();

            /* ✅ 현재 위치가 있으면 출발지 자동 설정 */
            const directionUrl = myLocation
              ? `https://map.kakao.com/link/from/내위치,${myLocation.lat},${myLocation.lng}/to/${h.name},${h.latitude},${h.longitude}`
              : `https://map.kakao.com/link/to/${h.name},${h.latitude},${h.longitude}`;

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `
                <div class="gl-infoCard">
                  <div class="gl-infoTitle">${h.name}</div>

                  <div class="gl-infoRow">
                    <span class="gl-infoLabel">📍 주소</span>
                    <span>${h.address || "-"}</span>
                  </div>

                  <div class="gl-infoRow">
                    <span class="gl-infoLabel">☎ 전화</span>
                    <span>${h.phone || "-"}</span>
                  </div>

                  <div class="gl-infoRow">
                    <span class="gl-infoLabel">🏥 진료과</span>
                    <span>${h.department || "-"}</span>
                  </div>

                  <a href="${directionUrl}"
                     target="_blank"
                     class="gl-infoBtn">
                     🚗 길찾기
                  </a>
                </div>
              `,
            });

            infowindow.open(map, marker);
            openInfoRef.current = infowindow;
          });
        });
      });
  };

  /* =========================
     🔥 현재 위치 이동
  ========================= */
  const moveToMyLocation = () => {
    const map = kakaoMapRef.current;
    if (!map) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setMyLocation({ lat, lng });

        const moveLatLng = new window.kakao.maps.LatLng(lat, lng);

        map.setLevel(3);
        map.panTo(moveLatLng);

        /* ✅ 내 위치 커스텀 아이콘 */
        const myImageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_blue.png";

        const myImageSize = new window.kakao.maps.Size(40, 40);
        const myMarkerImage = new window.kakao.maps.MarkerImage(
          myImageSrc,
          myImageSize
        );

        if (myMarkerRef.current) {
          myMarkerRef.current.setMap(null);
        }

        const marker = new window.kakao.maps.Marker({
          position: moveLatLng,
          image: myMarkerImage,
        });

        marker.setMap(map);
        myMarkerRef.current = marker;
      },
      () => alert("위치 정보를 가져올 수 없습니다."),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <section className="gl-card gl-mapCard">
      <div className="gl-mapWrapper">
        <div ref={mapRef} className="gl-kakaoMap" />
        <button className="gl-myLocationBtn" onClick={moveToMyLocation}>
          📍현재 위치로 이동
        </button>
      </div>
    </section>
  );
}

