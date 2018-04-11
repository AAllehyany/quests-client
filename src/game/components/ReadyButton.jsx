import React, {Component} from 'react';

class ReadyButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        const phase = props.phase;

        if(phase==="SetupQuest" || phase==="PlayStage" || phase==="PlayTourney"){
            return(
                <button onClick={() => props.onClickButton()} className='ReadyButton'>
                    <span className="Ready">{"Ready"}</span>
                </button>
            )
        }else if(phase==="Arms" || phase==="Discard"){
            return(
                <button onClick={() => props.onClickButton()} className='ReadyButton'>
                    <span className="Ready">{"Discard"}</span>
                </button>
            )
        }else if(phase==="JoinQuest" || phase==="JoinTourney" || phase==="JoinGame"){
            return(
                <button onClick={() => props.onClickButton()} className='ReadyButton'>
                    <span className="Ready">{"Join"}</span>
                </button>
            )
        }else if(phase==="SponsorQuest"){
            return(
                <button onClick={() => props.onClickButton()} className='ReadyButton'>
                    <span className="Ready">{"Sponsor"}</span>
                </button>
            )
        }
        else if(phase==="HandleEvent"){
            return(
                <button onClick={() => props.onClickButton()} className='ReadyButton'>
                    <span className="Ready">handle event</span>
                </button>
            )
        }
        else return null;
    }

}

export default ReadyButton;