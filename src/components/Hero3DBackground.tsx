import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Hero3DBackgroundProps {
  containerRef: React.RefObject<HTMLDivElement>
}

export const Hero3DBackground: React.FC<Hero3DBackgroundProps> = ({ containerRef }) => {
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const objectsRef = useRef<THREE.Object3D[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0xffffff, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create animated medical elements
    const createDNAHelix = () => {
      const group = new THREE.Group()
      const geometry = new THREE.BufferGeometry()
      const positions: number[] = []

      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 4
        const x = Math.cos(angle) * 2
        const y = (i / 100) * 4 - 2
        const z = Math.sin(angle) * 2
        positions.push(x, y, z)
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
      const material = new THREE.LineBasicMaterial({ color: 0x00d4ff, linewidth: 2 })
      const line = new THREE.Line(geometry, material)
      group.add(line)

      return group
    }

    const createHeartbeat = () => {
      const group = new THREE.Group()
      const geometry = new THREE.BufferGeometry()
      const positions: number[] = []

      for (let i = 0; i < 200; i++) {
        const t = (i / 200) * Math.PI * 2
        const x = (i / 200) * 4 - 2
        const y = Math.sin(t) * 0.5 + Math.sin(t * 3) * 0.2
        const z = 0
        positions.push(x, y, z)
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
      const material = new THREE.LineBasicMaterial({ color: 0x00ff88, linewidth: 2 })
      const line = new THREE.Line(geometry, material)
      group.add(line)

      return group
    }

    const createAbstractShapes = () => {
      const group = new THREE.Group()

      // Floating spheres
      for (let i = 0; i < 5; i++) {
        const geometry = new THREE.SphereGeometry(0.3, 32, 32)
        const material = new THREE.MeshPhongMaterial({
          color: Math.random() > 0.5 ? 0x00d4ff : 0x0099cc,
          emissive: 0x00d4ff,
          emissiveIntensity: 0.3,
        })
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.set(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        )
        group.add(sphere)
      }

      return group
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00d4ff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Add objects
    const dnaHelix = createDNAHelix()
    dnaHelix.position.set(-2, 0, 0)
    scene.add(dnaHelix)
    objectsRef.current.push(dnaHelix)

    const heartbeat = createHeartbeat()
    heartbeat.position.set(2, 0, 0)
    scene.add(heartbeat)
    objectsRef.current.push(heartbeat)

    const shapes = createAbstractShapes()
    scene.add(shapes)
    objectsRef.current.push(shapes)

    // Animation loop
    let animationTime = 0
    const animate = () => {
      animationTime += 0.01

      // Rotate objects
      objectsRef.current.forEach((obj, index) => {
        if (index < 2) {
          obj.rotation.y += 0.005
          obj.rotation.x += 0.002
        } else {
          // Animate abstract shapes
          obj.children.forEach((child, childIndex) => {
            child.position.y += Math.sin(animationTime + childIndex) * 0.01
            child.rotation.x += 0.01
            child.rotation.y += 0.01
          })
        }
      })

      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [containerRef])

  return null
}
