import React from 'react';
import FontAwesome from 'react-fontawesome';

export default (props) => {
  console.log('entered user obj')
  const name = props.name;
  const score = props.score;
  var word;
  if (props.word === ''){
    word = 'true'
  } else {
    word = 'false'
  }
    if (word === 'true') {
      console.log('Word is true');
      return(
      <div>
        <div>Name: {name}</div>
        <div>Score: {score}</div>
        <FontAwesome name='check-circle' />
      </div>
    )
  } else {
    console.log('Word is false')
    return (
      <div>
        <div>Name: {name}</div>
        <div>Score: {score}</div>
        <FontAwesome name='times-circle' />
      </div>
    )
  }
}
