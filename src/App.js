import React from 'react';
import './App.css';
import axios from "axios";
import { element } from 'prop-types';

class App extends React.Component {
  constructor() {
    super();
    this.displaySubscriptions();
    this.state = {
      members: [],
      sortedSubscriptions: []
    };
  };

  displaySubscriptions = () => {
    let abortController = new AbortController();
    axios.get(
      "http://localhost:3000/members"
    )
    .then(response => {
      if (response && response.data) {
        console.log("this is the data! ", response.data )
        this.setState({ members: response.data});
        this.displayByPrice()
      }
    })

    .catch(error => {
      console.log("***** error: " , error);
    });
    abortController.abort();
  }
  displayByPrice = () => {
    let tempArray = [].concat(this.state.members).sort((a, b) => a.price > b.price ? -1 : 1);
    this.setState({sortedSubscriptions: tempArray})
    console.log("this is sorted subscriptions!", this.state.sortedSubscriptions)
    console.log("this is the temp array", tempArray)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div>Members</div>
        <div>Members:  {this.state.members.map(element => element.name)}
          <ol>{this.state.sortedSubscriptions.map((element, index) => { return <div key={index}>{element.name} {element.id} {element.subscription} {element.price}</div>})}</ol>
        </div>
      </div>
    );
  }
}

export default App;
