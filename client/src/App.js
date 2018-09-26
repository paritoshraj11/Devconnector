import React, { Component } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  NavBar,
  Landing,
  Footer,
  Login,
  Register,
  Dashboard,
  PrivateRoute,
  CreateProfile,
  EditProfile,
  AddExperience,
  AddEducation,
  Profiles,
  Profile
} from "./component/index";
import store from "./store";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser, logOutUser, clearCurrentProfile } from "./action";

//getting token
let token = localStorage.getItem("alexaToken");
if (token) {
  //seting authentication header in request
  setAuthToken(token);
  //seting user in token
  store.dispatch(setCurrentUser(token));
} else {
  store.dispatch(clearCurrentProfile());
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route path="/" exact component={Landing} />
            <div className="container">
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/profiles" exact component={Profiles} />
              <Route path="/profile/:handle" exact component={Profile} />
              <Switch>
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/create-profile"
                  exact
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/edit-profile"
                  exact
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/add-experience"
                  exact
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/add-education"
                  exact
                  component={AddEducation}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
