import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WatchList from './components/WatchList'
import MacroEcon from './components/MacroEcon'
import CompanyAnalysis from './components/CompanyAnalysis'
import RatingEnforce from './components/RatingEnforce'
import Screening from './components/Screening'
import Valuation from './components/Valuation'
import PxTarget from './components/PxTarget'
import NavBar from './components/NavBar'
import { SERVER_URL, VERSION, myFetcher } from './api'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import './App.css'

export const MyContext = React.createContext()

const AppShell = () => {
  const [economicIndices, setEconomicIndices] = useState([])
  const [treasuryYield, setTreasuryYield] = useState(null)
  const [vix, setVix] = useState(null)

  useEffect(() => {
    myFetcher(`${SERVER_URL}/${VERSION}/api/macro-economic-indices`)
      .then(fulfillment => {
        setEconomicIndices(fulfillment)
      })
      .catch(error => console.error(`API error when retrieving All Macro Economic Indices: ${error} !`))
    myFetcher(`${SERVER_URL}/${VERSION}/api/ticker-eod-px?tickers=TYT,%5EVIX`)
      .then(fulfillment => {
        setTreasuryYield(fulfillment['TYT'])
        setVix(fulfillment['^VIX'])
      })
      .catch(error => console.error(`API error when retrieving ticker EOD Px: ${error} !`))
  }, [])

  return (
    <MyContext.Provider value={{ economicIndices, treasuryYield, vix }}>
      <NavBar />
      <Switch>
        <Route exact path="/" render={(props) => <WatchList {...props} />} />
        <Route exact path="/macro-econ" render={(props) => <MacroEcon {...props} economicIndices={economicIndices} />} />
        <Route exact path="/company-analysis" render={(props) => <CompanyAnalysis {...props} />} />
        <Route exact path="/rating-enforce" render={(props) => <RatingEnforce {...props} />} />
        <Route exact path="/screening" render={(props) => <Screening {...props} />} />
        <Route exact path="/valuation" render={(props) => <Valuation {...props} />} />
        <Route exact path="/px-target" render={(props) => <PxTarget {...props} />} />
      </Switch>
    </MyContext.Provider>
  )
}

const App = () => (
  <Router>
    <AppShell />
  </Router>
)

export default App
