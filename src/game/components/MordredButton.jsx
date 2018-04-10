import React, {Component} from 'react';

class MordredButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        let player = this.props.player;
        let hasMordred = true;
        
        if(hasMordred){
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