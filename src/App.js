import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import game from './game';


const {Game}  = game.components;
class App extends Component {
  render() {
    return (
      <div id="mainArea">
        <div id="gameArea">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
