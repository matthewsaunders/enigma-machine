import React from 'react';
import { Rotors } from "../rotors/Rotors";
import { Lightboard } from "../lightboard/Lightboard";
import { Keyboard } from "../keyboard/Keyboard";
import { Plugboard } from "../plugboard/Plugboard";

import './Machine.css';

export function Machine() {
  return (
    <div className="Machine">
      <div className="Machine__rotors">
        <Rotors />
      </div>
      <div className="Machine__lightboard">
        <Lightboard />
      </div>
      <div className="Machine__keyboard">
        <Keyboard />
      </div>
      <div className="Machine__plugboard">
        <Plugboard />
      </div>
    </div>
  );
}
