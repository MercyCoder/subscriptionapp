import React from 'react';
import './App.css';
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.displaySubscriptions();
    this.state = {
      members: [],
      sortedSubscriptions: [],
      averagePrice: 0,
      nameSort: false,
      priceSort: false
    };
  };

  displaySubscriptions = () => {
    let abortController = new AbortController();
    axios.get(
      "http://localhost:3000/members"
    )
    .then(response => {
      if (response && response.data) {
        this.setState({ members: response.data});
        this.displayByPrice()
      }
    })
    .catch(error => {
      console.log("***** error: " , error);
    });
    abortController.abort();
  }

  sortMembers = () => {
    if (this.state.nameSort === false) {
      this.state.sortedSubscriptions.sort((a, b) => a.name > b.name ? 1 : -1);
      this.setState({nameSort: true});
      this.setState({priceSort: false});
      this.setState({sortedSubscriptions: this.state.sortedSubscriptions});
    }
    else {
      this.setState({priceSort: false});
      this.state.sortedSubscriptions.reverse();
      this.setState({sortedSubscriptions: this.state.sortedSubscriptions});
    }
  }

  displayByPrice = () => {
    if (this.state.priceSort === false) {
      let tempArray = [].concat(this.state.members).sort((a, b) => a.price > b.price ? -1 : 1);
      this.setState({sortedSubscriptions: tempArray});
      this.returnAveragePrice();
      this.setState({nameSort: false});
      this.setState({priceSort: true});

    }
    else {
      this.setState({nameSort: false});
      this.state.sortedSubscriptions.reverse();
      this.setState({sortedSubscriptions: this.state.sortedSubscriptions});
    }
  }

  returnAveragePrice = () => {
    let tempTotal = 0;
    let allSubscriptions = [];
    this.state.sortedSubscriptions.forEach(el => allSubscriptions.push(parseInt(el.price)));
    allSubscriptions.forEach(price => tempTotal += price);
    let tempAvgPrice = tempTotal / allSubscriptions.length;
    this.setState({averagePrice: tempAvgPrice});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"> SUBSCRIPTION MEMBERS
        </header>
        <div className="members">
        <div className="columnHeaders"> 
              <span className="name" onClick={this.sortMembers}> NAME </span>  
              <span className="subscription" onClick={this.displayByPrice}> SUBSCRIPTION</span>   
              <span className="cost" onClick={this.displayByPrice}> COST</span>
              <hr/>
            </div>
          <ul className="memberlist">{this.state.sortedSubscriptions.map((element, index) => {
             return <div key={index} id={index} className="row"> 
              <span className="name"> {element.name} </span>  
              <span className="subscription">{element.subscription}</span>   
              <span className="cost" >${parseInt(element.price).toFixed(2)}</span>
            </div>})}</ul>
        </div>
        <div >Average subscription cost : ${this.state.averagePrice.toFixed(2)}</div>
      </div>
    );
  }
}

export default App;
