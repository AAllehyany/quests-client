import React, {Component} from 'react';
import { connect } from 'react-redux';

import './Game.css';

import PlayerPortrait from './PlayerPortrait';
import MerlinButton from './MerlinButton';
import MordredButton from './MordredButton';

const mapStateToProps = (state) => ({
    players: state.game.players
});

class Game extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        let players = this.props.players;
        
        return (
            <div>
                {players.map((player, index) => 
                    <PlayerPortrait 
                        playerNumber={`Player${index+1}`}
                        key={player.id}
                        player={player}
                    />
                ) }
                <MerlinButton/>
                <MordredButton/>

                <div className="Field Player1Field"></div>
                <div className="Field Player2Field"></div>
                <div className="Field Player3Field"></div>
                <div className="Field Player4Field"></div>
            </div>
            
        )
    }
}

export default connect(mapStateToProps, null)(Game);