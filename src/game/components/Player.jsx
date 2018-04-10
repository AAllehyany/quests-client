import React, {Component} from 'react';


class Player extends Component {

  constructor(props) {
    super(props);


  }
  render() {
    let props = this.props;
    let cards = this.props.cards;
    let classes =  [`${props.playerNumber}`];

    return(
      <div className={classes.join(' ')}>

      </div>
    )
  }
}

export default Player;