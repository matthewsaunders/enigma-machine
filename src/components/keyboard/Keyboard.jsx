import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addLetter } from '../../features/machine/machineSlice';

import { KEYBOARD_LETTERS } from '../../app/constants';

import './Keyboard.css';

export function Keyboard() {
  const dispatch = useDispatch();
  const inputText = useSelector((state) => state.machine.inputText);
  const [selectedLetter, setSelectedLetter] = useState('');

  useEffect(() => {
    setSelectedLetter(inputText[inputText.length - 1]);

    setTimeout(() => {
      setSelectedLetter('');
    },200);
  }, [inputText])

  function handleLetterClick(letter) {
    dispatch(addLetter(letter));
  }

  return (
    <div className='Keyboard'>
      <div className='Section__header'>
        Keyboard
      </div>
      {
        KEYBOARD_LETTERS.map((row, i) => {
          return (
            <div key={i} className='Keyboard__row'>
              {
                row.map(letter => {
                  return (
                    <button
                      key={`keyboard-${letter}`}
                      className={`Keyboard__letter ${letter === selectedLetter ? 'Keyboard__letter--selected' : ''}`}
                      onClick={() => handleLetterClick(letter)}
                    >
                      { letter }
                    </button>
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
