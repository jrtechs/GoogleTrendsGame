import React from 'react';
import RoomListItem from './RoomListItem';
import {modifyStateToCreateRoom} from '../App'

export default (props) => {
  let rooms = props.roomsArray;
  console.log(props);
  if (rooms.length != 0) {
    const roomNameArray = rooms.map(room => room.name);
    const publicPrivateArray = rooms.map(room => room.passwordBool);
    const capacityArray = rooms.map(room => room.capacity);
    const occupancyArray = rooms.map(room => room.occupants);

    var roomsArray = [];

    for(var i = 0; i < roomNameArray.length; i++){
      roomsArray.push(<RoomListItem roomName={roomNameArray[i]} occupancy={occupancyArray[i]} private={publicPrivateArray[i]} capacity={capacityArray[i]} socket={props.socket} />);
    }

    return(
      <div>
        <ul>
          <li className="lobby__room">
            <span className="lobby__room-name">Room Name</span>
            <span className="lobby__room-occupancy">Occupancy</span>
            <span className="lobby__room-status">Status</span>
          </li>
          {roomsArray}
        </ul>
       <button onClick={props.stateModifier}>Create Room</button>
      </div>
    )
  } else {
    return (
      <div>
        <div>No current rooms, you should create one!</div>
        <button onClick={props.stateModifier}>Create Room</button>
      </div>
    )
  }
}
