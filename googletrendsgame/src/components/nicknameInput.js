import React, { Component } from 'react';
import ActiveButton from './activeButton';

export default class NicknameInput extends Component {
  constructor(props){
    super(props);

    this.state = {fieldValue: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.sendNickname = this.sendNickname.bind(this);
  }

  onInputChange(event) {
    this.setState({ fieldValue: event.target.value });
  }

  sendNickname(event){
      event.preventDefault();

      this.props.socket.emit('register', this.state.fieldValue);
      console.log("Sent Registration.")
      this.setState({fieldValue: ''})
  }

  render() {
     return(
       <div className="container-fluid game">
         <div className="row">

           <div className="col-xs-12 col-sm-7">

             <a className="logo">
               <div>WHAT</div>
               <div>THE </div>
               <div>TREND?!</div>
             </a>

             <div className="game__main">
         <form onSubmit={this.sendNickname}>
          <input className="login__input" maxLength="30" placeholder="Nickname" onChange = {this.onInputChange} value={this.state.fieldValue} />
          <span>
            <ActiveButton input = {this.state.fieldValue} type='register' />
          </span>
         </form>
       </div>
     </div>

     <div className="col-xs-12 col-sm-5 game__sidebar">

       <canvas className="scene scene--full" id="scene" ></canvas>

     </div>
   </div>
 </div>
     )
    }
}
