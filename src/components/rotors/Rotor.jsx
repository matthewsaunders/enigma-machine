import React from 'react';
import { ALPHABET } from '../../app/constants';
import { useDispatch } from "react-redux";
import { changeRotorPosition } from '../../features/machine/machineSlice';

export function Rotor({ type, currentPosition, rotorIndex }) {
  const dispatch = useDispatch();

  function handleRotorPositionChange(event) {
    dispatch(
      changeRotorPosition({
        rotorIndex: rotorIndex,
        newPosition: ALPHABET.indexOf(event.target.value),
      })
    );
  }

  return (
    <div className='Rotor'>
      <select value={ALPHABET[currentPosition]} onChange={handleRotorPositionChange}>
        {
          ALPHABET.map(letter =>
            <option key={letter} value={letter}>{letter}</option>
          )
        }
      </select>
    </div>
  );
}
