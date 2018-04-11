import React from 'react';
import {connect} from 'react-redux';

import {hide} from '../ducks';

//import './modal.styl';

const Modal = ({modal, dismiss}) => {
  if(modal.show) {
    return (
      <div onClick={dismiss} className={"modal " + modal.title}>
        <h1 className="title">{modal.title}</h1>
        <p className="body">{modal.message}</p>
      </div>
    )
  }

  return null;
}

const mapProps = ({modal}) => ({
  modal
})

const mapDispatch = (dispatch) => ({
  dismiss: () => dispatch(hide()) 
})

export default connect(mapProps, mapDispatch)(Modal);