import React, {Component} from 'react';

class CheatButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        const phase = props.phase;

        if(phase==="PlayQuest"){
            return(
                <button onClick={() => props.onClickButton()} className='CheatButton'>
                    <span className="Cheat">{"CHEAT"}</span>
                </button>
            )
        }else return null;
    }

}

export default CheatButton;