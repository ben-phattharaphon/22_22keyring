import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';
import { BeadRenderer } from './Charms';
import { Tube } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function BeadChain() {
  const { beads } = useStore();

  const curve = useMemo(() => {
    // We want the total string length to perfectly hug the beads, with a small gap at the top.
    const BEAD_SPACING = 0.6; 
    const requiredLength = beads.length * BEAD_SPACING;
    const targetLength = Math.max(4.0, requiredLength + 1.5); // Minimum length 4.0
    
    // Scale the teardrop shape to match the target length
    const scale = targetLength / 4.0;
    const drop = 1.5 * scale;
    const width = 0.6 * scale;
    
    // Define a closed teardrop/oval shape hanging symmetrically from the keyring hole (-1.8, 0, 0)
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 0, 0),                     // Top attach point
      new THREE.Vector3(-1.8 - width, -drop * 0.5, 0.2), // Left belly
      new THREE.Vector3(-1.8, -drop, 0.5),               // Bottom center
      new THREE.Vector3(-1.8 + width, -drop * 0.5, 0.2), // Right belly
    ], true, 'centripetal', 0.5); // true = this curve is a closed loop
  }, [beads.length]);

  const [curveLength, setCurveLength] = useState(0);

  useEffect(() => {
    setCurveLength(curve.getLength());
  }, [curve]);

  const groupRef = useRef<THREE.Group>(null);

  // Gentle swinging animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
        groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
        groupRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.4) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* The string itself - now a closed loop! */}
      <Tube args={[curve, 128, 0.015, 8, true]}>
        <meshStandardMaterial color="#dddddd" roughness={0.8} />
      </Tube>

      {/* The beads */}
      {curveLength > 0 && beads.map((bead, index) => {
        // Physical spacing based on arc length so they touch each other
        const BEAD_SPACING = 0.6; 
        const totalBeadsLength = (beads.length - 1) * BEAD_SPACING;
        
        // Start placing beads so the whole group is perfectly centered at the bottom of the loop (t=0.5)
        const startU = (curveLength / 2) - (totalBeadsLength / 2);
        
        const currentU = startU + index * BEAD_SPACING;
        
        // Because it's a closed loop, if they wrap around, we just use modulo!
        let wrappedU = currentU % curveLength;
        if (wrappedU < 0) wrappedU += curveLength;
        
        // Convert distance to t value (0 to 1) along the curve
        const u = wrappedU / curveLength;
        const position = curve.getPointAt(u);
        const tangent = curve.getTangentAt(u);
        const axis = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, tangent);
        const euler = new THREE.Euler().setFromQuaternion(quaternion);

        // Adjust rotation based on bead type so they face outward nicely
        if (bead.type === 'letter' || bead.shape === 'butterfly' || bead.shape === 'smiley' || bead.shape === 'clover' || bead.shape === 'music_note') {
            euler.x += Math.PI / 2; // Make shapes face forward
            euler.y += Math.PI / 4;
        }

        // Add a tiny random spin to make them look naturally strung
        euler.z += (index % 3) * 0.2;

        return (
          <group key={bead.id} position={position} rotation={euler}>
            <BeadRenderer bead={bead} />
          </group>
        );
      })}
    </group>
  );
}
