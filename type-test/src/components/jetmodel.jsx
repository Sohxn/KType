import React, { useRef, useEffect } from 'react';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';

const JetModel = ({ position = { x: 0, y: 0, z: 0 } }) => {
  const meshRef = useRef();

  const [model, onLoad] = useLoader(THREE.GLTFLoader, 'src/assets/3D/jet.gltf'); // Replace path

  useEffect(() => {
    if (onLoad && meshRef.current) {
      meshRef.current.position.set(position.x, position.y, position.z);
    }
  }, [onLoad, position]);

  return (
    <mesh ref={meshRef}>
      {model && (
        <primitive object={model.scene} />
      )}
    </mesh>
  );
};

export default JetModel;