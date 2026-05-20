"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';

import BaseShape from './BaseShape';
import BeadChain from './BeadChain';
import { useStore } from '@/store/useStore';

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
        <BaseShape />
        <BeadChain />
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#ff80ab" />
      </Suspense>

      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}

