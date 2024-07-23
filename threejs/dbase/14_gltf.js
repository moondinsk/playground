import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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

    // 컨트롤
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.maxPolarAngle = Math.PI / 2 - 0.1 // 각도 제한
    controls.minDistance = 2
    controls.maxDistance = 10
    controls.target.set(0, 0, -0.2)
    controls.update()

    // 질감 만들기
    // const GLTFMaterial = new THREE.MeshPhysicalMaterial({
        // color:0x004fff,
        // map:textureBaseColor,
        // metalness:0.9,
        // roughness:0.5,
        // wireframe:true,
    // })

    // GLTF Load
    const gltfLoader = new GLTFLoader();
    const GLTFObjGroup = new THREE.Object3D(); 
    // .Object3D 여러 도형을 하나의 3d로 묶어 줄수 있는 기능. 밖(ex. gsap rotate등 ..)에서도 조정가능할수 있도록 변수로 만들어주기 
    // Load a glTF resource
    gltfLoader.load(
        '../models/donut/scene.gltf',
        function ( gltf ) {
            scene.add( gltf.scene )
            const GLTFObj = gltf.scene

            // 질감 및 그림자 넣기
            GLTFObj.traverse(function (obj) {
                if(obj.isMesh){
                    // obj.material = GLTFMaterial
                    // obj.castShadow = true
                    // obj.receiveshadow = true
                }
            })
            GLTFObj.scale.set(5, 5, 5) // 블랜더에서 저장한 그대로를 가져옴 1:1:1 비율로
            GLTFObjGroup.add(GLTFObj) // 생성된 GLTFObj를 GLTFObjGroup에 추가
            scene.add(GLTFObjGroup) // GLTFObjGroup를 scene에 추가
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );
    
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
