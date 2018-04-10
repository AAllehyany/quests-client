import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Game.css';

import Player from './Player';
import MerlinButton from './MerlinButton';
import MordredButton from './MordredButton';
import MiddleArea from './MiddleArea';
import gamesocket from '../../gamesocket'

const mapStateToProps = (state) => ({
    players: state.game.players,
    playerId: state.game.playerId,
    game: state.game
});

class Game extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    startGame() {
        gamesocket.send({event: "JOIN_GAME"})
    }

    beginGame() {
        gamesocket.send({event: "START_GAME"})
    }

    handleClick(card) {
        console.log("LUL")
        console.log(card)
    }
    
    render() {
        let players = this.props.players;
        //let current = this.props.players.filter(p => p.id===this.props.playerId);
        
        return (
            <div>
                {players.map((player, index) => 
                    <Player 
                        playerNumber={`Player${index+1}`}
                        key={player.id}
                        player={player}
                        handleCardClick={this.handleClick}
                    />
                ) }
                <MerlinButton onClickButton={this.startGame}/>
                <MordredButton onClickButton={this.beginGame}/>
                <MiddleArea revealedCard={this.props.game.revealedCard}/>
                
            </div>
            
        )
    }
}

export default connect(mapStateToProps, null)(Game);