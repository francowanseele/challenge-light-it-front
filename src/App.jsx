import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './config/routes';
import AuthProvider from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router> 
        <Switch>
          {routes.map((route,index) => (
            <RouteWithSubRouters key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  )
}

// function to create routes
function RouteWithSubRouters(route) {
    return (
      <Route 
        path={route.path}
        exact={route.exact}
        render={props => <route.component routes={route.routes} {...props} />} 
      />
    );
  }

export default App;
