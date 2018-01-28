import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import NicknameInput from './components/NicknameInput';
import CreateRoomInput from './components/CreateRoomInput';
import RoomList from './components/RoomList';

const socket = openSocket('129.21.91.149:3000');

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      progression: 'createRoom',
      roomList: []
    }
  }

  componentDidMount(){
  }

  stateHandler(){
    socket.on('sendRooms', payload => this.setState({
    progression: 'roomChoose',
    roomList: payload.rooms
    }));
  }

  render() {
    if (this.state.progression === 'register') {
      return(
        <NicknameInput socket = {socket}/>
      )
    } else if(this.state.progression === 'roomChoose') {

        return(
          <RoomList roomArray = {this.state.roomList}/>
        )

    } else if (this.state.progression === 'createRoom') {
      return(
        <CreateRoomInput socket = {socket}/>
      )
    }
  }
}

export default App;
