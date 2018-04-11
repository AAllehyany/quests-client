import React, {Component} from 'react';

class MerlinButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        let player = this.props.player;
        console.log(player)
        if(player && props.player.field.filter(c=>c.name==="Merlin").length>=1){
            return(
                <button onClick={() => props.onClickButton()} className='MerlinButton'>
                    <span className="MerlinUse">Use Merlin</span>
                </button>
            )
        }
        return null
    }

}

export default MerlinButton;