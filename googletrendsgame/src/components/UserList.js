import React from 'react';
import User from './User'

export default (props) => {
  var users = props.users;

  var userList = users.map((user) =>
    <User name={user.name} score={user.score} word={user.word}>
  );
  return(
    <div>
      <ol> {userList} </ol>
    </div>
  );
}
