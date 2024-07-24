import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
    // 장면 추가
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x111111)
    // scene.add(new THREE.AxesHelper(5)) // 중심점 표현

    // 카메라 추가
    const camera = new THREE.PerspectiveCamera(
        47,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.y = 1.8
    camera.position.z = 3
    camera.lookAt(0, 0, 0)

    // 렌더러 추가
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    renderer.shadowMap.enabled = true
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1

    // 파티클 만들기
    let particleContainer = new THREE.Object3D();
    for (var i=1; i<100; i++){
        var particular = new THREE.Mesh(
            new THREE.CircleGeometry(0.01, 3),
            new THREE.MeshToonMaterial({
                color:0x004fff,
                side: THREE.DoubleSide
            })
        )
        particular.position.set(mathRandom(3), mathRandom(3), mathRandom(3))
        particular.position.set(mathRandom(1), mathRandom(1), mathRandom(1))
        particleContainer.add(particular) //파티클들을 콘테이너로?
    }
    scene.add(particleContainer); // 씬에추가

    // 랜덤 값을 반환하는 함수 정의
    function mathRandom(num = 1) {
        var numValue = -Math.random() * num + Math.random() * num
        return numValue
    }
    
    // 빛
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(-1, 3, 0.5)
    scene.add(directionalLight)
    directionalLight.castShadow = true

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight2.position.set(0.5, 2.5, 1)
    scene.add(directionalLight2)
    directionalLight2.castShadow = true

    function animate() {
        requestAnimationFrame(animate) //인자로 받은 함수 animate를 반복 실행
        renderer.render(scene, camera)
    }
    animate()

    // 반응형 처리
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', onWindowResize)
} else {
    var warning = WEBGL.getWebGLErrorMessage()
    document.body.appendChild(warning)
}
