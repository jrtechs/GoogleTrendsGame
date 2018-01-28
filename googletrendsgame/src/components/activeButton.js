import React, { Component } from 'react';
import App from '../App'


export default class activeButton extends Component {

  render(){
    switch (this.props.type) {
      case 'register':
        if(this.props.input != ''){
          return(
            <button>Let's play!</button>
          )
        } else {
          return(
            <button disabled>Enter a nickname to play.</button>
          )
        }
      case 'createRoom':
        if(this.props.capacityInput !== '' && this.props.capacityInput <= 25 && this.props.capacityInput>=2 && this.props.capacityInput.length <= 2){
          return(
            <button onClick={this.props.goBack}>Create Room</button>
          )
        } else {
          return(
            <button disabled>Enter password (optional) and capacity to create a room.</button>
          )
        }
    }
  }

}
