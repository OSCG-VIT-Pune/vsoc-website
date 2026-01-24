'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Environment, Float, Sparkles, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function Coin({ onComplete }) {
  const meshRef = useRef()
  // Start higher up, above the screen/slot
  const [position, setPosition] = useState([0, 3, 0.5]) 
  
  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Animate Position (Drop) into the slot
    // Slot opening is roughly at y=0, z=0
    if (meshRef.current.position.y > -1.5) {
      meshRef.current.position.y -= delta * 4 // Faster drop
      
      // Spin and wobble
      meshRef.current.rotation.z += delta * 15
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 10) * 0.5
      
      // Move slightly towards the slot in Z depth
      if (meshRef.current.position.y < 1 && meshRef.current.position.z > 0) {
        meshRef.current.position.z -= delta * 1
      }
    } else {
       if (onComplete) onComplete()
    }
  })

  return (
    <group position={position} ref={meshRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 64]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={1} 
          roughness={0.2}
          envMapIntensity={2} 
        />
      </mesh>
      {/* Detail Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.05, 16, 64]} />
        <meshStandardMaterial color="#B8860B" metalness={1} roughness={0.3} />
      </mesh>
      <Text position={[0, 0, 0.06]} fontSize={0.8} color="#B8860B" font="/fonts/pixel.ttf" anchorX="center" anchorY="middle">
        $
      </Text>
    </group>
  )
}

function CabinetFace() {
  return (
    <group position={[0, 0, -0.5]}>
      {/* Main Metal Plate */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 4, 0.2]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.4} 
        />
      </mesh>
      
      {/* Screws */}
      {[-2.5, 2.5].map(x => [-1.5, 1.5].map(y => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.15]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
          <meshStandardMaterial color="#888" metalness={1} roughness={0.2} />
        </mesh>
      )))}

      {/* Coin Slot Housing */}
      <group position={[0, -0.5, 0.2]}>
        {/* Housing Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 2, 0.3]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Slot Hole (Visual only - using a black plane) */}
        <mesh position={[0, 0.2, 0.16]}>
          <planeGeometry args={[0.15, 1.2]} />
          <meshBasicMaterial color="#000" />
        </mesh>
      </group>

      {/* Neon Sign Box */}
      <group position={[0, 1.2, 0.2]}>
        <mesh>
          <boxGeometry args={[3, 0.8, 0.2]} />
          <meshStandardMaterial color="#990000" />
        </mesh>
        <Text 
          position={[0, 0, 0.11]} 
          fontSize={0.35} 
          color="white" 
          font="https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff" // Online font as fallback
          anchorX="center" 
          anchorY="middle"
        >
          INSERT COIN
        </Text>
        <pointLight position={[0, 0, 1]} distance={3} intensity={2} color="red" />
      </group>
    </group>
  )
}

export default function ThreeDCoinScene({ inserting, onAnimationComplete }) {
  const [hasCompleted, setHasCompleted] = useState(false)

  const handleCompleteOnce = () => {
    if (!hasCompleted) {
      setHasCompleted(true)
      setTimeout(onAnimationComplete, 100)
    }
  }

  return (
    <div className="w-full h-64 md:h-80 relative">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        gl={{ alpha: true, antialias: true }}
      >
        <React.Suspense fallback={<Text position={[0,0,0]} color="cyan" fontSize={0.5}>LOADING 3D...</Text>}>
          {/* Environment removed to prevent network blocking */}
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />
          
          {/* Floating Cabinet - Always visible */}
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <CabinetFace />
          </Float>

          {/* The Coin - Only visible when inserting */}
          {inserting && <Coin onComplete={handleCompleteOnce} />}

          <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
