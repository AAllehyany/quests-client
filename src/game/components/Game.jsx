import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Game.css';

import Player from './Player';
import MerlinButton from './MerlinButton';
import MordredButton from './MordredButton';

const mapStateToProps = (state) => ({
    players: state.game.players,
    playerId: state.game.playerId
});

class Game extends Component {

    constructor(props) {
        super(props);
        this.props = props;
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
                    />
                ) }
                {/* <MerlinButton player={current}/>
                <MordredButton player={current}/> */}

                
            </div>
            
        )
    }
}

export default connect(mapStateToProps, null)(Game);