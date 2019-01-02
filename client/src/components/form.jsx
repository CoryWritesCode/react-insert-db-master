import React, { Fragment } from 'react';

function Form(props) {
  let button;

  if (props.display == false) {
    button = <button
                className="btn btn-outline-danger"
                type="button"
                disabled >
                Required*
                </button>
  } else if (props.display == true) {
    button = <button
                className="btn btn-outline-danger"
                type="button"
                disabled >
                Required*
                </button>
  } else if (props.value.length < 1) {
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
      <nav>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value} ></input>
          <div className="input-group-append">
            {button}
          </div>
        </div>
      </nav>
    </Fragment>
  )

}

export default Form;