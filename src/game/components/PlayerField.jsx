import React, {Component} from 'react';


class PlayerField extends Component {

  constructor(props) {
    super(props);


  }
  render() {
    let props = this.props;
    let cards = this.props.cards;
    let classes =  ['Field', `${props.playerNumber}Field`];

    return(
      <div className={classes.join(' ')}>

      </div>
    )
  }
}

export default PlayerField;