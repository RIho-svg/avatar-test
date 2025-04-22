import * as THREE from 'https://cdn.skypack.dev/three'
import GLTFLoader from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js'
import OrbitControls from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js'

let scene, camera, renderer, controls

init()
animate()

function init() {
  // シーンの作成
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)

  // カメラの作成
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 1.6, 3)

  // レンダラーの作成
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // 照明
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(1, 2, 3)
  scene.add(light)
  scene.add(new THREE.AmbientLight(0x999999))

  // カメラ操作
  controls = new OrbitControls(camera, renderer.domElement)

  // アバター読み込み
  const loader = new GLTFLoader()
  loader.load('./avatar.glb', (gltf) => {
    const model = gltf.scene
    model.scale.set(1.5, 1.5, 1.5) // サイズ調整（必要に応じて）
    scene.add(model)
  }, undefined, (error) => {
    console.error('アバターの読み込みエラー:', error)
  })

  // ウィンドウサイズ変更に対応
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
