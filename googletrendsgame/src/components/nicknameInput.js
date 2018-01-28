import React, { Component } from 'react';
import ActiveButton from './activeButton';

export default class NicknameInput extends Component {
  constructor(props){
    super(props);

    this.state = {fieldValue: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.sendNickname = this.sendNickname.bind(this);
  }

  onInputChange(event) {
    this.setState({ fieldValue: event.target.value });
  }

  sendNickname(event){
      event.preventDefault();

      this.props.socket.emit('register', this.state.fieldValue);
      console.log("Sent Registration.")
      this.setState({fieldValue: ''})
  }

  render() {
     return(
       <form onSubmit={this.sendNickname}>
        <input maxLength="30" placeholder="Enter a nickname..." onChange = {this.onInputChange} value={this.state.fieldValue} />
        <span>
          <ActiveButton input = {this.state.fieldValue} type='register' />
        </span>
       </form>
     )
    }
}
