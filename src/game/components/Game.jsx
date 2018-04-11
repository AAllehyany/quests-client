import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Game.css';

import Player from './Player';
import MerlinButton from './MerlinButton';
import MordredButton from './MordredButton';
import MiddleArea from './MiddleArea';
import ReadyButton from './ReadyButton';
import DeclineButton from './DeclineButton';
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

    joinGame() {
        console.log("JOIN_GAME");
        gamesocket.send({event: "JOIN_GAME"});
    }   

    startGame() {
        gamesocket.send({event: "START_GAME"});
    }

    handleClick(card) {
        const phase = this.props.game.currentPhase;
        let current = this.props.players.filter(p => p.id===this.props.playerId);

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

            case "PlayQuest":
                    if(card.type!=="weapon" && card.type!=="ally" && card.type!=="amour") return;
                    if(this.state.selected.map(c => c.name).includes(card.name)) return;
                    if(card.type==="amour" && 
                        current.field.map(c=>c.type).includes(card.type)) return;
                    this.state.selected.push(card);
                    break;

            case "PlayTourney":
                if(card.type!=="weapon" && card.type!=="ally" && card.type!=="amour") return;
                if(this.state.selected.map(c => c.name).includes(card.name)) return;
                if(card.type==="amour" && 
                    current.field.map(c=>c.type).includes(card.type)) return;
                this.state.selected.push(card);
                break;

            case "Arms":
                if(current.hand.map(c=>c.type).includes("weapon")){
                    if(this.state.selected.length<1 && card.type==="weapon") this.state.selected.push(card);
                }else if(current.hand.filter(c=>c.type==="foe").length>=2){
                    if(this.state.selected.length<2 && card.type==="foe") this.state.selected.push(card);
                }else if(current.hand.filter(c=>c.type==="foe").length===1){
                    if(this.state.selected.length<1 && card.type==="foe") this.state.selected.push(card);
                }
                break;

            case "DiscardTest":
                if(this.state.selected.length<current.bids) this.state.selected.push(card);
                break;

            case "Discard":
                if(current.hand.length-12>this.state.selected.length) this.state.selected.push(card);
                break;

            default:
                console.log(phase);
                console.log(card);

        }
    }

    ready(){
        const phase = this.props.game.currentPhase;
        let current = this.props.players.filter(p => p.id===this.props.playerId);
        switch(phase){
            case "JoinGame":
                gamesocket.send({event: "JOIN_GAME"});
                break;
            case "JoinQuest": 
                gamesocket.send({event: "JOIN_QUEST", value: true});
                break;
            case "JoinTournament":
                gamesocket.send({event: "JOIN_TOURNEY", value: true});
                break;
            case "SetupQuest":
                gamesocket.send({event: "SPONSOR_QUEST", value: true});
                break;
            case "PlayQuest":
                gamesocket.send({event: "PLAY_STAGE", data: this.state.selected});
                break;
            case "PlayTourney":
                gamesocket.send({event: "RUN_TOURNEY", data: this.state.selected});
                break;
            case "Arms":
                gamesocket.send({event: "DISCARD", data: this.state.selected});
                break;
            case "Discard":
                gamesocket.send({event: "DISCARD", data: this.state.selected});
                break;
            case "SponsorQuest":
                gamesocket.send({event: "SPONSOR_QUEST", value: true});
                break;
            default:
                console.log(phase);
        }
    }

    decline(){
        const phase = this.props.game.currentPhase;
        let current = this.props.players.filter(p => p.id===this.props.playerId);
        switch(phase){
            case "JoinQuest":
                gamesocket.send({event: "JOIN_QUEST", value: false});
                break;
            case "JoinTourney":
                gamesocket.send({event: "JOIN_TOURNEY", value: false});
                break;
            case "SponsorQuest":
                gamesocket.send({event: "SPONSOR_QUEST", value: false});
                break;
            default:
                console.log(phase);
        }
    }

    render() {
        let players = this.props.players;
        let current = this.props.players.filter(p => p.id===this.props.playerId);
        
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
                <MerlinButton onClickButton={this.joinGame} player={current[0]}/>
                <MordredButton onClickButton={this.startGame.bind(this)} player={current[0]}/>
                <MiddleArea revealedCard={this.props.game.revealedCard}/>
                <ReadyButton onClickButton={this.ready.bind(this)} phase={this.props.game.currentPhase}/>
                <DeclineButton onClickButton={this.decline.bind(this)} phase={this.props.game.currentPhase}/>
            </div>
            
        )
    }
}

export default connect(mapStateToProps, null)(Game);