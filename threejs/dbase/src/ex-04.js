import * as THREE from 'three'

import {
  WEBGL
} from './webgl'

if (WEBGL.isWebGLAvailable()) {

  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x004fff);

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3;

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true   // 계단현상 없애기
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 도형 추가
  const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material01 = new THREE.MeshStandardMaterial({
    color: 0xFF7F00
  });
  const obj01 = new THREE.Mesh(geometry01, material01);
  obj01.position.x = -1; //좌측으로 이동
  scene.add(obj01);

  const geometry02 = new THREE.ConeGeometry(0.4, 0.7, 6);
  const material02 = new THREE.MeshStandardMaterial({
    color: 0xFF7F00
  });
  const obj02 = new THREE.Mesh(geometry02, material02);
  obj02.position.x = 0;

  scene.add(obj02);


  const geometry03 = new THREE.IcosahedronGeometry(0.4, 0);
  const material03 = new THREE.MeshStandardMaterial({
    color: 0xFF7F00
  });
  const obj03 = new THREE.Mesh(geometry03, material03);
  obj03.position.x = 1;
  scene.add(obj03);


  
  function render(time) {
    time *= 0.001; // convert time to seconds

    obj01.rotation.y += 0.01;
    obj02.rotation.y += 0.01;
    obj03.rotation.y += 0.01;

    renderer.render(scene, camera);

    requestAnimationFrame(render);//인자로 받은 함수 animate를 반복 실행
  }
  requestAnimationFrame(render);


  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;   
    camera.updateProjectionMatrix();                          // 종횡비 세팅
    renderer.setSize(window.innerWidth, window.innerHeight);  // 렌더러 세팅 
  }

  window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}