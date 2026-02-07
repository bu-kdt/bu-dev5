import { useEffect } from "react";

function Map() {
  useEffect(() => {

    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오 SDK 로드 안됨");
      return;
    }

    window.kakao.maps.load(() => {

      const container = document.getElementById("map");

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);

      // 🔥 현재 위치
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const locPosition = new window.kakao.maps.LatLng(lat, lng);

            map.setCenter(locPosition);

            const marker = new window.kakao.maps.Marker({
              position: locPosition,
              map: map
            });

          },
          function (error) {
            console.error("위치 접근 거부 또는 실패", error);
          }
        );
      }

      // 🔥🔥🔥 여기 추가 (DB 병원 마커)
      fetch("http://localhost:8080/hospitals")
        .then(res => res.json())
        .then(data => {

          data.forEach(h => {

            const markerPosition = new window.kakao.maps.LatLng(
              h.latitude,
              h.longitude
            );

            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: map
            });

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `
                <div style="padding:5px;">
                  <b>${h.name}</b><br/>
                  ${h.address}<br/>
                  ${h.phone}
                </div>
              `
            });

            window.kakao.maps.event.addListener(marker, "click", function () {
              infowindow.open(map, marker);
            });

          });

        })
        .catch(err => console.error("DB 불러오기 실패:", err));

    });

  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "500px" }}
    />
  );
}

export default Map;
