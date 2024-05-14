import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import JetModel from './JetModel';
import Nav from './Nav'

const TypeJet = () => {

  return (
    <div className="flex items-center justify-center h-screen w-screen text-white">
      <div className='flex h-[102vh] bg-black w-[60vw] border-2 border-white'></div>
    </div>
  );
};

export default TypeJet;
