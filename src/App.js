import logo from './logo.svg';
import './App.css';
import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { FormControl,InputLabel,FormHelperText,Input,Button,Grid,TextField} from '@material-ui/core';

import { Alert } from 'reactstrap';
export default class App extends React.Component{
  constructor(){
    super()
    this.state={
      userData:{
        name:"",
        email:"",
        mobile:"",
        date:""

      },
      isNameValid:true,
      isEmailValid:true,
      isMobileValid:true,
      isMobileValid:true,
      isDateValid:true,
      renderToast:false,
      toastColor:""

     
    }
  }
   
  handleName=(e)=>{
    
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        name: e.target.value,
      },
      isNameValid:true
    }));
  }
  handleEmail=(e)=>{
    
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        email: e.target.value,
      },
      isEmailValid :true
    }));
  }
  handleMobile=(e)=>{
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        mobile: e.target.value,
      },
      isMobileValid:true
    }));
  }
  handleDate=(e)=>{
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        date: e.target.value,
      },
      isDateValid:true
    }));
  }
  //This method makes a post call and stores the data.
   submit=(e)=>{
    e.preventDefault();
    let networkCall=true
    if(this.state.userData.name==""){
      networkCall=false;
      this.setState({
        isNameValid:false
      })
    }
    if(this.state.userData.email==""){
      networkCall=false;
      this.setState({
        isEmailValid:false
      })
    }
    if(this.state.userData.mobile==""){
      networkCall=false
      this.setState({
        isMobileValid:false
      })
    }
    if(this.state.userData.date==""){
      networkCall=false;
      this.setState({
        isDateValid:false
      })
    }
    
    if(networkCall){
      let {name,email,mobile,date}=this.state.userData
    axios({
      method: 'post',
      url: 'https://formapp-2de86-default-rtdb.firebaseio.com/formdata.json',
      data: {
        name,email,mobile,date
      },
      headers:{
            "Content-Type":"application/json"
          }
    })
   
    .then(data=>{
      console.log(data)
      if(data.status!=""){
        this.setState({
          renderToast:true,
          toastColor:"success",
          userData:{name:"",email:"",mobile:"",date:""}
        },()=>this.timeOutToast())
      }
    })
    }
    else{
      this.setState({
        renderToast:true,
      toastColor:"danger"

      },()=>this.timeOutToast())
    }


    
  }
  timeOutToast=()=>{
    setTimeout( ()=>{
      this.setState({
        renderToast:false,
        toastColor:""
      })
    
    },3000)
  }
  render(){

  return (
    
    <div className="container">
      <div className="Toast m-2">
       <Alert color={this.state.toastColor} isOpen={this.state.renderToast} in={this.state.renderToast}>
        {this.state.toastColor=="success"?"Your record has been saved Thank You!!":"There are items that require your attention."}
      </Alert>
      </div>
            
          <h1 className="mt-5">Travel Enquiry Form</h1>


     <div className="d-flex"> 
      <FormControl className="mr-5">
        <InputLabel htmlFor="name">Name </InputLabel>
          <Input id="name" name="name" aria-describedby="name-text" required={true} value={this.state.userData.name} onChange={(e)=>this.handleName(e)}/>
           <FormHelperText id="name-text" error={!this.state.isNameValid} >Not Anonymous?</FormHelperText>
     </FormControl >


     <FormControl >
          <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" name="email" aria-describedby="my-helper-text" value={this.state.userData.email} onChange={(e)=>this.handleEmail(e)}/>
        <FormHelperText id="my-helper-text"  error={!this.state.isEmailValid}>We'll never share your email.</FormHelperText>
        
      </FormControl>
    </div>

  
  <div className="d-flex">
  <FormControl className="mr-5">
    <InputLabel htmlFor="my-mobile">Mobile</InputLabel>
    <Input id="my-mobile" aria-describedby="my-mobile-text"value={this.state.userData.mobile} required={true} onChange={(e)=>this.handleMobile(e)}/>
    <FormHelperText id="my-mobile-text"  error={!this.state.isMobileValid}>We'll connect ASAP.</FormHelperText>
  
  
    </FormControl>
  <FormControl className="mt-3">  
  <TextField
    id="date"
    
    type="date"
    value={this.state.userData.date}
    onChange={(e)=>this.handleDate(e)}
    InputLabelProps={{
      shrink: true,
    }}
  />
   <FormHelperText id="my-mobile-text"  error={!this.state.isDateValid}>Expected Date of Journey.</FormHelperText>
  </FormControl>
  </div>
  


 
  


   


 
   
    <div className="mt-3">
    
    <FormControl>
    <Button role="submit"  variant="outlined"  color="primary" onClick={this.submit}>Submit</Button>
    </FormControl>
    </div>
  </div>
  );
}
}

