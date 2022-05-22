import React from 'react';
import './App.css';
import { Machine } from './components/machine/Machine';
import {Texts} from "./components/texts/Texts";

function App() {
  return (
    <div className="App">
      <Machine className="App__machine" />
      <Texts className="App__texts" />
    </div>
  );
}

export default App;
