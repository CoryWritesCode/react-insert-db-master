import React, { Component, Fragment } from 'react';
import 'isomorphic-fetch';
import Chirp from './chirp';
import Form from './form'

class Home extends Component {
  constructor(params) {
    super(params)

    this.state = {
      chirps: {},
      value: '',
      user: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);

  }

  handleClick() {
    let obj = {
      text: this.state.value,
      user: this.state.user
    }

    fetch('http://localhost:3000/api/chirps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(obj)
    })

    this.setState({
      value: '',
      user: ''
    });

    fetch('http://localhost:3000/api/chirps')
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

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleUserChange(e) {
    this.setState({
      user: e.target.value
    });
  }

  componentWillMount() {

    fetch('http://localhost:3000/api/chirps')
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

    var { value, chirps, user } = this.state;
    var keys = Object.keys(chirps);

    return (
      <Fragment>
        <div
          className="navbar sticky-top navbar-white bg-white"
          styles={{ position: 'absolute' }}>
          <Form
            value={user}
            onClick={this.handleClick}
            onChange={this.handleUserChange}
            placeholder={'User Info'}
            display={ false } />
          <Form
            value={value}
            onClick={this.handleClick}
            onChange={this.handleChange}
            onUserChange={this.handleUserChange}
            placeholder={'Say Something!'} />
        </div>
        <Fragment>
          {keys.map((val) => {
            let text = chirps[val].text;
            let id = chirps[val].id;
            return <Chirp
                      text={text}
                      key={id}
                      id={`${id}`}
                      details={ false }/>
          })}
        </Fragment>
      </Fragment>
    )
  }
}

export default Home;