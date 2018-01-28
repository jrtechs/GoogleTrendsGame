import React, {Component} from 'react';
import UserList from './UserList';
import WordInput from './wordInput';

export default class GameScreen extends Component{
  constructor(props){
    super(props);

    console.log(this.props.gameData);

    this.state={
      inputValue: ''
    }
  }



    render(){
      if(this.props.gameData.gameState === 3){
        return(
          <div>
            <h2>Round:</h2>
            <h1>Results!</h1>
            <h1>Round Winner{this.props.gameData.roundWinner}</h1>
            <UserList gameDataPassed={this.props.gameData} />
          </div>
        )
      } else if(this.props.gameData.gameState === 2){
          console.log('multiple players in lobby')
          return(
            <div>
              <h1>Round: {this.props.gameData.round}</h1>
              <h1>Current Word: {this.props.gameData.currentWord}</h1>
              <UserList gameDataPassed={this.props.gameData} />
              <WordInput active='true' socket={this.props.socket} />
            </div>
          )
        } else if (this.props.gameData.gameState === 1){
          console.log('single player method called')
          return(
            <div>
              <h2>Round: {this.props.gameData.round}</h2>
              <h1></h1>
              <UserList gameDataPassed={this.props.gameData} />
              <WordInput active='false' socket={this.props.socket} />
            </div>
          )
        }
    };
  }
