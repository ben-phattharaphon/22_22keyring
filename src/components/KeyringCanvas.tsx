"use client";

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';

import BaseShape from './BaseShape';
import BeadChain from './BeadChain';
import { useStore } from '@/store/useStore';

function ResponsiveGroup({ children }: { children: React.ReactNode }) {
  const { size, viewport } = useThree();
  
  const isMobile = size.width <= 768;
  
  let offsetX = 0;
  if (!isMobile) {
    // Shift left on desktop to center the keyring in the visible area (excluding the sidebar)
    const occupiedPixels = 380 + 24; // Sidebar width (380px) + right margin (24px)
    const unitsPerPixel = viewport.width / size.width;
    offsetX = -(occupiedPixels / 2) * unitsPerPixel;
  }

  // Adjust scale dynamically if the viewport is narrow (portrait orientation)
  const aspect = size.width / size.height;
  let scale = 1;
  if (aspect < 1) {
    scale = Math.max(0.65, aspect * 1.1);
  }

  return (
    <group position={[offsetX, 0, 0]} scale={scale}>
      {children}
    </group>
  );
}

export default function KeyringCanvas() {
  const backgroundColor = useStore((state) => state.backgroundColor);
  
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
      <color attach="background" args={[backgroundColor]} />

      {/* Manual lighting – no network requests needed */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-8, 6, -4]} intensity={0.5} color="#ffd6f0" />
      <pointLight position={[0, 4, 4]} intensity={0.8} color="#ffffff" />
      <hemisphereLight args={['#ffe4f5', '#9b59b6', 0.4]} />

      <Suspense fallback={null}>
        <ResponsiveGroup>
          <BaseShape />
          <BeadChain />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#ff80ab" />
        </ResponsiveGroup>
      </Suspense>

      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}

