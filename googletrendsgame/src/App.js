import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import NicknameInput from './components/NicknameInput';

const socket = openSocket('129.21.91.149:3000');

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

  }

  render() {
    return(
      <NicknameInput socket = {socket}/>
    )
  }
}

export default App;
