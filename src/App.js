import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import game from './game';


const {Game}  = game.components;
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        width: 1920,
        height: 1080,
        marginTop: -(1080/2),
        marginLeft: -(1920/2)
    }
  }

  componentWillMount() {
      this.keepAspectRatio()
  }

  componentDidMount() {
      window.addEventListener('resize', () => this.keepAspectRatio())
  }

  keepAspectRatio() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const aspectRatio = this.state.width / this.state.height;
      const screenRatio = windowWidth/windowHeight;

      let width = windowWidth / this.state.width;
      let height = windowHeight / this.state.height;

      let opt = Math.min(width, height);

      if((screenRatio >= 1.77) && (screenRatio <= 1.79)) {
      this.setState({
          width: windowWidth,
          height: windowHeight,
          marginLeft: -(windowWidth/2),
          marginTop: -(windowHeight/2),
          fontSize: windowWidth/100
      })
      }
      else {
      let newWidth = this.state.width*opt;
      let newHeight = this.state.height*opt;

      this.setState({
          width: newWidth,
          height: newHeight,
          marginLeft: -(newWidth/2),
          marginTop: -(newHeight/2),
          fontSize: newWidth/100
      })
      }
  }

  render() {
    return (
      <div id="mainArea" style={this.state}>
        <div id="gameArea">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
