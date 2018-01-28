import React from 'react';

export default (props) => {
  if (props.private = false){
    const privateString = "Public"
  } else {
    const privateString = "Private"
  }
  return(
    <div>
      <h1>{props.roomName}</h1>
      <h3>`${props.occupancy}/${props.capacity}`</h3>
      <p>{privateString}</p>
    </div>
  )
}
