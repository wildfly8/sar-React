import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import { Security, SecureRoute, LoginCallback, useOktaAuth } from '@okta/okta-react'
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
import SARNavBarWithRouter from './components/SARNavBarWithRouter'
import { SERVER_URL, myFetcher } from './api'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import './App.css'

export const MyContext = React.createContext()

const HasAccessToRouter = () => {
  const [economicIndices, setEconomicIndices] = useState({})
  const [userInfo, setUserInfo] = useState(null)
  const { authState, authService } = useOktaAuth()

  useEffect(() => {
    myFetcher(`${SERVER_URL}/api/findAllMacroEconomicIndices`)
    .then(fulfillment => {
        setEconomicIndices(fulfillment)
      })
    .catch(error => console.error(`API error when retrieving All Macro Economic Indices: ${error} !`))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUserInfo(null)
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info)
      })
    }
  }, [authState, authService])

  return (
      <MyContext.Provider value={{ economicIndices: economicIndices, user: [userInfo, setUserInfo], auth: [authState, authService] }}>
        <SARNavBarWithRouter userInfo={userInfo} authState={authState} authService={authService} />
        <Switch>
          <Route exact path="/" component={WatchList} />
          <Route exact path="/implicit/callback" component={LoginCallback} />
          <Route exact path="/login" component={CustomLoginComponent} />
          <Route exact path="/macro-econ" render={() => <MacroEcon economicIndices={economicIndices} />} />
          <Route exact path="/company-scan" component={CompanyScan} />
          <Route exact path="/rating-enforce" component={RatingEnforce} />
          <Route exact path="/screening" component={Screening} />
          <Route exact path="/valuation" component={Valuation} />
          <Route exact path="/px-target" component={PxTarget} />
          <Route exact path="/security-rank" component={SecurityRank} />
          <SecureRoute exact path="/profile" render={() => <Profile userInfo={userInfo} />}  />
        </Switch>
      </MyContext.Provider>
  )
}

const App = () => {
  const history = useHistory()

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push('/login')
  }

  return (
    <Router>
      <Security {...config.oidc} onAuthRequired={customAuthHandler}>
        <HasAccessToRouter />
      </Security>
    </Router>
)}

export default App
