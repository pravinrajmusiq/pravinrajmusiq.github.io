import { useRef, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { assetPath } from '../utils/assetPath';

const RADIUS = 1.8;
const PLANE_SIZE = 1.2;
const MOBILE_GROUP_SCALE = 0.5;

/** Left wing panel (index 2) — cycles every few seconds */
const LEFT_WING_PATHS = [
  assetPath('/poster_thai_tamil.jpg'),
  assetPath('/op-teaser1.jpg'),
] as const;

/** Right wing panel (index 1) — cycles every few seconds */
const RIGHT_WING_PATHS = [
  assetPath('/culik_thumbnail_vertical.png'),
  assetPath('/series_poster_1.jpg'),
] as const;

/** Remaining ring panels — offset start image so they don't all match at once */
const PANEL_0_PATHS = [
  assetPath('/op-teaser1.jpg'),
  assetPath('/culik_thumbnail_vertical.png'),
] as const;

const PANEL_3_PATHS = [
  assetPath('/series_poster_1.jpg'),
  assetPath('/poster_thai_tamil.jpg'),
] as const;

const PANEL_4_PATHS = [
  assetPath('/culik_thumbnail_vertical.png'),
  assetPath('/op-teaser1.jpg'),
] as const;

/** Per-panel texture cycle + mirror when outward normal faces away from default +Z camera */
const PANEL_CONFIG: { paths: readonly [string, string]; mirrorX?: boolean }[] = [
  { paths: PANEL_0_PATHS },
  { paths: RIGHT_WING_PATHS },
  { paths: LEFT_WING_PATHS, mirrorX: true },
  { paths: PANEL_3_PATHS, mirrorX: true },
  { paths: PANEL_4_PATHS },
];

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
  texture.flipY = true;
  // Prefer offset/repeat only — center + repeat can sample empty UVs on some Three builds
  texture.center.set(0, 0);
  texture.rotation = 0;

  if (aspect > 1) {
    // Landscape — fill height, crop sides
    texture.repeat.set(1 / aspect, 1);
    texture.offset.set((1 - 1 / aspect) / 2, 0);
  } else {
    // Portrait / square — fill width, crop top/bottom
    texture.repeat.set(1, aspect);
    texture.offset.set(0, (1 - aspect) / 2);
  }

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
}

function ProjectPlane({
  paths,
  position,
  rotationY,
  mirrorX = false,
}: {
  paths: readonly [string, string];
  position: [number, number, number];
  rotationY: number;
  /** Flip U horizontally when the rest pose shows the back face to the camera */
  mirrorX?: boolean;
}) {
  // Pass the stable path tuple directly — spreading into a new array each render can remount loaders
  const textures = useLoader(THREE.TextureLoader, paths as unknown as string[]);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    textures.forEach((texture, i) => {
      applyCoverMapping(texture);
      if (import.meta.env.DEV) {
        const img = texture.image as HTMLImageElement | undefined;
        console.log(
          `[ProjectPlane] loaded ${paths[i]} → ${img?.naturalWidth ?? img?.width}x${img?.naturalHeight ?? img?.height}`
        );
      }
    });
    if (materialRef.current) {
      materialRef.current.map = textures[0];
      materialRef.current.needsUpdate = true;
    }
  }, [textures, paths]);

  useFrame((state) => {
    if (!materialRef.current || textures.length < 2) return;
    const idx = Math.floor(state.clock.elapsedTime / TEXTURE_SWAP_SECONDS) % textures.length;
    const next = textures[idx];
    if (materialRef.current.map !== next) {
      materialRef.current.map = next;
      materialRef.current.needsUpdate = true;
    }
  });

  return (
    <mesh
      position={position}
      rotation={[0, rotationY, 0]}
      scale={[mirrorX ? -1 : 1, 1, 1]}
    >
      <planeGeometry args={[PLANE_SIZE, PLANE_SIZE]} />
      <meshBasicMaterial
        ref={materialRef}
        map={textures[0]}
        color="#ffffff"
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
      const scale = state.size.width < 768 ? MOBILE_GROUP_SCALE : 1;
      groupRef.current.scale.setScalar(scale);
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
      {/* All five ring panels use cycling project textures (offset start image per panel) */}
      {PANEL_CONFIG.map((config, i) => {
        const angle = (i / PANEL_CONFIG.length) * Math.PI * 2;
        const x = Math.cos(angle) * RADIUS;
        const z = Math.sin(angle) * RADIUS;
        const position: [number, number, number] = [x, 0, z];
        const rotationY = -angle;

        return (
          <ProjectPlane
            key={i}
            paths={config.paths}
            position={position}
            rotationY={rotationY}
            mirrorX={config.mirrorX}
          />
        );
      })}
    </group>
  );
}

/** Pull the camera back on narrow viewports so the ring fits without cropping. */
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const mobile = size.width < 768;
    cam.position.set(0, 0, mobile ? 7.25 : 5);
    cam.fov = mobile ? 52 : 50;
    cam.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

export function Logo3DSection() {
  return (
    <section className="min-h-screen bg-[var(--page-bg)] flex items-center justify-center relative overflow-x-hidden overflow-y-visible">
      <div className="absolute inset-0 flex flex-col z-10 pointer-events-none min-h-screen">
        {/* Top: clear fixed nav on mobile (stacked links); keep desktop pull-up */}
        <div className="flex-none flex flex-col items-center justify-end pt-36 sm:pt-28 md:pt-28 pb-12 md:pb-20 px-6 translate-y-0 md:-translate-y-12">
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
        <div className="flex-1 min-h-[240px] sm:min-h-[280px] md:min-h-[340px]" />
      </div>

      <div className="absolute inset-0 h-full w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ResponsiveCamera />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#00ffff" intensity={0.5} />
          <MediaRing />
        </Canvas>
      </div>
    </section>
  );
}
