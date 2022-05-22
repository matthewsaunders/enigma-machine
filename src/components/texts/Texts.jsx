import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Texts.css';
import {ALPHABET, ALPHABET_KEYS} from "../../app/constants";
import {addLetter} from "../../features/machine/machineSlice";

export function Texts() {
  const inputText = useSelector((state) => state.machine.inputText);
  const outputText = useSelector((state) => state.machine.outputText);
  const dispatch = useDispatch();

  function handleKeyPress(event) {
    if (ALPHABET_KEYS.includes(event.key)) {
      dispatch(addLetter(event.key.toUpperCase()));
    }
  }

  return (
    <div className="Texts">
      <div className="Texts__section">
        <h2 className="Texts__header">
          Input Text
        </h2>
        <textarea
          value={inputText}
          className="Texts__content Texts__input"
          onKeyPress={(event) => handleKeyPress(event)}
          readOnly
        />
      </div>

      <div className="Texts__section">
        <h2 className="Texts__header">
          Encoded Output
        </h2>
        <textarea
          value={outputText}
          className="Texts__content Texts__input"
          readOnly
        />
      </div>
    </div>
  );
}
