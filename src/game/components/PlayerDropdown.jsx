import React, {Component} from 'react';

class PlayerDropdown extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        const phase = props.phase;

        if(phase==="Intro"){
            return(
                <div>
                    <p className='PlayerDropdownText'>How many players?</p>
                    <select onChange={(e) => props.playerChange(e)}className='PlayerDropdown'>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
            )
        }else return null;
    }

}

export default PlayerDropdown;