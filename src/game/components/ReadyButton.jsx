import React, {Component} from 'react';

class MerlinButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        const phase = this.props.game.currentPhase;
        
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
        }else if(phase==="JoinQuest" || phase==="JoinTourney"){
            return(
                <button onClick={() => props.onClickButton()} className='ReadyButton'>
                    <span className="Ready">{"Join"}</span>
                </button>
            )
        }else if(phase==="SponsorQuest"){
            <button onClick={() => props.onClickButton()} className='ReadyButton'>
                <span className="Ready">{"Sponsor"}</span>
            </button>
        }
    }

}

export default MerlinButton;