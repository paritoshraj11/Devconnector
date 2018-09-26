import React from 'react';
import {Route,Redirect} from "react-router-dom";
import { connect } from 'react-redux';

const PrivateRoute = ({auth,component:Component,...rest}) => {
  return    <Route  render ={(props)=>(auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login"  />)} {...rest}/>
}

const mapStateToProps = (store) =>{
    return {
        auth:store.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute)