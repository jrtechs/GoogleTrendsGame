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
      progression: 'register',
      roomsList: []
    }
    this.modifyStateToCreateRoom = this.modifyStateToCreateRoom.bind(this);
  }

  modifyStateToCreateRoom() {
    this.setState({
      progression: 'createRoom'
    });
  }

  componentDidMount(){
    socket.on('sendRooms', payload => {
      const rooms = payload.rooms;
      this.setState({
        progression: 'roomChoose',
        roomsList: rooms
      })
    });
  }

  render() {
    if (this.state.progression === 'register') {
      return(
        <NicknameInput socket = {socket}/>
      )
    } else if(this.state.progression === 'roomChoose') {
        return(
          <RoomList stateModifier={this.modifyStateToCreateRoom} roomArray = {this.state.roomsList}/>
        )

    } else if (this.state.progression === 'createRoom') {
      return(
        <CreateRoomInput socket = {socket}/>
      )
    }
  }
}

export default App;
