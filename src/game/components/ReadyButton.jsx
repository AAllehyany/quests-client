import React, {Component} from 'react';

class MerlinButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        return(
            <button onClick={() => props.onClickButton()} className='ReadyButton'>
                <span className="Ready">{"Ready"}</span>
            </button>
        )
    }

}

export default MerlinButton;