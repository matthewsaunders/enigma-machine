import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlugboardMapping } from '../../features/machine/machineSlice';

import { KEYBOARD_LETTERS, COLORS } from '../../app/constants';

import './Plugboard.css';

function getLetterMapping(mappings, letter) {
  return mappings.find(mapping => mapping.letters.includes(letter)) || null;
}

function letterIsMapped(mappings, letter) {
  return !!getLetterMapping(mappings, letter);
}

export function Plugboard() {
  const dispatch = useDispatch();
  const plugboard = useSelector((state) => state.machine.plugboard);
  const [firstLetter, setFirstLetter] = useState(null);

  function handleLetterClick(letter) {
    if (!firstLetter) {
      setFirstLetter(letter);
    } else if (firstLetter === letter) {
      setFirstLetter(null);
    } else if (letterIsMapped(plugboard.mappings, letter)) {
      // Do nothing
    } else {
      dispatch(
        addPlugboardMapping({
          firstLetter: firstLetter,
          secondLetter: letter
        })
      );

      setFirstLetter(null);
    }
  }

  function getLetterStyle(letter) {
    let styles = {};

    if (letterIsMapped(plugboard.mappings, letter)) {
      const mapping = getLetterMapping(plugboard.mappings, letter);
      styles.backgroundColor = mapping.color;
    } else if (firstLetter === letter) {
      styles.backgroundColor = COLORS[plugboard.colorIndex % COLORS.length];
    }

    return styles;
  }

  return (
    <div className='Plugboard'>
      <div className='Section__header'>
        Plugboard
      </div>
      {
        KEYBOARD_LETTERS.map((row, i) => {
          return (
            <div key={i} className='Plugboard__row'>
              {
                row.map(letter => {
                  return (
                    <button
                      key={`plugboard-${letter}`}
                      className='Plugboard__letter'
                      onClick={() => handleLetterClick(letter)}
                      style={getLetterStyle(letter)}
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
