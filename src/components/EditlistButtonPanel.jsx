import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { MyContext } from '../App'
import { formatDate } from '../MyUtil'
import MacroEconomicIndexConstants from '../MacroEconomicIndexConstants'

const EditlistButtonPanel = ({ loaded }) => {
  const { economicIndices } = useContext(MyContext)

  return (
      <>
        {loaded? 
          <div className="editlist-button-panel">
            <Button variant="dark">Add</Button>{' '}
            <Button variant="dark">Update</Button>{' '}
            <Button variant="dark">Delete</Button>{' '}
            <Button variant="dark">UpdSTKPx</Button>{' '}
            <Button variant="dark">Map</Button>{' '}
            <Button variant="dark">Test</Button>{' '}
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
          </div>
          :
          <div className="editlist-button-panel"><Button variant="warning">Loading All Watchlist Tickers...</Button></div> 
        }
      </>
  )
}

export default React.memo(EditlistButtonPanel)
