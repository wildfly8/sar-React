import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react'
import config from './config'
import WatchList from './components/WatchList'
import CompanyScan from './components/CompanyScan'
import RatingEnforce from './components/RatingEnforce'
import Screening from './components/Screening'
import Valuation from './components/Valuation'
import PxTarget from './components/PxTarget'
import SecurityRank from './components/SecurityRank'
import CustomLoginComponent from './components/Login'
import Profile from './Profile'
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
        <Route path="/" exact component={WatchList} />
        <Route path="/implicit/callback" exact component={LoginCallback} />
        <Route path="/login" exact component={CustomLoginComponent} />
        <Route path="/company-scan" exact component={CompanyScan} />
        <Route path="/rating-enforce" exact component={RatingEnforce} />
        <Route path="/screening" exact component={Screening} />
        <Route path="/valuation" exact component={Valuation} />
        <Route path="/px-target" exact component={PxTarget} />
        <Route path="/security-rank" exact component={SecurityRank} />
        <SecureRoute path="/profile" exact component={Profile} />
      </MyContextProvider>
    </Security>
  );
}

const App = () => {

  return (
    <Router>
      <Fragment>
        <HasAccessToRouter />
      </Fragment>
    </Router>
)}

export default App
