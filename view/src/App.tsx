import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/Login';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
