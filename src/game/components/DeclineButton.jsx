import React, {Component} from 'react';

class DeclineButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        const phase = props.phase;
        const sponsor = props.sponsorId;
        const player = props.playerId;

        if(player === sponsor && phase === "RunQuest") return null;

        if(phase==="RunQuest" || phase==="JoinTourney" || phase==="SponsorQuest"){
            return(
                <button onClick={() => props.onClickButton()} className='DeclineButton'>
                    <span className="Decline">{"Decline"}</span>
                </button>
            )
        }else return null;
    }

}

export default DeclineButton;