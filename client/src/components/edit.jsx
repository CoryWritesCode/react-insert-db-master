import React, { Component, Fragment } from 'react';
import 'isomorphic-fetch';
import Chirp from './chirp';

class Edit extends Component {
  constructor(params) {
    super(params)

    this.state= {
      chirps: {},
      value: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    let text = { text: this.state.value }

    fetch(`http://localhost:3000/api/chirps/${this.props.match.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(text)
    })

    this.setState({
      value: ''
    });

    this.props.history.goBack();
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  componentWillMount() {

    fetch(`http://localhost:3000/api/chirps/${this.props.match.params.id}`)
      .then((res) => {
        return res.json();
      })
      .then(
        (json) => {

          this.setState({
            chirps: json,
          })
        },
        (err) => {
          console.log(err);
        }
      )
  }

  render() {
    let button;

    if (this.state.value.length < 1) {
      button = <button
                  className="btn btn-outline-light"
                  type="button">
                  Update Chirp
                  </button>
    } else {
      button = <button
                  className="btn btn-outline-light"
                  type="button"
                  onClick={this.handleClick}>
                  Update Chirp
                  </button>
    }

    return (
      <Fragment
        key={this.props.match.params.id}>
        <div
          className="card text-white bg-success mb-3"
          style={{
            margin: '20px',
            fontWeight: 'bold'
            }}>
          <div
            className="card-body"
            style={{
              display: 'flex',
              justifyContent: 'space-between'
              }}>
            <p
              className="card-text">
              {this.state.chirps.text}
              </p>
          </div>
          <div
            className="input-group mb-3"
            style={{
              paddingLeft: '20px',
              paddingRight: '20px'
              }}>
            <input
              type="text"
              className="form-control"
              placeholder='Say Something!'
              onChange={this.handleChange}
              value={this.state.value} >
              </input>
            <div
              className="input-group-append">
              {button}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Edit;