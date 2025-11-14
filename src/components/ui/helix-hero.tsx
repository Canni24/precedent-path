import { Canvas, useFrame } from "@react-three/fiber";
import type React from "react";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import BlurEffect from "react-progressive-blur";

// import { Perf } from 'r3f-perf'

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
            position={[5, 0, 0]}
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

const Scene: React.FC = () => {
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
			<color attach="background" args={["#F5F1E8"]} />
			
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

interface HeroProps {
  title: string;
  description: string;
}


export const Hero: React.FC<HeroProps> = ({ title, description }) => {
      return (
    <section className="relative h-screen w-screen font-sans tracking-tight text-gray-900 bg-white overflow-hidden">

      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 z-20 max-w-md">
        <h1 className="text-3xl font-light tracking-tight mb-3">
          {title}
        </h1>
        <p className="text-gray-700 text-sm leading-relaxed font-light tracking-tight">
          {description}
        </p>
      </div>
      <BlurEffect className="absolute bg-gradient-to-b from-transparent to-white/20 h-1/2 md:h-1/3 w-full bottom-0" position="bottom" intensity={50} />
      <BlurEffect className="absolute bg-gradient-to-b from-white/20 to-transparent h-1/2 md:h-1/3 w-full top-0" position="top" intensity={50} />
    </section>
  );
};
