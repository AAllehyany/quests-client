import React, {Component} from 'react';

class StartButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        const phase = props.phase;

        if(phase==="Intro"){
            return(
                <button onClick={() => props.onClickButton()} className='StartButton'>
                    <span className="Start">{"START"}</span>
                </button>
            )
        }else return null;
    }

}

export default StartButton;