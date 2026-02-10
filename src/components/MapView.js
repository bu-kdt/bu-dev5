import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import myLocationIcon from "../me.png";
import hospitalIcon from "../hospital.png";

const MapView = forwardRef((props, ref) => {
  const mapRef = useRef(null);
  const kakaoMapRef = useRef(null);
  const myMarkerRef = useRef(null);
  const openInfoRef = useRef(null);
  const myLocationRef = useRef(null); // 현재 위치 저장

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
     병원 마커 로드
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

          const imageSize = new window.kakao.maps.Size(34, 34);

          const markerImage = new window.kakao.maps.MarkerImage(
            hospitalIcon,
            imageSize,
            { offset: new window.kakao.maps.Point(17, 17) }
          );

          const marker = new window.kakao.maps.Marker({
            position,
            map,
            image: markerImage,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            if (openInfoRef.current) openInfoRef.current.close();

            const currentLoc = myLocationRef.current;
            const encodedName = encodeURIComponent(h.name);

            const directionUrl = currentLoc
              ? `https://map.kakao.com/link/from/내위치,${currentLoc.lat},${currentLoc.lng}/to/${encodedName},${h.latitude},${h.longitude}`
              : `https://map.kakao.com/link/to/${encodedName},${h.latitude},${h.longitude}`;

            const infowindow = new window.kakao.maps.InfoWindow({
              removable: true,
              content: `
                <div class="gl-infoCard">
                  <div class="gl-infoTitle">${h.name}</div>
                  <div class="gl-infoRow">
                    <span>📍 ${h.address || "-"}</span>
                  </div>
                  <div class="gl-infoRow">
                    <span>☎ ${h.phone || "-"}</span>
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
     현재 위치 이동
  ========================= */
  const moveToMyLocation = () => {
    const map = kakaoMapRef.current;
    if (!map) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const moveLatLng = new window.kakao.maps.LatLng(lat, lng);

        map.setLevel(3);
        map.panTo(moveLatLng);

        myLocationRef.current = { lat, lng };

        if (myMarkerRef.current) {
          myMarkerRef.current.setMap(null);
        }

        const imageSize = new window.kakao.maps.Size(40, 40);

        const markerImage = new window.kakao.maps.MarkerImage(
          myLocationIcon,
          imageSize,
          { offset: new window.kakao.maps.Point(20, 20) }
        );

        const marker = new window.kakao.maps.Marker({
          position: moveLatLng,
          image: markerImage,
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

  /* 🔥 부모(Home)에서 호출 가능하게 노출 */
  useImperativeHandle(ref, () => ({
    moveToMyLocation,
  }));

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
});

export default MapView;
