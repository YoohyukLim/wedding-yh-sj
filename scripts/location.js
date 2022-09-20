const position = new kakao.maps.LatLng(37.4836, 127.01787);
const mapContainer = document.getElementById('map');
const mapOption = { 
        center: position,
        level: 3
    };    
const map = new kakao.maps.Map(mapContainer, mapOption);
const marker = new kakao.maps.Marker({
    position: position, 
    text: '더화이트베일'
});
marker.setMap(map);

Kakao.init("d0c902fa29b5b46643c9124679b42bb8");
const kakaoNavi = document.getElementById('kakao_navi');
kakaoNavi.onclick = function() {
    Kakao.Navi.start({
      name: '더화이트베일',
      x: 127.01787,
      y: 37.4836,
      coordType: 'wgs84',
    })
  }

function copyLocation() {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = '서울 서초구 서초중앙로 14';

    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea)

    alert("주소를 복사했습니다.")
}
