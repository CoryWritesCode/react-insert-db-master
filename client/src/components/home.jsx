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
      user: '',
      newUser: false,
      email: '',
      password: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck() {
    this.setState({
      newUser: !this.state.newUser
    })
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

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
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

    let newUserForm
    var {
      value,
      chirps,
      user,
      email,
      password,
      newUser
    } = this.state;
    var keys = Object.keys(chirps);

    if (newUser == true) {
      newUserForm =
      <Fragment>
      <Form
        value={email}
        onChange={this.handleEmailChange}
        display={newUser}
        placeholder={'email@email.com'}
      />
        <Form
          value={password}
          onChange={this.handlePasswordChange}
          display={newUser}
          placeholder={'Password'}
        />
        </Fragment>
    }

    return (
      <Fragment>
        <div
          className="navbar sticky-top navbar-white bg-white"
          styles={{ position: 'absolute' }}>
          <Form
            value={user}
            onChange={this.handleUserChange}
            placeholder={'User Info'}
            display={ false } />
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onClick={this.handleCheck}
              value="option1"></input>
            <label
              className="form-check-label"
              >
              New User?</label>
          </div>
          {newUserForm}
          <Form
            value={value}
            onClick={this.handleClick}
            onChange={this.handleChange}
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