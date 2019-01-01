import React, { Fragment } from 'react';

function Form(props) {
  let button;

  if (props.value.length < 1) {
    button = <button
                className="btn btn-outline-dark"
                type="button" >
                Chirp
                </button>
  } else {
    button = <button
                className="btn btn-outline-dark"
                type="button"
                onClick={props.onClick} >
                Chirp
                </button>
  }

  return (
    <Fragment>
      <nav
        className="navbar sticky-top navbar-light bg-light"
        styles={{ position: 'relative' }}>
        <div
          className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder='Say Something!'
            onChange={props.onChange}
            value={props.value} ></input>
          <div
            className="input-group-append">
            {button}
          </div>
        </div>
      </nav>
    </Fragment>
  )

}

export default Form;