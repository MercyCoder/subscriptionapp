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
      sortedSubscriptions: [],
      averagePrice: 0
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
    this.returnAveragePrice();
  }
  returnAveragePrice = () => {
    let tempTotal = 0;
    let allSubscriptions = [];
    this.state.sortedSubscriptions.forEach(el => allSubscriptions.push(parseInt(el.price)));
    allSubscriptions.forEach(price => tempTotal += price);
    console.log("temp total ******", tempTotal, allSubscriptions)
    let tempAvgPrice = tempTotal / allSubscriptions.length;
    this.setState({averagePrice: tempAvgPrice})
    console.log(tempAvgPrice)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"> SUBSCRIPTION MEMBERS
        </header>

        <div className="members">
        <div className="columnHeaders"> 
              <span className="name"> NAME </span>  
              <span className="subscription">SUBSCRIPTION</span>   
              <span className="cost" >COST</span>
              <hr/>
            </div>
          <ul className="memberlist">{this.state.sortedSubscriptions.map((element, index) => {
             return <div id={index} className="row"> 
              <span className="name"> {element.name} </span>  
              <span className="subscription">{element.subscription}</span>   
              <span className="cost" >${parseInt(element.price).toFixed(2)}</span>
            </div>})}</ul>
        </div>
        <div >Average subscription cost :  ${this.state.averagePrice.toFixed(2)}</div>
      </div>
    );
  }
}

export default App;
