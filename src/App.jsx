import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from './firebase/Firebase';
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import AddMovie from "./pages/AddMoive";
// import Edit from "./pages/Edit";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Header from "./components/Header";
import './styles/common.scss';


const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  });
  // const logout = () => {
  //   firebase.auth().signOut()
  // }
  return (
    <>
    
    <Router>
      <Header user={user}/> 
      {user ? (

      <main>
        <Switch>
          <Route path="/AddMovie" component={AddMovie} />
          <Route exact path="/" component={Home} />
          <Route path="/404" component={NoMatch} />
          <Route exact path="/:id" component={MovieDetail} />
          {/* <Route path="/edit/:id" component={Edit} /> */}
        </Switch>
      </main>
    
    ) : (
      <>
      <h1 className="Name">USER</h1>
      <Login />
      </>
    )}
    </Router>
    </>
  );
};
export default App;