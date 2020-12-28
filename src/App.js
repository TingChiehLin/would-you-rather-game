import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import Login from './components/Login/Login';
import LoadingBar from 'react-redux-loading-bar'

import Home from './components/Home/Home';
import Addquestion from './components/Addquestion/Addquestion';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import NoMatch from './components/NoMatch/NoMatch';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import { connect } from 'react-redux';
import { login_result } from './store/action';

import {
  CSSTransition
} from "react-transition-group";

function App(props) {

  const [authedUser, setAuthedUser] = useState("");

  useEffect(() => {
    props.loadUsers();
    //problems
    console.log('authedUser:',authedUser);
  })

  return (
    <React.Fragment>
      <LoadingBar style={{ backgroundColor: '#008ce0', height: '5px' }}/>
      <Router>
        <ScrollToTop />
            {props.authedUser !== '' && <Navigation/>}
        <CSSTransition
          classNames="fade"
          timeout={300}
        >
        <Switch>
          {props.authedUser === '' && <Route component={Login}/>}
          <Route path='/' exact component={Home}/>
          <Route path='/leaderboard' exact component={Leaderboard}/>
          <Route path='/addquestion' exact component={Addquestion}/>
          <Route path='/questions/:question_id' exact component={Addquestion}/>
          <Route path="*">
            <NoMatch />
          </Route>

          {/* {props.authedUser === '' ? (<Route path='/' exact component={Login}/> )
          : (
          <>
            <Route path='/' exact component={Home}/>
            <Route path='/leaderboard' exact component={Leaderboard}/>
            <Route path='/addquestion' exact component={Addquestion}/>
            <Route path='/:question_id' exact component={Addquestion}/>
            <Route path="*">
              <NoMatch />
            </Route>
          </>
          )} */}

        </Switch>
        </CSSTransition>
        <Footer/>
      </Router>
    </React.Fragment>
  );
}


export default connect(
  (state) => ({
    authedUser: state.users.authedUser
  }),{
    loadUsers: login_result
  }
)(App);

