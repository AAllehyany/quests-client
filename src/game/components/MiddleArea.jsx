import React, {Component} from 'react';


class MiddleArea extends Component {

  constructor(props) {
    super(props);


  }
  render() {
    let props = this.props;

    return(
      <div className="MiddleArea">
        <div className="midCard" 
          style={{ backgroundImage: `url(${props.revealedCard})` }}></div>
          <div className="midCard" 
          style={{ backgroundImage: `url(${props.revealedCard})` }}></div>
      </div>
    )
  }
}

export default MiddleArea;