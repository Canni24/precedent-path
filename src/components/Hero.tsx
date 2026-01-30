import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Scale, TrendingUp, Clock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface HelixRingsProps {
  levelsUp?: number;
  levelsDown?: number;
  stepY?: number;
  rotationStep?: number;
}

const HelixRings: React.FC<HelixRingsProps> = ({
  levelsUp = 10,
  levelsDown = 10,
  stepY = 0.85,
  rotationStep = Math.PI / 16,
}) => {
  const groupRef = useRef<THREE.Group>(new THREE.Group());

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const ringGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const radius = 0.35;
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);

    const depth = 10;
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 4,
      curveSegments: 64,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.translate(0, 0, -depth / 2);

    return geometry;
  }, []);

  const elements = [];
  for (let i = -levelsDown; i <= levelsUp; i++) {
    elements.push({
      id: `helix-ring-${i}`,
      y: i * stepY,
      rotation: i * rotationStep,
    });
  }

  return (
    <group 
      scale={1}
      position={[0, 0, 0]}
      ref={groupRef}
      rotation={[0, 0, 0]}
    >
      {elements.map((el) => (
        <mesh
          key={el.id}
          geometry={ringGeometry}
          position={[0, el.y, 0]}
          rotation={[0, Math.PI / 2 + el.rotation, 0]}
          castShadow
        >
          <meshPhysicalMaterial
            color="#C19A6B"
            metalness={0.6}
            roughness={0.4}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
            reflectivity={0.5}
            iridescence={0.85}
            iridescenceIOR={1.4}
            iridescenceThicknessRange={[100, 400]}
          />
        </mesh>
      ))}
    </group>
  );
};

const HelixScene: React.FC = () => {
  return (
    <Canvas
      className="h-full w-full"
      orthographic
      shadows
      camera={{
        zoom: 70,
        position: [0, 0, 7],
        near: 0.1,
        far: 1000,
      }}
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
      style={{ background: "transparent" }}
    >
      <hemisphereLight
        color={"#F5E6D3"}
        groundColor={"#FAF7F0"}
        intensity={1.8}
      />

      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        color={"#E6C896"}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <HelixRings />
    </Canvas>
  );
};

export const Hero = () => {
  const navigate = useNavigate();
  const stats = [{
    icon: TrendingUp,
    value: "2M+",
    label: "Indexed Documents"
  }, {
    icon: Clock,
    value: "<2s",
    label: "Avg. Retrieval Time"
  }, {
    icon: Target,
    value: "94%",
    label: "Precision@5"
  }];
  return <section className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Grid Layout: Left Content, Right Helix */}
      <div className="relative h-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side - Content */}
        <div className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20">
          {/* Logo/Brand */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }} className="flex items-center gap-3 mb-12">
            <Scale className="w-10 h-10 text-accent" />
            <span className="text-2xl font-bold text-foreground">JuriSynch</span>
          </motion.div>

          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-accent/10 w-fit">
            <Scale className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Improving the Indian Judiciary System            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Faster, Fairer
            <br />
            <span className="gradient-text">Legal Research</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl">
            AI-powered synthesis platform that transforms case files into comprehensive dossiers.
            Find precedents, generate citations, and navigate complex legal research in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all group" onClick={() => navigate("/auth")}>
              <Upload className="w-5 h-5 mr-2" />
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          delay: 0.5
        }} className="grid grid-cols-3 gap-6 max-w-xl">
            {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return <motion.div key={stat.label} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.6 + index * 0.1
            }} className="flex flex-col gap-2">
                  <IconComponent className="w-5 h-5 text-accent mb-1" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>;
          })}
          </motion.div>

          {/* Sign In Link */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.6,
          delay: 0.8
        }} className="mt-8">
            <Button variant="ghost" className="text-muted-foreground hover:text-accent" onClick={() => navigate("/auth")}>
              Already have an account? <span className="ml-1 font-semibold">Sign In</span>
            </Button>
          </motion.div>
        </div>

        {/* Right Side - Helix 3D Animation (Desktop only) */}
        <div className="hidden lg:block relative h-full">
          <div className="absolute inset-0">
            <HelixScene />
          </div>
          {/* Gradient overlay for smooth blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none" />
        </div>

      </div>
    </section>;
};