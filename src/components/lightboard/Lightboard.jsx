import React, {useEffect, useState} from 'react';
import { KEYBOARD_LETTERS } from '../../app/constants';

import './Lightboard.css';
import {useSelector} from "react-redux";

export function Lightboard() {
  const outputText = useSelector((state) => state.machine.outputText);
  const [selectedLetter, setSelectedLetter] = useState('');

  useEffect(() => {
    setSelectedLetter(outputText[outputText.length - 1]);

    setTimeout(() => {
      setSelectedLetter('');
    },200);
  }, [outputText])

  return (
    <div className='Lightboard'>
      <div className='Section__header'>
        Lightboard
      </div>
      {
        KEYBOARD_LETTERS.map((row, i) => {
          return (
            <div key={i} className='Lightboard__row'>
              {
                row.map(letter => {
                  return (
                    <div key={`lightboard-${letter}`} className={`Lightboard__letter ${letter === selectedLetter ? 'Lightboard__letter--selected' : ''}`}>
                      { letter }
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  );
}
