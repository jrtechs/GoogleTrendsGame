import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import NicknameInput from './components/nicknameInput';
import CreateRoomInput from './components/createRoomInput';
import RoomList from './components/RoomList';
import GameScreen from './components/GameScreen';

const socket = openSocket('129.21.91.149:3000');

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      progression: 'register',
      roomsList: [],
      roomUpdateData: {}
    }

    socket.on('sendRooms', payload => {
      console.log(payload);
      this.setState({
        roomsList: payload.rooms,
        progression: 'roomChoose'
      })
    });

    socket.on('roomUpdate', payload => {
      this.setState({
        progression: 'gameScreen',
        roomUpdateData: payload
      })
    })
    this.modifyStateToCreateRoom = this.modifyStateToCreateRoom.bind(this);
    this.modifyStateToRoomsScreen = this.modifyStateToRoomsScreen.bind(this);
    this.modifyStateToGameScreen = this.modifyStateToGameScreen.bind(this);
  }

  modifyStateToCreateRoom() {
    this.setState({
      progression: 'createRoom'
    });
  }

  modifyStateToGameScreen() {
    this.setState({
      progression: 'gameScreen'
    });
  }

  modifyStateToRoomsScreen(){
    this.setState({
      progression: 'roomChoose'
    });
  }

  render() {
    if (this.state.progression === 'register') {
      return(
        <NicknameInput socket = {socket}/>
      )
    } else if(this.state.progression === 'roomChoose') {
        return(
          <RoomList socket = {socket} stateModifier={this.modifyStateToCreateRoom} roomsArray = {this.state.roomsList} />
        )

    } else if (this.state.progression === 'createRoom') {
      return(
        <CreateRoomInput  goToRoom={this.modifyStateToGameScreen} socket = {socket} />
      )
    } else if (this.state.progression === 'gameScreen') {
      return(
        <GameScreen socket = {socket} gameData={this.state.roomUpdateData} />
      )
    }
  }
}

export default App;
