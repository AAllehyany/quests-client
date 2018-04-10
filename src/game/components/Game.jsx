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
        this.state = {selected: [], usedWeapons: []};
    }

    startGame() {
        gamesocket.send({event: "JOIN_GAME"})
    }

    beginGame() {
        console.log(this.props.game.currentPhase);
        const phase = this.props.game.currentPhase;

        switch(phase) {
            case "TurnStart":
                gamesocket.send({event: "REVEAL_STORY"})
                break;
            
            case "SponsorQuest":
                gamesocket.send({event: "SPONSOR_QUEST", data: this.state.selected.map(c => c.id) });
                break;
            default:
                gamesocket.send({event: "START_GAME"})
        }
    }

    handleClick(card) {
        const phase = this.props.game.currentPhase;

        switch(phase) {
            case "SetupQuest":
                if(card.type !== "foe" && card.type !== "tests" && card.type !== "weapon") {
                    return;
                }
                else {
                    let numFoes = this.state.selected.filter(c => c.type === "foe").length;
                    let numTests = this.state.selected.filter(c => c.type === "test").length;
                    
                    if(card.type === "test" && numTests > 0) {
                        return;
                    }
                    
                    // check for adding weapons.
                    if( card.type === "weapon" ) {
                        if(this.state.weapons.map(c => c.name).includes(card.name)) {
                            return;
                        }
                        
                        if(this.state.selected.length > 0 && this.state.selected[this.state.selected.length - 1].type !== "test") {
                            this.state.selected.push(card);
                            this.state.weapons.push(card);
                        }
                            
                    }
                    else {
                        this.state.weapons = [];
                        this.state.selected.push(card);
                    }
                    
                }
                break;

            default:
                console.log(phase);
                console.log(card);

        }
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
                        handleCardClick={this.handleClick.bind(this)}
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