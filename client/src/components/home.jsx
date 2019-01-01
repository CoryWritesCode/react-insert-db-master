import React, { Component, Fragment } from 'react';
import 'isomorphic-fetch';
import Chirp from './chirp';
import Form from './form'

class Home extends Component {
  constructor(params) {
    super(params)

    this.state = {
      chirps: {},
      value: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleClick() {
    let text = { text: this.state.value }

    fetch('http://localhost:3000/api/chirps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(text)
    })

    this.setState({
      value: ''
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

    var { value, chirps } = this.state;
    var keys = Object.keys(chirps);
    keys.pop();

    return (
      <Fragment>
        <Form
          value={value}
          onClick={this.handleClick}
          onChange={this.handleChange} />
        <Fragment>
          {keys.map((val) => {
            let text = chirps[val].text;
            return <Chirp
                      text={text}
                      key={val.toString()}
                      id={`${val.toString()}`}
                      details={ false }/>
          })}
        </Fragment>
      </Fragment>
    )
  }
}

export default Home;