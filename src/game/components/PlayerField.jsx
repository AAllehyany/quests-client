import React, {Component} from 'react';


class PlayerField extends Component {

  constructor(props) {
    super(props);


  }
  render() {
    let props = this.props;
    let cards = this.props.cards;
    let classes =  ['Field', `${props.playerNumber}Field`];
    let image = (card) => props.faceDown === "yes" 
      ? "/image/Cards/Backs/adventure_back.jpg"
      : "/image/Cards/Adventure/" + card.name + ".jpg"
      
    return(
      <div className={classes.join(' ')}>
        {props.cards.map(card => (
          <img key={card.id} 
            className="card" 
            src={image(card)}/>
        ))}
      </div>
    )
  }
}

export default PlayerField;