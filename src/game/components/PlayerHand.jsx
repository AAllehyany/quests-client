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
          <img key={card.id} 
            onClick={() => props.onCardClick(card)} 
            className="card" 
            src={"/image/Cards/Adventure/" + card.name + ".jpg"}/>
        ))}
      </div>
    )
  }
}

export default PlayerHand;