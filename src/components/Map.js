// import React, { useEffect, useRef } from "react";

// export default function MapView() {
//   const mapRef = useRef(null);
//   const kakaoMapRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (!window.kakao || !window.kakao.maps) {
//       console.error("카카오 SDK 로드 안됨");
//       return;
//     }

//     window.kakao.maps.load(() => {
//       const options = {
//         center: new window.kakao.maps.LatLng(37.5665, 126.9780),
//         level: 3,
//       };

//       const map = new window.kakao.maps.Map(mapRef.current, options);
//       kakaoMapRef.current = map;

//       // 최초 레이아웃 안정화
//       setTimeout(() => {
//         map.relayout();
//       }, 300);

//       // 🔥 화면 리사이즈 대응
//       const handleResize = () => {
//         map.relayout();
//       };

//       window.addEventListener("resize", handleResize);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     });
//   }, []);

//   const moveToMyLocation = () => {
//     const map = kakaoMapRef.current;
//     if (!map) return;

//     if (!navigator.geolocation) {
//       alert("위치 정보를 지원하지 않는 브라우저입니다.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         const moveLatLng = new window.kakao.maps.LatLng(lat, lng);

//         // 🔥 확대 유지 + 부드럽게 이동
//         map.setLevel(3);
//         map.panTo(moveLatLng);

//         // 기존 마커 제거
//         if (markerRef.current) {
//           markerRef.current.setMap(null);
//         }

//         // 새 마커 생성
//         const marker = new window.kakao.maps.Marker({
//           position: moveLatLng,
//         });

//         marker.setMap(map);
//         markerRef.current = marker;
//       },
//       (error) => {
//         console.error(error);
//         alert("위치 정보를 가져올 수 없습니다.");
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   };

//   return (
//     <section className="gl-card gl-mapCard">
//       <div className="gl-mapWrapper">
//         <div ref={mapRef} className="gl-kakaoMap" />

//         <button
//           className="gl-myLocationBtn"
//           onClick={moveToMyLocation}
//         >
//           📍현재 위치로 이동
//         </button>
//       </div>
//     </section>
//   );
// }
