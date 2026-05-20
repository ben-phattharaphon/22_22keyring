import { Text, Cylinder, Sphere, Extrude } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';
import { Bead } from '@/store/useStore';

const getMaterial = (color: string) => <meshPhysicalMaterial color={color} roughness={0.05} metalness={0.1} clearcoat={1} clearcoatRoughness={0.1} />;

function HeartShape({ color }: { color: string }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.2);
    s.bezierCurveTo(0.2, 0.4, 0.4, 0.4, 0.4, 0.1);
    s.bezierCurveTo(0.4, -0.2, 0, -0.4, 0, -0.5);
    s.bezierCurveTo(0, -0.4, -0.4, -0.2, -0.4, 0.1);
    s.bezierCurveTo(-0.4, 0.4, -0.2, 0.4, 0, 0.2);
    return s;
  }, []);

  return (
    <Extrude args={[shape, { depth: 0.15, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 }]} position={[0, 0, -0.075]}>
      {getMaterial(color)}
    </Extrude>
  );
}

function StarShape({ color }: { color: string }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const outerRadius = 0.4;
    const innerRadius = 0.15;
    const points = 5;
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (points * 2)) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.lineTo(0, outerRadius);
    return s;
  }, []);

  return (
    <Extrude args={[shape, { depth: 0.15, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03 }]} position={[0, 0, -0.075]}>
      {getMaterial(color)}
    </Extrude>
  );
}

function ButterflyShape({ color }: { color: string }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(0.2, 0.6, 0.8, 0.8, 0.9, 0.4);
    s.bezierCurveTo(1.0, 0.0, 0.5, 0.1, 0.2, 0);
    s.bezierCurveTo(0.6, -0.2, 0.8, -0.6, 0.5, -0.8);
    s.bezierCurveTo(0.2, -0.9, 0.1, -0.4, 0, 0);
    s.bezierCurveTo(-0.1, -0.4, -0.2, -0.9, -0.5, -0.8);
    s.bezierCurveTo(-0.8, -0.6, -0.6, -0.2, -0.2, 0);
    s.bezierCurveTo(-0.5, 0.1, -1.0, 0.0, -0.9, 0.4);
    s.bezierCurveTo(-0.8, 0.8, -0.2, 0.6, 0, 0);
    return s;
  }, []);

  return (
    <group scale={0.5}>
      <Extrude args={[shape, { depth: 0.2, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 }]} position={[0, 0, -0.1]}>
        {getMaterial(color)}
      </Extrude>
      {/* Body */}
      <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />{getMaterial('#555')}</mesh>
    </group>
  );
}

function MusicNoteShape({ color }: { color: string }) {
  return (
    <group scale={0.8} position={[0, -0.1, 0]}>
      <group position={[-0.15, -0.2, 0]} rotation={[0, 0, Math.PI / 8]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />
          {getMaterial(color)}
        </mesh>
      </group>
      <mesh position={[0.05, 0.15, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.7, 16]} />
        {getMaterial(color)}
      </mesh>
      <mesh position={[0.2, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.05, 0.35, 0.1]} />
        {getMaterial(color)}
      </mesh>
    </group>
  );
}

function CloverShape({ color }: { color: string }) {
  return (
    <group scale={0.8}>
      <mesh position={[0.18, 0.18, 0]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.22, 0.22, 0.15, 32]} />{getMaterial(color)}</mesh>
      <mesh position={[-0.18, 0.18, 0]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.22, 0.22, 0.15, 32]} />{getMaterial(color)}</mesh>
      <mesh position={[0.18, -0.18, 0]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.22, 0.22, 0.15, 32]} />{getMaterial(color)}</mesh>
      <mesh position={[-0.18, -0.18, 0]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.22, 0.22, 0.15, 32]} />{getMaterial(color)}</mesh>
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, -Math.PI / 8]}><cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />{getMaterial(color)}</mesh>
    </group>
  );
}

function SmileyShape({ color }: { color: string }) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
        {getMaterial(color)}
      </mesh>
      <mesh position={[-0.12, 0.1, 0.08]}><sphereGeometry args={[0.04, 16, 16]} /><meshBasicMaterial color="#333" /></mesh>
      <mesh position={[0.12, 0.1, 0.08]}><sphereGeometry args={[0.04, 16, 16]} /><meshBasicMaterial color="#333" /></mesh>
      <mesh position={[0, -0.05, 0.08]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.15, 0.03, 16, 16, Math.PI * 0.8]} />
        <meshBasicMaterial color="#333" />
      </mesh>
    </group>
  );
}

function LetterBead({ letter, color }: { letter: string, color: string }) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.25, 32]} />
        {getMaterial(color)}
      </mesh>
      <Text position={[0, 0, 0.13]} fontSize={0.35} color="white" anchorX="center" anchorY="middle" fontWeight="bold" font="/FredokaOne-Regular.woff">
        {letter.toUpperCase()}
      </Text>
      <Text position={[0, 0, -0.13]} rotation={[0, Math.PI, 0]} fontSize={0.35} color="white" anchorX="center" anchorY="middle" fontWeight="bold" font="/FredokaOne-Regular.woff">
        {letter.toUpperCase()}
      </Text>
    </group>
  );
}

function RoundBead({ color }: { color: string }) {
  return (
    <mesh>
      <sphereGeometry args={[0.18, 32, 32]} />
      {getMaterial(color)}
    </mesh>
  );
}

export function BeadRenderer({ bead }: { bead: Bead }) {
  if (bead.type === 'letter' && bead.letter) {
    return <LetterBead letter={bead.letter} color={bead.color} />;
  }
  
  switch (bead.shape) {
    case 'heart': return <HeartShape color={bead.color} />;
    case 'star': return <StarShape color={bead.color} />;
    case 'butterfly': return <ButterflyShape color={bead.color} />;
    case 'smiley': return <SmileyShape color={bead.color} />;
    case 'clover': return <CloverShape color={bead.color} />;
    case 'music_note': return <MusicNoteShape color={bead.color} />;
    default: return <RoundBead color={bead.color} />;
  }
}
