import React, { Component } from 'react';

export default class activeButton extends Component {

  render(){
    if (this.props.input != ''){
      return(
        <button>Let's play!</button>
      )
    } else {
      return(
        <button>Enter a nickname.</button>
      )
    }
  }

}
