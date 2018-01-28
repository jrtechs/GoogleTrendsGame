import React from 'react';
import User from './User'

export default (props) => {
  console.log(props.gameDataPassed);

  const nameArray = props.gameDataPassed.users.map(name => name.name);
  const scoreArray = props.gameDataPassed.users.map(score => score.score);
  const wordArray = props.gameDataPassed.users.map(word => word.word);

  console.log(nameArray);
  console.log(scoreArray);
  console.log(wordArray);

  var users = [];

  for(var i = 0; i < nameArray.length; i++){
    users.push(<User name={nameArray[i]} score={scoreArray[i]} word={wordArray[i]} />);
  }

  return(

    <div>
      {users}
      <h1>Leader: {props.gameDataPassed.roundWinner}</h1>
      <h1>Current Word: {props.gameDataPassed.currentWord}</h1>
    </div>
  )
}
