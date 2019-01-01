import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router,  } from 'react-router-dom';
import Chirp from './chirp';

class Details extends Component {

  constructor(params) {
    super(params)

    this.state = {
      chirps: {}
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    fetch(`http://localhost:3000/api/chirps/${this.props.match.params.id}`, {
      method: 'DELETE'
    })

    this.props.history.replace('/');
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
    return (
      <Chirp
        text={ this.state.chirps.text }
        key={ this.props.match.params.id }
        id={ this.props.match.params.id }
        details={ true }
        onClick={ this.handleClick } />
    )
  }
}

export default Details;