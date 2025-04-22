import * as THREE from 'https://cdn.skypack.dev/three'
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js'

let scene, camera, renderer, controls
let avatar, expression = 'happy'

// 表情のモーフターゲットのインデックス対応（GLBによって異なります！）
const expressionMap = {
  mouthSmile: 1,
  browInnerUp: 1,
  mouthFunnel: 1,
  eyeBlinkLeft: 1
}

init()
animate()

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 1.6, 3)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(1, 2, 3)
  scene.add(light)
  scene.add(new THREE.AmbientLight(0xaaaaaa))

  controls = new OrbitControls(camera, renderer.domElement)

  const loader = new GLTFLoader()
  loader.load('./avatar.glb', (gltf) => {
    avatar = gltf.scene
    avatar.scale.set(1.5, 1.5, 1.5)
    scene.add(avatar)
  })
  
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

function animate() {
  requestAnimationFrame(animate)

  if (avatar) {
    avatar.traverse((child) => {
      if (child.isMesh && child.morphTargetInfluences) {
        child.morphTargetInfluences.fill(0) // 全部の表情をリセット
        const index = expressionMap[expression]
        if (index !== undefined) {
          child.morphTargetInfluences[index] = 1 // 指定の表情だけON
        }
      }
    })
  }

  controls.update()
  renderer.render(scene, camera)
}

// 外から呼べる関数（HTMLのonclickで使う）
window.setExpression = function(name) {
  expression = name
}
