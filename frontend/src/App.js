import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import AddUser from "./components/AddUser";
import AllUsers from "./components/AllUsers";
import UserDetails from "./components/UserDetails";
import EditUser from "./components/EditUser";
class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path='/' component={AllUsers} />
          <Route exact path='/addUser' component={AddUser} />
          <Route exact path='/user/:id' component={UserDetails} />
          <Route exact path='/edit/:id' component={EditUser} />
        </Router>
      </div>
    );
  }
}

export default App;
