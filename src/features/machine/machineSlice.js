import { createSlice } from '@reduxjs/toolkit';
import {
  ALPHABET,
  COLORS, NUM_LETTERS,
  REFLECTOR_MAPPINGS,
  ROTOR_CONFIGURATIONS,
} from '../../app/constants';

const initialState = {
  inputText: '',
  outputText: '',
  rotors: [
    {
      type: 'I',
      currentPosition: 0,
    },
    {
      type: 'II',
      currentPosition: 0,
    },
    {
      type: 'III',
      currentPosition: 0,
    },
  ],
  reflector: {
    type: 'A',
  },
  plugboard: {
    mappings: [],
    colorIndex: 0,
  }
};

function indexInAlphabet(letter) {
  return ALPHABET.indexOf(letter);
}

function routeThroughMachine(state, inputLetter) {
  // Route letter through machine
  const afterPlugboardIn = routeThroughPlugboard(state.plugboard, inputLetter);
  const afterFastRotorIn = routeThroughRotor(state.rotors[0], afterPlugboardIn, true);
  const afterMediumRotorIn = routeThroughRotor(state.rotors[1], afterFastRotorIn, true);
  const afterSlowRotorIn = routeThroughRotor(state.rotors[2], afterMediumRotorIn, true);
  const afterReflector = routeThroughReflector(state.reflector, afterSlowRotorIn);
  const afterSlowRotorOut = routeThroughRotor(state.rotors[2], afterReflector, false);
  const afterMediumRotorOut = routeThroughRotor(state.rotors[1], afterSlowRotorOut, false);
  const afterFastRotorOut = routeThroughRotor(state.rotors[0], afterMediumRotorOut, false);
  const afterPlugboardOut = routeThroughPlugboard(state.plugboard, afterFastRotorOut);

  const DEBUG = true;
  if (DEBUG) {
    console.log(`-------------------------------------------`);
    console.log(`rotor[-]: ${Array(26).fill().map((x,i) => (i+1)%10)}`);
    console.log(`rotor[-]: ${ALPHABET}`);
    console.log(`rotor[0]: ${ROTOR_CONFIGURATIONS[state.rotors[0].type].mapping}`);
    console.log(`rotor[1]: ${ROTOR_CONFIGURATIONS[state.rotors[1].type].mapping}`);
    console.log(`rotor[2]: ${ROTOR_CONFIGURATIONS[state.rotors[2].type].mapping}`);
    console.log(`reflecto: ${REFLECTOR_MAPPINGS[state.reflector.type]}`);
    console.log(``);
    console.log(`inputLetter:         ${inputLetter}`);
    console.log(`afterPlugboardIn:    ${afterPlugboardIn}`);
    console.log(`afterFastRotorIn:    ${afterFastRotorIn}`);
    console.log(`afterMediumRotorIn:  ${afterMediumRotorIn}`);
    console.log(`afterSlowRotorIn:    ${afterSlowRotorIn}`);
    console.log(`afterReflector:      ${afterReflector}`);
    console.log(`afterSlowRotorOut:   ${afterSlowRotorOut}`);
    console.log(`afterMediumRotorOut: ${afterMediumRotorOut}`);
    console.log(`afterFastRotorOut:   ${afterFastRotorOut}`);
    console.log(`afterPlugboardOut:   ${afterPlugboardOut}`);
    console.log(`-------------------------------------------`);
  }

  return afterPlugboardOut;
}

function routeThroughPlugboard(plugboard, inputLetter) {
  let translatedLetter = inputLetter;
  const mapping = plugboard.mappings.find(mapping => mapping.letters.includes(inputLetter)) || null;

  if (mapping) translatedLetter = mapping.letters.find(letter => letter !== inputLetter);

  return translatedLetter;
}

function routeThroughReflector(reflector, inputLetter) {
  const mapping = REFLECTOR_MAPPINGS[reflector.type];
  return mapping[indexInAlphabet(inputLetter)];
}

function routeThroughRotor(rotor, inputLetter, signalIn) {
  const rotorConfiguration = ROTOR_CONFIGURATIONS[rotor.type];

  // signalIn is used to determine which way we should route the letter through
  // the rotor.
  if (signalIn) {
    const rotorIndex = (rotor.currentPosition + indexInAlphabet(inputLetter)) % NUM_LETTERS;
    return rotorConfiguration.mapping[rotorIndex];
  } else {
    const rotorIndex = (NUM_LETTERS + rotorConfiguration.mapping.indexOf(inputLetter) - rotor.currentPosition) % NUM_LETTERS;
    return ALPHABET[rotorIndex];
  }
}

function nextRotorPosition(rotors, rotorIndex) {
  const rotor = rotors[rotorIndex];
  let updateRotorPosition = false;

  if (rotorIndex > 0) {
    const previousRotor = rotors[rotorIndex - 1];
    const previousRotorConfiguration = ROTOR_CONFIGURATIONS[previousRotor.type];
    const previousRotorHasNotch = previousRotorConfiguration.notches.includes(ALPHABET[previousRotor.currentPosition]);
    if (previousRotorHasNotch) updateRotorPosition = true;
  } else {
    updateRotorPosition = true;
  }

  return updateRotorPosition ? (rotor.currentPosition + 1) % NUM_LETTERS : rotor.currentPosition;
}

export const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    addLetter: (state, action) => {
      const inputLetter = action.payload;

      // Calculate the encoded letter
      const outputLetter = routeThroughMachine(state, inputLetter);

      // Put the letters in the text
      state.inputText += inputLetter;
      state.outputText += outputLetter;

      // Update the rotors. Position is updated in reverse order because we
      // want to use the previous rotors position to determine the notch and
      // rotation of later rotors.
      state.rotors[2].currentPosition = nextRotorPosition(state.rotors, 2);
      state.rotors[1].currentPosition = nextRotorPosition(state.rotors, 1);
      state.rotors[0].currentPosition = nextRotorPosition(state.rotors, 0);
    },

    changeRotor: (state) => {
      console.log('==> changeRotor');
      // TODO: Allow user to change the rotors in the machine
    },

    changeRotorPosition: (state, action) => {
      state.rotors[action.payload.rotorIndex].currentPosition = action.payload.newPosition;
    },

    resetMachine: (state) => {
      state = initialState;
    },

    addPlugboardMapping: (state, action) => {
      state.plugboard.mappings = [
        ...state.plugboard.mappings,
        {
          letters: [action.payload.firstLetter, action.payload.secondLetter],
          color: COLORS[state.plugboard.colorIndex % COLORS.length],
        }
      ];

      state.plugboard.colorIndex++;
    },

    removePlugboardMapping: (state) => {
      console.log('==> removePlugboardMapping');
      // TODO: Allow user to remove plugboard mapping
    },
  },
});

export const {
  addLetter,
  changeRotor,
  changeRotorPosition,
  resetMachine,
  addPlugboardMapping,
  removePlugboardMapping,
} = machineSlice.actions;

export default machineSlice.reducer;
