'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSize;
  attribute float aRadius;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vec3 p = position;
    float angle = uTime * (0.9 / (aRadius + 0.6));
    float s = sin(angle);
    float c = cos(angle);
    p.xz = mat2(c, -s, s, c) * p.xz;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (9.0 / -mvPosition.z);

    vColor = color;
    vTwinkle = 0.65 + 0.35 * sin(uTime * 2.0 + aRadius * 40.0 + position.x * 13.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float strength = pow(1.0 - smoothstep(0.0, 0.5, d), 3.0);
    gl_FragColor = vec4(vColor * strength * vTwinkle, strength);
  }
`

const coreVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const coreFragment = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float pulse = 0.9 + 0.1 * sin(uTime * 1.4);
    vec3 hot = vec3(1.0, 0.92, 0.98);
    vec3 violet = vec3(0.62, 0.36, 1.0);
    vec3 cyan = vec3(0.3, 0.85, 1.0);
    float core = exp(-d * 16.0) * 1.3;
    float halo = exp(-d * 4.5) * 0.45;
    float rim = exp(-d * 2.2) * 0.14;
    vec3 col = hot * core + violet * halo + cyan * rim;
    gl_FragColor = vec4(col * pulse, 1.0);
  }
`

const insideColor = new THREE.Color('#ffd6f5')
const midColor = new THREE.Color('#8b5cf6')
const outsideColor = new THREE.Color('#22d3ee')

function buildGalaxy(count: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const radii = new Float32Array(count)
  const branches = 4
  const maxRadius = 5
  const spin = 1.15
  const tmp = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const radius = Math.pow(Math.random(), 1.6) * maxRadius
    const branchAngle = ((i % branches) / branches) * Math.PI * 2
    const spinAngle = radius * spin
    const spread = 0.35 + radius * 0.12
    const jitter = () => Math.pow(Math.random(), 2.6) * (Math.random() < 0.5 ? 1 : -1) * spread

    positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + jitter()
    positions[i * 3 + 1] = jitter() * 0.35 * (1 - radius / maxRadius + 0.2)
    positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + jitter()

    const t = radius / maxRadius
    if (t < 0.35) tmp.copy(insideColor).lerp(midColor, t / 0.35)
    else tmp.copy(midColor).lerp(outsideColor, (t - 0.35) / 0.65)

    colors[i * 3] = tmp.r
    colors[i * 3 + 1] = tmp.g
    colors[i * 3 + 2] = tmp.b
    sizes[i] = (Math.random() < 0.02 ? 9 : 2.5 + Math.random() * 3.5) * (1.2 - t * 0.5)
    radii[i] = radius
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('aRadius', new THREE.BufferAttribute(radii, 1))
  return geometry
}

function Galaxy({ count, animate }: { count: number; animate: boolean }) {
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const geometry = useMemo(() => buildGalaxy(count), [count])
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio, 2) },
    }),
    [],
  )
  const coreUniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame((state, delta) => {
    if (animate) {
      uniforms.uTime.value += delta * 0.35
      coreUniforms.uTime.value += delta
    }
    const g = group.current
    if (!g) return
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04
    g.rotation.x = 0.95 - pointer.current.y * 0.18
    g.rotation.z = pointer.current.x * 0.15
    if (animate) g.rotation.y += delta * 0.03
  })

  return (
    <group ref={group} rotation={[0.95, 0, 0]}>
      <points geometry={geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh rotation={[-0.95, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <shaderMaterial
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          uniforms={coreUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

export default function GalaxyScene() {
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 768
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Galaxy count={isSmall ? 22000 : 48000} animate={!reduceMotion} />
    </Canvas>
  )
}
