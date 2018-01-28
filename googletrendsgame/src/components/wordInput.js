import React, {Component} from 'react';
import ActiveButton from './activeButton';

export default class wordInput extends Component {
  constructor(props){
    super(props);

    this.state={fieldValue:''}

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event){
      console.log(event.target.value)
      this.setState({ fieldValue: event.target.value });
  }

  onSubmit(event){
    event.preventDefault();
    console.log(this.state.fieldValue);
    this.props.socket.emit('submitWord', this.state.fieldValue);
  }

  render() {
    return(
      <form onSubmit={this.onSubmit}>
        <input onChange={this.onInputChange} placeholder="e.g. green" />
        <span>
          <button placeholder="Submit my Answer!" type="submit"></button>
        </span>
      </form>
    )
  }
}
