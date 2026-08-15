import { useRef, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { assetPath } from '../utils/assetPath';

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

/** Left wing panel (negative X) — cycles every few seconds */
const LEFT_WING_PATHS = [
  assetPath('/poster_thai_tamil.jpg'),
  assetPath('/op-teaser1.jpg'),
] as const;

/** Right wing panel (positive X) — cycles every few seconds */
const RIGHT_WING_PATHS = [
  assetPath('/culik_thumbnail_vertical.png'),
  assetPath('/series_poster_1.jpg'),
] as const;

const TEXTURE_SWAP_SECONDS = 4;

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

/** Cover-crop portrait/landscape textures onto a square panel without stretching. */
function applyCoverMapping(texture: THREE.Texture) {
  const img = texture.image as HTMLImageElement | ImageBitmap | undefined;
  if (!img || !('width' in img) || !img.width || !img.height) return;

  const aspect = img.width / img.height;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.center.set(0.5, 0.5);
  texture.offset.set(0, 0);

  if (aspect > 1) {
    // Landscape — fill height, crop sides
    texture.repeat.set(1 / aspect, 1);
  } else {
    // Portrait / square — fill width, crop top/bottom
    texture.repeat.set(1, aspect);
  }

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
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

function ProjectPlane({
  paths,
  position,
  rotationY,
}: {
  paths: readonly [string, string];
  position: [number, number, number];
  rotationY: number;
}) {
  const textures = useLoader(THREE.TextureLoader, [...paths]);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    textures.forEach((texture) => applyCoverMapping(texture));
  }, [textures]);

  useFrame((state) => {
    if (!materialRef.current) return;
    const idx = Math.floor(state.clock.elapsedTime / TEXTURE_SWAP_SECONDS) % textures.length;
    const next = textures[idx];
    if (materialRef.current.map !== next) {
      materialRef.current.map = next;
      materialRef.current.needsUpdate = true;
    }
  });

  return (
    <mesh position={position} rotation={[0, rotationY, 0]}>
      <planeGeometry args={[PLANE_SIZE, PLANE_SIZE]} />
      <meshBasicMaterial
        ref={materialRef}
        map={textures[0]}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
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
      {/* Panels around the torus — left/right wings use project textures; others keep gradients */}
      {PANEL_COLORS.map((color, i) => {
        const angle = (i / PANEL_COLORS.length) * Math.PI * 2;
        const x = Math.cos(angle) * RADIUS;
        const z = Math.sin(angle) * RADIUS;
        const position: [number, number, number] = [x, 0, z];
        const rotationY = -angle;

        // i=2 ≈ left wing (−X), i=0 ≈ right wing (+X)
        if (i === 2) {
          return (
            <ProjectPlane
              key={i}
              paths={LEFT_WING_PATHS}
              position={position}
              rotationY={rotationY}
            />
          );
        }
        if (i === 0) {
          return (
            <ProjectPlane
              key={i}
              paths={RIGHT_WING_PATHS}
              position={position}
              rotationY={rotationY}
            />
          );
        }

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
        <div className="flex-none flex flex-col items-center justify-end pt-20 md:pt-28 pb-16 md:pb-20 px-6 -translate-y-8 md:-translate-y-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-[var(--text-primary)] text-center"
          >
            Let's Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="mt-3 md:mt-4 text-sm md:text-base text-[var(--text-muted)] text-center"
          >
            Open to full-time roles and freelance projects
          </motion.p>
        </div>
        {/* Middle: empty so 3D animation has a clear band with no text overlap */}
        <div className="flex-1 min-h-[280px] md:min-h-[340px]" />
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
