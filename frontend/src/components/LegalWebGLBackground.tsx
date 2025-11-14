import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, Box } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// Floating document node component
const DocumentNode = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.6, 0.8, 0.05]} />
        <meshStandardMaterial
          color="#0FB3A8"
          transparent
          opacity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

// Courthouse column component
const CourthouseColumn = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh position={position}>
        <cylinderGeometry args={[0.15, 0.2, 2, 8]} />
        <meshStandardMaterial
          color="#F29F05"
          transparent
          opacity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

// Scales of justice symbol
const ScalesNode = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Center beam */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial
            color="#5B7FFF"
            transparent
            opacity={0.5}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Left pan */}
        <Sphere args={[0.2, 16, 16]} position={[-0.5, 0.5, 0]}>
          <meshStandardMaterial
            color="#5B7FFF"
            transparent
            opacity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
        {/* Right pan */}
        <Sphere args={[0.2, 16, 16]} position={[0.5, 0.5, 0]}>
          <meshStandardMaterial
            color="#5B7FFF"
            transparent
            opacity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>
    </group>
  );
};

// Connection lines between nodes
const ConnectionLines = () => {
  const linesRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.001;
    }
  });

  const points = [
    new THREE.Vector3(-2, 0, 0),
    new THREE.Vector3(2, 1, -2),
    new THREE.Vector3(1, -1, 1),
    new THREE.Vector3(-1, 1, 2),
    new THREE.Vector3(-2, 0, 0),
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#0FB3A8" transparent opacity={0.2} />
    </lineSegments>
  );
};

// Main scene component
const Scene = () => {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#F29F05" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0FB3A8" />

      {/* Document nodes */}
      <DocumentNode position={[-3, 1, -2]} />
      <DocumentNode position={[3, -0.5, -3]} />
      <DocumentNode position={[1, 2, -1]} />
      <DocumentNode position={[-1, -1.5, -2]} />

      {/* Courthouse columns */}
      <CourthouseColumn position={[-4, 0, -4]} />
      <CourthouseColumn position={[4, 0, -4]} />

      {/* Scales of justice */}
      <ScalesNode position={[0, 0, -3]} />

      {/* Connection lines */}
      <ConnectionLines />

      {/* Smooth camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

// Main WebGL background component
export const LegalWebGLBackground = () => {
  return (
    <div className="absolute inset-0 opacity-40">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
