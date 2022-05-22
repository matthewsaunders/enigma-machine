export const ALPHABET = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
export const ALPHABET_KEYS = [...ALPHABET, ...ALPHABET.map(l => l.toLowerCase())];

// Note: The next rotor is advanced AFTER hitting the notch character
// i.e. Rotor I, If rotor steps from Q to R, the next rotor is advanced
export const ROTOR_CONFIGURATIONS = {
  'I': {
    mapping: [...'EKMFLGDQVZNTOWYHXUSPAIBRCJ'],
    notches: ['Q'],
  },
  'II': {
    mapping: [...'AJDKSIRUXBLHWTMCQGZNPYFVOE'],
    notches: ['E'],
  },
  'III': {
    mapping: [...'BDFHJLCPRTXVZNYEIWGAKMUSQO'],
    notches: ['V'],
  },
  'IV': {
    mapping: [...'ESOVPZJAYQUIRHXLNFTGKDCMWB'],
    notches: ['J'],
  },
  'V': {
    mapping: [...'VZBRGITYUPSDNHLXAWMJQOFECK'],
    notches: ['Z'],
  },
  'VI': {
    mapping: [...'JPGVOUMFYQBENHZRDKASXLICTW'],
    notches: [...'ZM'],
  },
  'VII': {
    mapping: [...'NZJHGRCXMYSWBOUFAIVLPEKQDT'],
    notches: [...'ZM'],
  },
  'VIII': {
    mapping: [...'FKQHTLXOCBJSPDZRAMEWNIUYGV'],
    notches: [...'ZM'],
  },
};

export const NUM_LETTERS = 26;

export const AVAILABLE_ROTORS = Object.keys(ROTOR_CONFIGURATIONS);

export const REFLECTOR_MAPPINGS = {
  'A': [...'EJMZALYXVBWFCRQUONTSPIKHGD'],
  'B': [...'YRUHQSLDPXNGOKMIEBFZCWVJAT'],
  'C': [...'FVPJIAOYEDRZXWGCTKUQSBNMHL'],
};

export const AVAILABLE_REFLECTORS = Object.keys(REFLECTOR_MAPPINGS);

export const KEYBOARD_LETTERS = [
  [...'QWERTZUIO'],
  [...'ASDFGHJK'],
  [...'PYXCVBNML'],
];

export const COLORS = [
  '#DFFF00',
  '#FFBF00',
  '#FF7F50',
  '#DE3163',
  '#9FE2BF',
  '#40E0D0',
  '#6495ED',
  '#CCCCFF',
];
