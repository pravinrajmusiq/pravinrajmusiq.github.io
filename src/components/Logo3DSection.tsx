import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// No external stock images — use gradient panels so the section stays professional and on-brand
function createPanelTexture(hex: string) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, hex);
  gradient.addColorStop(1, '#1a1a1a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

const PANEL_COLORS = ['#FFD700', '#FFA500', '#FF8C00', '#E67E22', '#D35400'];

const RADIUS = 1.8;
const PLANE_SIZE = 1.2;

function createGoldGradientTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#FFD700');
  gradient.addColorStop(0.5, '#FFA500');
  gradient.addColorStop(1, '#FF8C00');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function GradientPlane({
  color,
  position,
  rotationY,
}: {
  color: string;
  position: [number, number, number];
  rotationY: number;
}) {
  const texture = useMemo(() => createPanelTexture(color), [color]);
  return (
    <mesh position={position} rotation={[0, rotationY, 0]}>
      <planeGeometry args={[PLANE_SIZE, PLANE_SIZE]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

function MediaRing() {
  const groupRef = useRef<THREE.Group>(null);
  const gradientTexture = useMemo(() => createGoldGradientTexture(), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* O (torus) – yellow / orange / gold gradient */}
      <mesh>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <meshStandardMaterial
          map={gradientTexture}
          color="#FFD700"
          emissive="#FF8C00"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Gradient panels around the torus — gold/orange palette, no external images */}
      {PANEL_COLORS.map((color, i) => {
        const angle = (i / PANEL_COLORS.length) * Math.PI * 2;
        const x = Math.cos(angle) * RADIUS;
        const z = Math.sin(angle) * RADIUS;
        const position: [number, number, number] = [x, 0, z];
        const rotationY = -angle;
        return (
          <GradientPlane key={i} color={color} position={position} rotationY={rotationY} />
        );
      })}
    </group>
  );
}

export function Logo3DSection() {
  return (
    <section className="min-h-screen bg-[var(--page-bg)] flex items-center justify-center relative overflow-x-hidden overflow-y-visible">
      <div className="absolute inset-0 flex flex-col z-10 pointer-events-none min-h-screen">
        {/* Top: "Let's Work" with space below so it never overlaps 3D */}
        <div className="flex-none flex flex-col items-center justify-end pt-20 md:pt-28 pb-16 md:pb-20 px-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-[var(--text-primary)] text-center"
          >
            Let's Work
          </motion.h2>
        </div>
        {/* Middle: empty so 3D animation has a clear band with no text overlap */}
        <div className="flex-1 min-h-[280px] md:min-h-[340px]" />
        {/* Bottom: "Together!" with space above so it never overlaps 3D */}
        <div className="flex-none flex flex-col items-center justify-start pt-12 md:pt-16 pb-24 md:pb-36 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-[var(--text-primary)] text-center"
          >
            Together!
          </motion.h2>
        </div>
      </div>

      <div className="absolute inset-0 h-full w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#00ffff" intensity={0.5} />
          <MediaRing />
        </Canvas>
      </div>
    </section>
  );
}
