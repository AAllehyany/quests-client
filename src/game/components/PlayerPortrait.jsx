import React, {Component} from 'react';


class PlayerPortrait extends Component {

  constructor(props) {
    super(props);


  }
  render() {
    let props = this.props;
    let player = this.props.player;
    let classes =  ['PlayerPortrait', `${props.playerNumber}`];

    return(
      <div className={classes.join(' ')}>
        <div className='PlayerShield'>
          <span className='ShieldAmount'>{player.shields}</span>
        </div>
        <div className='PlayerPower'>
          <span className='BattlePower'>{player.bp}</span>
        </div>
      </div>
    )
  }
}

export default PlayerPortrait;