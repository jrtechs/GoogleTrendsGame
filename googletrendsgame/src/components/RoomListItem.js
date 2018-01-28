import React, {Component} from 'react';

export default class RoomListItem extends Component {
  constructor(props){
    super(props);

    this.state={
      term:''
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
  }


  onInputChange(event) {
    this.setState( { term: event.target.value });
  }

  buttonClickHandler(event){
    this.props.socket.emit('joinRoom', {roomName: this.props.roomName, password: this.state.term});
  }


render(){
  if (this.props.private === false){
    console.log("The public listItem was called")
    return(
      <li className = 'lobby__room'>
        <span className="lobby__room-name">{this.props.roomName}'s Room</span>
        <span className="lobby__room-occupancy">{this.props.occupancy}/{this.props.capacity}</span>
        <span className="lobby__room-name">Public</span>
        <span className="lobby__room-status"><button type="submit" onClick={this.buttonClickHandler}>Join Room</button></span>
      </li>
    )
  } else {
    console.log("the private listItem was called")
    return(
      <li className = 'lobby__room'>
        <span className="lobby__room-name">{this.props.roomName}'s Room</span>
        <span className="lobby__room-occupancy">{this.props.occupancy}/{this.props.capacity}</span>
        <span className="lobby__room-occupancy">Private</span>
        <span className="field--nickname"><input onChange={this.onInputChange} /></span>
        <span className="lobby__room-status"><button type="submit" onClick={this.buttonClickHandler}>Join Room</button></span>
      </li>
    )
  }
  }
}
