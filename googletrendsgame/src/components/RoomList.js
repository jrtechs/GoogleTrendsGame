import React, { Component } from 'react';
import RoomListItem from 'roomListItem';

class RoomList extends Component {

  renderRooms(roomArray) {
      return(
        <RoomListItem key = {room.name} roomName = {room.name} private = {room.passwordBool} capacity = {room.capacity} occupancy = {room.occupants} />
      )
  }

  render(){
    return(
      <div>
        {this.props.roomArray.map(this.renderRooms)}
      </div>
    )
  }
}
