import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
//import { createBrowserHistory } from 'history';
import { Router,Route } from'react-router'
import  BlogsPage  from './BlogsPage'
import {TempPage } from './TempPage'
import Main from './main' 
import {Header} from './Header'



class App extends Component {
  render() {
    return (
      <div>
          <Header/>
             <div className='container'>
          <Main/>
          </div>
      </div>
    );
  }
}
export default App;
 