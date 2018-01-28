import React, { Component } from 'react';
import App from '../App'


export default class activeButton extends Component {

  render(){
    switch (this.props.type) {
      case 'register':
        if(this.props.input != ''){
          return(
            <button className="button__top">Let's play!</button>
          )
        } else {
          return(
            <button className="button__top" disabled>Enter a nickname to play.</button>
          )
        }
      case 'createRoom':
        if(this.props.capacityInput !== '' && this.props.capacityInput <= 25 && this.props.capacityInput>=2 && this.props.capacityInput.length <= 2){
          return(
            <button>Create Room</button>
          )
        } else {
          return(
            <button disabled>Enter password (optional) and capacity to create a room.</button>
          )
        }
      case 'inputWord':
        if(this.props.input != '' && this.props.input <= 20){
          return(
            <button>Submit my answer!</button>
          )
        } else {
          return(
            <button disabled>Enter a term!</button>
          )
        }
    }
  }

}
