import React, {Component} from 'react';

class MerlinButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        let player = this.props.player;
        let hasMerlin = true;
        
        if(hasMerlin){
            return(
                <button className='MerlinButton'>
                    <span className="MerlinUse">{"Use Merlin"}</span>
                </button>
            )
        }
        return null
    }

}

export default MerlinButton;