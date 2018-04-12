import React, {Component} from 'react';

class AIDropdown extends Component{

    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        const phase = props.phase;

        let options=[];
        for(let i=0;i<this.props.players;i++) options.push(i);

        if(phase==="Intro"){
            return(
                <div>
                    <span className='AIDropdownText'>How many AIs?</span>
                    <select onChange={(e) => props.AIChange(e)} className='AIDropdown'>
                        {options.map((i) =>{
                            return (<option value={i} key={i}>{i}</option>)
                        })}
                    </select>
                </div>
            )
        }else return null;
    }

}

export default AIDropdown;