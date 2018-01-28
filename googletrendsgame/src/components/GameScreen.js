import React, {Component} from 'react';
import UserList from './UserList';

export default class GameScreen extends Component{
  constructor(props){
    super(props);

    console.log(this.props.gameData);

    this.state={
      userScore:0,
      round:1,
      inputValue: '',
      currentWord: ''
    }
  }

    setInputState(word) {
      this.setState({
        input: word
      });
    }

    render(){
      return(
        <UserList gameDataPassed={this.props.gameData} userArray = {this.props.gameData.users} />
      )
    };
  }
