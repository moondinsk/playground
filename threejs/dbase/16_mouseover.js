const raycaster = new THREE.Raycatser();
renderer.domElement.addEventLister('mousemove', onMouse)
function onMouseMove(e){
	const mouse = {
    	x : (e.clientX / renderer.domElement.clientWidth) * 2 - 1,
        y : (e.clientY / renderer.domElement.clientHeight) * 2 + 1,
        // 보통 이렇게만 사용하니 걍 복붙하고 외우기..
    }
    console.log(mouse.x, mouse.y);
}
raycaster.setFromCamera(mouse, camera)
const intersects = raycaster.intersectObjects(scene.children, true);
if(intersects.length > 0){
    //마우스 인
    TweenMax.to(ObjGroup.rotation, 1, {  //duration
    	y: Math.PI * 2 //1바퀴 돌릴때
    })
    TweenMax.to(ObjGroup.scale, 1, {
        x:1.2
    })
} else {
    //마우스 아웃 ..
}