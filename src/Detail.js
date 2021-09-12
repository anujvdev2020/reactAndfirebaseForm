import logo from './logo.svg';
import './App.css';
import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'



export default class Detail extends React.Component{
  constructor(props){
    super(props)
    this.state={
      userData:{},
      redirectToTable:false
    }
  }
  componentWillMount=()=>{
      this.setState({
          userData:this.props.location.state
      })
  }
  handleRedirectToTable=()=>{
    this.setState({
        redirectToTable:true
    })
  }
  render(){
      if(this.state.redirectToTable){
        return <Redirect  to={{
            pathname: '/',
            
        }}/>;
      }
  return (
    <div className="App">
        {/* <button onClick={this.handleRedirectToTable}>Go Back</button>
        <h1>Hello</h1>
        <div>
            <h2>Name {this.state.userData.name}</h2>
            <h2>Email {this.state.userData.email}</h2>

        </div> */}
    </div>
  );
}
}

