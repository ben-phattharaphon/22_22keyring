import { RoundedBox, Text, Float, Extrude } from '@react-three/drei';
import { useStore } from '@/store/useStore';
import { useMemo } from 'react';
import * as THREE from 'three';

export default function BaseShape() {
  const { baseColor, textColor, textValue, caseShape, screenColor } = useStore();

  // Rectangle: dynamic width
  const dynamicWidth = Math.max(2.5, 1.0 + textValue.length * 0.55);
  const centerX = -1.6 + (dynamicWidth / 2);

  // Heart position: left edge is -0.9, so position [-0.75, 0, 0] makes left edge -1.65 (slight overlap)
  const heartCenter: [number, number, number] = [-0.75, 0, 0];
  // Star position: left edge is ~-0.85, but at Y=0 it is ~-0.55. Position [-1.05, 0, 0] makes it overlap nicely.
  const starCenter: [number, number, number] = [-1.05, 0, 0];
  // Cloud position: left edge is -1.0, so position [-0.75, 0, 0] makes left edge -1.75 (slight overlap)
  const cloudCenter: [number, number, number] = [-0.75, 0, 0];

  // Dynamic font sizes to fit inside the screens without wrapping
  const len = textValue.length || 1;
  const heartFontSize = Math.max(0.22, Math.min(0.55, 1.15 / (len * 0.48)));
  const starFontSize = Math.max(0.20, Math.min(0.48, 0.95 / (len * 0.48)));
  const cloudFontSize = Math.max(0.22, Math.min(0.55, 1.25 / (len * 0.48)));

  const extrudeSettings = {
    depth: 0.22,
    bevelEnabled: true,
    bevelSize: 0.04,
    bevelThickness: 0.04,
    bevelSegments: 3,
  };

  const innerExtrudeSettings = {
    depth: 0.24,
    bevelEnabled: false,
  };

  // Heart — fits in ~1.8 × 2.0 bounding box, centered at 0,0
  const heartShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.4);
    s.bezierCurveTo(0.4, 0.9, 0.9, 0.9, 0.9, 0.2);
    s.bezierCurveTo(0.9, -0.5, 0, -1.1, 0, -1.1);
    s.bezierCurveTo(0, -1.1, -0.9, -0.5, -0.9, 0.2);
    s.bezierCurveTo(-0.9, 0.9, -0.4, 0.9, 0, 0.4);
    return s;
  }, []);

  // Star — 5-point, outer radius 0.9, inner 0.38, pointing up
  const starShape = useMemo(() => {
    const s = new THREE.Shape();
    const outerR = 0.9;
    const innerR = 0.38;
    const pts = 5;
    for (let i = 0; i < pts * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 2;
      if (i === 0) s.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
      else s.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    s.closePath();
    return s;
  }, []);

  // Cloud — fits in ~2.0 × 1.2 bounding box, centered at 0,0
  const cloudShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.5, -0.3);
    s.bezierCurveTo(-1.0, -0.3, -1.0, 0.3, -0.5, 0.3);
    s.bezierCurveTo(-0.5, 0.9, 0.5, 0.9, 0.5, 0.3);
    s.bezierCurveTo(1.0, 0.3, 1.0, -0.3, 0.5, -0.3);
    s.lineTo(-0.5, -0.3);
    return s;
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
      <group>

        {/* ── Rectangle ── */}
        {caseShape === 'rectangle' && (
          <>
            <RoundedBox args={[dynamicWidth, 1.6, 0.3]} radius={0.15} smoothness={4} position={[centerX, 0, 0]}>
              <meshStandardMaterial color={baseColor} roughness={0.1} metalness={0.1} />
            </RoundedBox>
            <RoundedBox args={[dynamicWidth - 0.4, 1.2, 0.32]} radius={0.05} smoothness={4} position={[centerX, 0, 0.01]}>
              <meshStandardMaterial color={screenColor} roughness={0.4} metalness={0.1} />
            </RoundedBox>
            <Text position={[centerX, 0, 0.18]} fontSize={0.8} color={textColor} anchorX="center" anchorY="middle" font="/FredokaOne-Regular.woff">
              {textValue}
            </Text>
          </>
        )}

        {/* ── Heart ── */}
        {caseShape === 'heart' && (
          <group position={heartCenter}>
            <Extrude args={[heartShape, extrudeSettings]} position={[0, 0, -0.13]}>
              <meshStandardMaterial color={baseColor} roughness={0.1} metalness={0.1} />
            </Extrude>
            <Extrude args={[heartShape, innerExtrudeSettings]} position={[0, 0, -0.09]} scale={[0.72, 0.72, 1]}>
              <meshStandardMaterial color={screenColor} roughness={0.4} metalness={0.1} />
            </Extrude>
            <Text position={[0, -0.05, 0.18]} fontSize={heartFontSize} color={textColor} anchorX="center" anchorY="middle" font="/FredokaOne-Regular.woff" maxWidth={2.0}>
              {textValue}
            </Text>
          </group>
        )}

        {/* ── Star ── */}
        {caseShape === 'star' && (
          <group position={starCenter}>
            <Extrude args={[starShape, extrudeSettings]} position={[0, 0, -0.13]}>
              <meshStandardMaterial color={baseColor} roughness={0.1} metalness={0.1} />
            </Extrude>
            <Extrude args={[starShape, innerExtrudeSettings]} position={[0, 0, -0.09]} scale={[0.75, 0.75, 1]}>
              <meshStandardMaterial color={screenColor} roughness={0.4} metalness={0.1} />
            </Extrude>
            <Text position={[0, 0, 0.18]} fontSize={starFontSize} color={textColor} anchorX="center" anchorY="middle" font="/FredokaOne-Regular.woff" maxWidth={2.0}>
              {textValue}
            </Text>
          </group>
        )}

        {/* ── Cloud ── */}
        {caseShape === 'cloud' && (
          <group position={cloudCenter}>
            <Extrude args={[cloudShape, extrudeSettings]} position={[0, 0, -0.13]}>
              <meshStandardMaterial color={baseColor} roughness={0.1} metalness={0.1} />
            </Extrude>
            <Extrude args={[cloudShape, innerExtrudeSettings]} position={[0, 0, -0.09]} scale={[0.75, 0.75, 1]}>
              <meshStandardMaterial color={screenColor} roughness={0.4} metalness={0.1} />
            </Extrude>
            <Text position={[0, 0.1, 0.18]} fontSize={cloudFontSize} color={textColor} anchorX="center" anchorY="middle" font="/FredokaOne-Regular.woff" maxWidth={2.0}>
              {textValue}
            </Text>
          </group>
        )}

        {/* Keychain Ring */}
        <mesh position={[-1.8, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
          <torusGeometry args={[0.2, 0.05, 16, 32]} />
          <meshStandardMaterial color="silver" metalness={1} roughness={0.1} />
        </mesh>

      </group>
    </Float>
  );
}
