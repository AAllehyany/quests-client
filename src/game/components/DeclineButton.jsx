import React, {Component} from 'react';

class DeclineButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        const phase = props.phase;

        if(phase==="JoinQuest" || phase==="JoinTourney" || phase==="SponsorQuest"){
            return(
                <button onClick={() => props.onClickButton()} className='DeclineButton'>
                    <span className="Decline">{"Decline"}</span>
                </button>
            )
        }else return null;
    }

}

export default DeclineButton;