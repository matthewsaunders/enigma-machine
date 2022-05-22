import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Rotor } from './Rotor';
import './Rotors.css';

export function Rotors() {
  const rotors = useSelector((state) => state.machine.rotors);

  // Because we iterate through rotors in reverse, we need to do some quick
  // math to get the index of the rotor in the initial index
  function getRotorIndex(reversedIndex) {
    return (rotors.length - 1) - reversedIndex
  }

  return (
    <div>
      <div className='Section__header'>
        Rotors
      </div>
      <div className='Rotors'>
        {
          // Rotors are sotred 0..2 but are displayed 2..0
          rotors.slice(0).reverse().map(( rotor, i) =>
            <Rotor
              key={i}
              type={rotor.type}
              rotorIndex={getRotorIndex(i)}
              currentPosition={rotor.currentPosition}
            />
          )
        }
      </div>
    </div>
  );
}
