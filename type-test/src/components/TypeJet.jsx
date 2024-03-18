import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import JetModel from './JetModel';

const TypeJet = () => {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [jetPosition, setJetPosition] = useState({ y: 0 });

  const canvasRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isGameRunning) {
        setScore((prevScore) => prevScore + currentSpeed * 0.1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isGameRunning, currentSpeed]);

  useEffect(() => {
    let intervalId;
    if (isGameRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        updateJetPosition();
        if (timer > 20) { // Adjust threshold as needed
          document.body.classList.add('dark');
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isGameRunning, timer, updateJetPosition]);

  const startGame = () => {
    setIsGameRunning(true);
  };

  const updateJetPosition = () => {
    const newPosition = Math.max(0, Math.min(100, currentSpeed) * 0.8);
    setJetPosition({ y: newPosition / 100 }); // Normalize for canvas height
  };

  useFrame(() => {
    if (isGameRunning) {
      // Update jet animation or rotation (optional)
      // You can use techniques like meshRef.current.rotation.y += 0.01;
      // for basic rotation animation.
    }
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen text-white">
      <h1>Type Test</h1>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={startGame}
        disabled={isGameRunning} // Disable button during game
      >
        Start
      </button>
      <Canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <JetModel position={{ y: jetPosition.y }} />
      </Canvas>
      <p className="mt-4">Score: {Math.floor(score)}</p>
      <p>Time: {timer}</p>
    </div>
  );
};

export default TypeJet;
