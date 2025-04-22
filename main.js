import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js'

let scene, camera, renderer, controls

init()
animate()

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 1.6, 3)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(1, 2, 3)
  scene.add(light)
  scene.add(new THREE.AmbientLight(0x999999))

  controls = new OrbitControls(camera, renderer.domElement)

  const loader = new GLTFLoader()
  loader.load('./avatar.glb', (gltf) => {
    const model = gltf.scene
    model.scale.set(1.5, 1.5, 1.5)
    scene.add(model)
  }, undefined, (error) => {
    console.error('アバターの読み込みエラー:', error)
  })

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
