import React, {Component} from 'react';


class MiddleArea extends Component {

  constructor(props) {
    super(props);


  }
  render() {
    let props = this.props;
    let cards = this.props.cards;
   // let classes =  ['MiddleArea', `${props.playerNumber}`];

    return(
      <div className={classes.join(' ')}>

      </div>
    )
  }
}

export default MiddleArea;