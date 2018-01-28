import React from 'react';
import FontAwesome from 'react-fontawesome';

export default (props) => {
  const name = this.props.name;
  const score = this.props.score;
  var word;
  if (this.props.word === ''){
    word = 'true'
  } else {
    word = 'false'
  }


    if (word === 'true') {
      return(
      <li>
        <div>{name}</div>
        <div>{score}</div>
        <FontAwesome name='check-circle' />
      </li>
    )
  } else {
    return (
      <li>
        <div>Name: {name}</div>
        <div>Score: {score}</div>
        <FontAwesome name='times-circle' />
      </li>
    )
  }
}
