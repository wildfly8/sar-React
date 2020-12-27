import React from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react'
import config from './config'
import WatchList from './components/WatchList'
import MacroEcon from './components/MacroEcon'
import CompanyScan from './components/CompanyScan'
import RatingEnforce from './components/RatingEnforce'
import Screening from './components/Screening'
import Valuation from './components/Valuation'
import PxTarget from './components/PxTarget'
import SecurityRank from './components/SecurityRank'
import CustomLoginComponent from './components/Login'
import Profile from './components/Profile'
import { MyContextProvider } from './MyContext'
import SARNavBarWithRouter from './components/SARNavBarWithRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import './App.css'


const HasAccessToRouter = () => {
  const history = useHistory()

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push('/login')
  };

  return (
    <Security {...config.oidc} onAuthRequired={customAuthHandler}>
      <MyContextProvider>
        <SARNavBarWithRouter />
        <Switch>
          <Route path="/" exact component={WatchList} />
          <Route path="/implicit/callback" exact component={LoginCallback} />
          <Route path="/login" exact component={CustomLoginComponent} />
          <Route path="/macro-econ" exact component={MacroEcon} />
          <Route path="/company-scan" exact component={CompanyScan} />
          <Route path="/rating-enforce" exact component={RatingEnforce} />
          <Route path="/screening" exact component={Screening} />
          <Route path="/valuation" exact component={Valuation} />
          <Route path="/px-target" exact component={PxTarget} />
          <Route path="/security-rank" exact component={SecurityRank} />
          <SecureRoute path="/profile" exact component={Profile} />
        </Switch>
      </MyContextProvider>
    </Security>
  );
}

const App = () => {

  return (
    <Router>
      <HasAccessToRouter />
    </Router>
)}

export default App
