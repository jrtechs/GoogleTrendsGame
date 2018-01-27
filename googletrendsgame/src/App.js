import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      progression: '',
      roomList: []
    }
  }

  renderRooms(payload) {
    this.setState({
      roomList: payload,
      progression: 'register'
    });
    console.log(this.state.roomList);
  }

  componentDidMount(){
    const socket = openSocket('129.21.91.149:3000');
    socket.emit('register', 'User 2');
    //socket.emit('createRoom', {password: 'pass', capacity: 4});
    socket.emit('joinRoom', {roomName: 'pls', password: 'pass'});
    socket.on('sendRooms', payload => this.renderRooms(payload))
  }

  render() {
    if(this.state.progression === 'register'){
      return(
        <div>At least I can read the goddamn state</div>
      );
    } else {
      return(
        <div>FUBAR</div>
      );
    }
  }
}

export default App;
