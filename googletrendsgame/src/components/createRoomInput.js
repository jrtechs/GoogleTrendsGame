import React, { Component } from 'react';
import ActiveButton from './activeButton';

export default class CreateRoomInput extends Component {
  constructor(props){
    super(props);

    this.state={
      passwordFieldValue: '',
      capacityFieldValue:''
    }
    //test Comment
    this.onInputChangePass = this.onInputChangePass.bind(this);
    this.onInputChangeCapacity = this.onInputChangeCapacity.bind(this);
    this.sendRoomData = this.sendRoomData.bind(this);
  }

  onInputChangePass(event) {
    this.setState({ passwordFieldValue: event.target.value });
  }

  onInputChangeCapacity(event) {
    this.setState({ capacityFieldValue: event.target.value});
  }

  sendRoomData(event){
    event.preventDefault();

    this.props.socket.emit('createRoom', {password: this.state.passwordFieldValue, capacity: this.state.capacityFieldValue});
    this.setState({ passwordFieldValue: '', capacityFieldValue: '' });
  }

  render(){
    return(
      <form onSubmit={this.sendRoomData}>
        <input type="password" placeholder="Password" onChange = {this.onInputChangePass} value={this.state.passwordFieldValue} />
        <input type='number' placeholder="Max room members" onChange = {this.onInputChangeCapacity} value={this.state.capacityFieldValue} />
        <span>
          <ActiveButton passInput={this.state.passwordFieldValue} capacityInput={this.state.capacityFieldValue} type='createRoom' />
        </span>
      </form>
    )
  }

}
