import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Game.css';

import Player from './Player';
import MerlinButton from './MerlinButton';
import MordredButton from './MordredButton';
import MiddleArea from './MiddleArea';
import ReadyButton from './ReadyButton';
import DeclineButton from './DeclineButton';
import CheatButton from './CheatButton';
import gamesocket from '../../gamesocket';

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

    handleClick(card) {
        const phase = this.props.game.currentPhase;
        let current = this.props.players.filter(p => p.id===this.props.playerId);
        console.log("Card clicked");

        switch(phase) {
            case "SetupQuest":
                if(card.type !== "foe" && card.type !== "tests" && card.type !== "weapon") {
                    return;
                }
                gamesocket.send({event: "ADD_CARD_SPONSOR", data: card.id});
                break;

            case "PlayQuest":
                    if(card.type!=="weapon" && card.type!=="ally" && card.type!=="amour") return;
                    if(this.state.selected.map(c => c.name).includes(card.name)) return;
                    if(card.type==="amour" && 
                        current.field.map(c=>c.type).includes(card.type)) return;
                    gamesocket.send({event: "ADD_CARD_QUEST", data: card.id});
                    break;

            case "SetupTourney":
                gamesocket.send({event: "ADD_CARD_TOURNEY", data: card.id});
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
            case "RunQuest":
                gamesocket.send({event: "JOIN_QUEST", joined: true, playerId: this.props.playerId});
                break;
            case "JoinTourney":
                gamesocket.send({event: "JOIN_TOURNEY", joined: true, playerId: this.props.playerId});
                break;
            case "SetupTourney":
                gamesocket.send({event: "SETUP_TOURNEY"});
                break;
            case "SetupQuest":
                gamesocket.send({event: "SETUP_QUEST"});
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
            case "HandleEvent":
                gamesocket.send({event: "HANDLE_EVENT"})
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
                gamesocket.send({event: "JOIN_TOURNEY", joined: false, playerId: this.props.playerId});
                break;
            case "SponsorQuest":
                gamesocket.send({event: "SPONSOR_QUEST", value: false});
                break;
            case "RunQuest":
                gamesocket.send({event: "JOIN_QUEST", joined: false, playerId: this.props.playerId});
                break;
            default:
                console.log(phase);
        }
    }

    merlin(){
        let s = null;
        if(s) gamesocket.send({event: "MERLIN", stage: s});
    }

    mordred(){
        let p = null;
        let a = null;
        if(p && a) gamesocket.send({event: "MORDRED", owner: this.props.playerId, player: p, ally: a});
    }

    cheat(){
        gamesocket.send({event: "CHEAT"});
    }

    render() {
        let players = this.props.players;
        let current = this.props.players.filter(p => p.id===this.props.playerId);
        
        return (
            <div>
                {current.map(player => 
                    <Player 
                        playerNumber="Player1"
                        key={player.id}
                        player={player}
                        handleCardClick={this.handleClick.bind(this)}
                    />
                )}

                {players.filter(p => p.id != this.props.playerId).map((player, index) => 
                    <Player 
                        playerNumber={`Player${index+2}`}
                        key={player.id}
                        player={player}
                        faceDown="yes"
                        
                    />
                ) }

                <MerlinButton onClickButton={this.merlin.bind(this)} player={current[0]}/>
                <MordredButton onClickButton={this.mordred.bind(this)} player={current[0]}/>
                <MiddleArea revealedCard={this.props.game.revealedCard} cards={this.props.game.middleCards}/>
                <ReadyButton player={this.props.playerId} game={this.props.game} onClickButton={this.ready.bind(this)} phase={this.props.game.currentPhase}/>
                <DeclineButton onClickButton={this.decline.bind(this)} phase={this.props.game.currentPhase}/>
                <CheatButton onClickButton={this.cheat.bind(this)}/>

                <div className="CurrentPhase">{this.props.game.currentPhase}</div>
            </div>
            
        )
    }
}

export default connect(mapStateToProps, null)(Game);