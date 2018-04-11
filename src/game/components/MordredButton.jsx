import React, {Component} from 'react';

class MordredButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        let player = this.props.player;
        if(player && props.player.hand.filter(c=>c.name==="Mordred").length>=1){
            return(
                <button onClick={() => props.onClickButton()} className='MordredButton'>
                    Use Mordred
                </button>
            )
        }
        return null
    }

}

export default MordredButton;