import React, {Component} from 'react';


class PlayerHand extends Component {

  constructor(props) {
    super(props);


  }
  render() {
    let props = this.props;
    let classes =  ['Hand', `${props.playerNumber}Hand`];
    let image = (card) => props.faceDown === "yes" 
      ? "/image/Cards/Backs/adventure_back.jpg"
      : "/image/Cards/Adventure/" + card.name + ".jpg"
    return(
      <div className={classes.join(' ')}>
        {props.cards.map(card => (
          <img key={card.id} 
            onClick={() => props.onCardClick(card)} 
            className="card" 
            src={image(card)}/>
        ))}
      </div>
    )
  }
}

export default PlayerHand;