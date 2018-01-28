import React from 'react';
import RoomListItem from './RoomListItem';
import {modifyStateToCreateRoom} from '../App'

export default (props) => {
  let rooms = props.roomArray;
  console.log(rooms);
  if (rooms.length != 0) {
      let roomsList = rooms.map((room) =>
      <RoomListItem roomName={room.name} private={room.passwordBool} capacity={room.capacity} occupancy={room.occupants} />
    );
    return(
      <div>
       <div>{roomsList}</div>
       <button onClick={props.stateModifier}>Create Room</button>
      </div>
    );
  } else {
    return (
      <div>
        <div>No current rooms, you should create one!</div>
        <button onClick={props.stateModifier}>Create Room</button>
      </div>
    )
  }
}
