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
    this.props.socket.emit('joinRoom', {roomName: this.props.roomName, password: this.state.term})
  }


render(){
  if (this.props.private === 'false'){
    return(
      <div>
        <h1>{this.props.roomName}'s Room</h1>
        <h3>{this.props.occupancy}/{this.props.capacity}</h3>
        <h5>Public</h5>
        <button type="submit" onClick={this.buttonClickHandler}>Join Room</button>
      </div>
    );
  } else {
    return(
      <div>
        <h1>{this.props.roomName}'s Room</h1>
        <h3>{this.props.occupancy}/{this.props.capacity}</h3>
        <h5>Private</h5>
        <input onChange={this.onInputChange} placeholder="Password"></input>
        <button type='submit' onClick={this.buttonClickHandler}>Join Room</button>
      </div>
    )
  }
}
}
