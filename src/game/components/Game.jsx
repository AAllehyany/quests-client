import React, {Component} from 'react';

import './Game.css';

class Game extends Component {

    render() {
        return (
            <div>
                <div className="PlayerPortrait Player1">
                    <div className="PlayerShield Player1Shield"></div>
                </div>
                <div className="PlayerPortrait Player2">
                    <div className="PlayerShield Player2Shield"></div>
                </div>
                <div className="PlayerPortrait Player3">
                    <div className="PlayerShield Player3Shield"></div>
                </div>
                <div className="PlayerPortrait Player4">
                    <div className="PlayerShield Player4Shield"></div>
                </div>
            </div>
            
        )
    }
}

export default Game;