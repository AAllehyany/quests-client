import React, {Component} from 'react';
import PlayerPortrait from './PlayerPortrait';
import PlayerField from './PlayerField';

class Player extends Component {

  constructor(props) {
    super(props);


  }
  render() {
    let props = this.props;
    let cards = this.props.cards;

    return(
      <div>
        <PlayerPortrait playerNumber={props.playerNumber} player={props.player} />
        <PlayerField playerNumber={props.playerNumber} cards={[]} />
      </div>
    )
  }
}

export default Player;