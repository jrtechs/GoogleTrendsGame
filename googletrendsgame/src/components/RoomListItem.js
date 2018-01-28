import React from 'react';

export default (props) => {
  var privateString =''
  if (props.private === false){
    privateString = "Public"
  } else {
    privateString = "Private"
  }
  return(
    <div>
      <h1>{props.roomName}'s Room</h1>
      <h3>{props.occupancy}/{props.capacity}</h3>
      <h5>{privateString}</h5>
    </div>
  )
}
