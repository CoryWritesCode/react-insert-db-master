import React, { Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function Chirp(props) {
  let link;

  if (props.details == true) {
    link = [
      <div
        style={{ justifyContent: 'flex-end' }}
        key="lKey">
        <small className="card-subtitle mb-2">Created At: {props.time}</small>
        <br></br>
        <small className="card-text">
          Writen by {props.name}</small>
        <br></br>
        <Link
          className="btn btn-outline-light"
          style={{
            marginTop: '10px',
            marginRight: '10px'
            }}
          to={`${props.id}/edit`}>
          Edit
          </Link>
        <button
          className="btn btn-outline-light"
          style={{
            marginTop: '10px',
            marginRight: '10px'
            }}
          onClick={ props.onClick }>
          Delete
          </button>
      </div>
    ]
  } else {
    link = <Link
              className="btn btn-success btn-outline-light"
              style={{
                marginTop: '10px',
                marginRight: '10px'
                }}
              to={`chirps/${props.id}`}>
              Details
              </Link>
  }

  return (
    <Fragment>
      <div
        className="card text-white bg-success mb-3"
        style={{
          margin: '20px',
          fontWeight: 'bold'
          }}>
        <div className="card-body">
          <h4 className="card-title">
            {props.text}</h4>
          { link }
        </div>
      </div>
    </Fragment>
  )
}

export default Chirp;