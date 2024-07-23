import * as THREE from 'three'

import {
  WEBGL
} from './webgl'

if (WEBGL.isWebGLAvailable()) {

  
  // 장면 생성
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x004fff);

  // 카메라 생성
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // 쿼리셀렉터로 특정 엘리먼트 지정 후 캔버스로 랜더러 생성 2
  const canvas = document.querySelector('#ex-03');
  const renderer = new THREE.WebGLRenderer({canvas});

  // document.body.appendChild(renderer.domElement);

  // 렌더러 사이즈 지정
  renderer.setSize(window.innerWidth, window.innerHeight);



  function render(time) {
    time *= 0.001;  // convert time to seconds

    // cube.rotation.x = time;
    // cube.rotation.y = time;

    // 렌더러의 속성 연결
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}