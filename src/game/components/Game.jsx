import React, {Component} from 'react';

import './Game.css';

import PlayerPortrait from './PlayerPortrait';

class Game extends Component {

    render() {
        let players = [
            {shields: 0, bp: 5, id:1},
            {shields: 0, bp: 5, id:2},
            {shields: 0, bp: 5, id:3},
            {shields: 0, bp: 5, id:4},
        ]
        return (
            <div>
                {players.map((player, index) => 
                    <PlayerPortrait 
                        playerNumber={`Player${index+1}`}
                        key={player.id}
                        player={player}
                    />
                ) }
                <div className='StoryDeck Card'></div>
                <div className='AdventureDeck Card'></div>
            </div>
            
        )
    }
}

export default Game;