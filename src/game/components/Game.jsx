import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Game.css';

import Player from './Player';
import MerlinButton from './MerlinButton';
import MordredButton from './MordredButton';
import MiddleArea from './MiddleArea';
import ReadyButton from './ReadyButton';
import gamesocket from '../../gamesocket'

const mapStateToProps = (state) => ({
    players: state.game.players,
    playerId: state.game.playerId,
    game: state.game
});

class Game extends Component {

    constructor(props) {
        super(props);
        // Properties that are mapped from the server side
        // for now it is only the game, playerId and players
        this.props = props;

        // state is for when you want to store cards temporarily before
        // you push them to the server
        // like in case of setting up cards for the quest
        // you put the cards in here first then you 
        // send the things in state depending on what you need
        // selected is for the cards the player selects from their
        // hand when they click on it
        // usedWeapons is to keep track of weapons played so
        // that the player does not play more than one weapon.
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
            
            case "StartTurn":
                gamesocket.send({event: "START_GAME"});
            default:
                console.log(phase);
        }
    }

    handleClick(card) {
        const phase = this.props.game.currentPhase;
        //let current = this.props.players.filter(p => p.id===this.props.playerId);

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

            case "PlayStage":
                if(card.type!=="weapon" && card.type!=="ally" && card.type!=="amour") return;
                if(this.state.selected.map(c => c.name).includes(card.name)) return;
                if(card.type==="amour" && 
                    this.props.players.filter(p => p.id===this.props.playerID).field.map(c=>c.type).includes(card.type)) return;
                this.state.selected.push(card);
                break;

            default:
                console.log(phase);
                console.log(card);

        }
    }

    ready(){
        
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
                <MordredButton onClickButton={this.beginGame.bind(this)}/>
                <MiddleArea revealedCard={this.props.game.revealedCard}/>
                <ReadyButton onClickButton={this.ready}/>
                
            </div>
            
        )
    }
}

export default connect(mapStateToProps, null)(Game);