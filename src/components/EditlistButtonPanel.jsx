import React, { useState, useContext } from 'react'
import { Button, ProgressBar } from 'react-bootstrap'
import { MyContext } from '../App'
import { formatDate } from '../MyUtil'
import MacroEconomicIndexConstants from '../MacroEconomicIndexConstants'
import { SERVER_URL, myFetcher } from '../api'


const EditlistButtonPanel = ({ loaded }) => {
  const { economicIndices } = useContext(MyContext)
  const [progress, setProgress] = useState(0)

  const handleUpdSTKPx = () => {
    const putMethodArgs = {
      method: 'PUT',
      headers: {
       'Content-type': 'application/json'
      },
      body: "needAPICall"
    }
    myFetcher(`${SERVER_URL}/api/updateTickerLastEODPx/all`, putMethodArgs)
    .then(fulfillment => console.log(`UpdSTKPx response: ${fulfillment} tickers' last EOD px have been updated in MongoDB.`))
    .catch(error => console.log(`UpdSTKPx response error! ${error}`))
    .finally(() => setProgress(100))
    setProgress(10)
  }

  return (
      <>
        {loaded? 
          <div className="editlist-button-panel">
            <Button variant="dark">Add</Button>{' '}
            <Button variant="dark">Update</Button>{' '}
            <Button variant="dark">Delete</Button>{' '}
            <label>&nbsp;&nbsp;TYT Yield:</label>{' '}
            <span>TBD</span>{' '}
            <label>| FOMC:</label>{' '}
            <span>{economicIndices[MacroEconomicIndexConstants.FOMC_ANNOUNCEMENT] && formatDate(economicIndices[MacroEconomicIndexConstants.FOMC_ANNOUNCEMENT].nextReportDate)}</span>{' '}
            <label>| Monthly Jobs:</label>{' '}
            <span>{economicIndices[MacroEconomicIndexConstants.MONTHLY_EMPLOYMENT_SITUATION] && formatDate(economicIndices[MacroEconomicIndexConstants.MONTHLY_EMPLOYMENT_SITUATION].nextReportDate)}</span>{' '}
            <label>| Retail Sales:</label>{' '}
            <span>{economicIndices[MacroEconomicIndexConstants.MONTHLY_RETAIL_SALES] && formatDate(economicIndices[MacroEconomicIndexConstants.MONTHLY_RETAIL_SALES].nextReportDate)}</span>{' '}
            <label>| GDP:</label>{' '}
            <span>{economicIndices[MacroEconomicIndexConstants.MONTHLY_GDP_RELEASE] && formatDate(economicIndices[MacroEconomicIndexConstants.MONTHLY_GDP_RELEASE].nextReportDate)}</span>{' '}
            <label>&nbsp;&nbsp;</label>
            <Button variant="dark">Map</Button>{' '}
            <Button variant="dark">Test</Button>{' '}
            <Button variant="dark" onClick={handleUpdSTKPx}>UpdSTKPx</Button>{' '}
            <div className="progressbar">
              <ProgressBar variant="success" now={progress} label={`${progress}%`} />
            </div>
          </div>
          :
          <div className="editlist-button-panel"><Button variant="warning">Loading All Watchlist Tickers...</Button></div> 
        }
      </>
  )
}

export default React.memo(EditlistButtonPanel)
