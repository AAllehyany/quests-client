import React, {Component} from 'react';


class PlayerHand extends Component {

  constructor(props) {
    super(props);


  }
  render() {
    let props = this.props;
    let classes =  ['Hand', `${props.playerNumber}Hand`];

    return(
      <div className={classes.join(' ')}>
        {props.cards.map(card => (
          <div key={card.id} 
            onClick={() => props.onCardClick(card)} 
            className="card" 
            style={{ backgroundImage: `url(${card.image})` }}></div>
        ))}
      </div>
    )
  }
}

export default PlayerHand;