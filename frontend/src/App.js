import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie';
import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import Trip from './components/trip';
import AddTrip from './components/addTrip';
import User from './components/user';
import Register from './components/register';
import TopBar from './components/topbar';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Cookies.get('userId') 
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

class App extends Component {
  state = {
    username: Cookies.get('userId') 
  }

  render() {
    return (
      <div className="background">
        <BrowserRouter>
          {Cookies.get('userId')
          ? <TopBar name={Cookies.get('userId')}></TopBar>
          : <div></div>}
          <Route path="/login" component={Login} exact/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path="/trip/:tripID" component={Trip} />
          <PrivateRoute path='/addtrip' component={AddTrip} exact/>
          <PrivateRoute path='/users/:user' component={User} exact/>
          <PrivateRoute path='/' component={Home} exact/>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
