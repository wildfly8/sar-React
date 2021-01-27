import React, { useState, useEffect, useContext } from 'react'
import { Button, ProgressBar, Modal, Spinner } from 'react-bootstrap'
import { MyContext } from '../App'
import { formatDate } from '../MyUtil'
import MacroEconomicIndexConstants from '../MacroEconomicIndexConstants'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import { aggregateFullTickers } from '../MyUtil'


const EditlistButtonPanel = ({ loaded, editableMap }) => {
  const { economicIndices } = useContext(MyContext)
  const [subscribed, setSubscribed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showStartModal, setShowStartModal] = useState(false)
  const [showEndModal, setShowEndModal] = useState(false)

  useEffect(() => {
    if(subscribed) {
      setShowStartModal(true)
      setShowEndModal(false)
    } else if(!subscribed && progress === 100) {
      setShowStartModal(false)
      setShowEndModal(true)
    }
  }, [subscribed, progress])

  const addWatchlistSecurities = () => {
    setSubscribed(true)
    setProgress(0)
    const postMethodArgs = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aggregateFullTickers(editableMap))
    }
    myFetcher(`${SERVER_URL}/${VERSION}/api/watchlist/selected/add`, postMethodArgs)
    .then(fulfillment => {
        console.log(`${fulfillment} Company(s) Info have been added successfully!`)
      })
    .catch(error => console.log(`addWatchlistSecurities response error! ${error}`))
    .finally(() => {
      setProgress(100)
      setSubscribed(false)
    })
  }

  const updateWatchlistSecurities = () => {
    setSubscribed(true)
    setProgress(0)
    const putMethodArgs = {
      method: 'PUT',
    }
    myFetcher(`${SERVER_URL}/${VERSION}/${VERSION}/api/watchlist/all/update`, putMethodArgs)
    .then(fulfillment => {
        console.log(`${fulfillment} Company(s) Info have been updated successfully!`)
      })
    .catch(error => console.log(`updateWatchlistSecurities response error! ${error}`))
    .finally(() => {
      setProgress(100)
      setSubscribed(false)
    })
  }

  const deleteWatchlistSecurities = () => {
    setSubscribed(true)
    setProgress(0)
    const deleteMethodArgs = {
      method: 'DELETE',
    }
    myFetcher(`${SERVER_URL}/${VERSION}/api/watchlist/selected/delete?fullTickers=${aggregateFullTickers(editableMap)}`, deleteMethodArgs)
    .then(fulfillment => {
        console.log(`${fulfillment} Company(s) Info have been deleted completely!`)
      })
    .catch(error => console.log(`deleteWatchlistSecurities response error! ${error}`))
    .finally(() => {
      setProgress(100)
      setSubscribed(false)
    })
  }

  const handleUpdSTKPx = () => {
    setSubscribed(true)
    setProgress(10)
    const putMethodArgs = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: "needAPICall"
    }
    myFetcher(`${SERVER_URL}/${VERSION}/api/all/update-eod-px`, putMethodArgs)
    .then(fulfillment => console.log(`UpdSTKPx response: ${fulfillment} tickers' last EOD px have been updated in MongoDB.`))
    .catch(error => console.log(`UpdSTKPx response error! ${error}`))
    .finally(() => {
      setProgress(100)
      setSubscribed(false)
    })
  }

  const handleDialogueClose = () => {
    setShowEndModal(false)
    window.location = window.location.href
  }

  return (
    <>
      {loaded? (
        <div className="editlist-button-panel">
          <Modal centered size="lg" show={showStartModal} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title>Attention:</Modal.Title>
            </Modal.Header>
            <Modal.Body><h5>Server is handling your request...</h5><Spinner animation="border" variant="success" /></Modal.Body>
          </Modal>
          <Modal centered size="lg" show={showEndModal} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title>Attention:</Modal.Title>
            </Modal.Header>
            <Modal.Body><h5>Server has finished your request successfully.</h5></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDialogueClose}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Button variant="dark" onClick={addWatchlistSecurities}>Add</Button>{" "}
          <Button variant="dark" onClick={updateWatchlistSecurities}>Update</Button>{" "}
          <Button variant="dark" onClick={deleteWatchlistSecurities}>Delete</Button>{" "}
          <label>&nbsp;&nbsp;TYT Yield:</label> <span>TBD</span>{" "}
          <label>| FOMC:</label>{" "}
          <span>{economicIndices[MacroEconomicIndexConstants.FOMC_ANNOUNCEMENT] && formatDate(economicIndices[MacroEconomicIndexConstants.FOMC_ANNOUNCEMENT].nextReportDate)}</span>{" "}
          <label>| Monthly Jobs:</label>{" "}
          <span>{economicIndices[MacroEconomicIndexConstants.MONTHLY_EMPLOYMENT_SITUATION] && formatDate(economicIndices[MacroEconomicIndexConstants.MONTHLY_EMPLOYMENT_SITUATION].nextReportDate)}</span>{" "}
          <label>| Retail Sales:</label>{" "}
          <span>{economicIndices[MacroEconomicIndexConstants.MONTHLY_RETAIL_SALES] && formatDate(economicIndices[MacroEconomicIndexConstants.MONTHLY_RETAIL_SALES].nextReportDate)}</span>{" "}
          <label>| GDP:</label>{" "}
          <span>{economicIndices[MacroEconomicIndexConstants.MONTHLY_GDP_RELEASE] && formatDate(economicIndices[MacroEconomicIndexConstants.MONTHLY_GDP_RELEASE].nextReportDate)}</span>{" "}
          <label>&nbsp;&nbsp;</label>
          <Button variant="dark">Map</Button>{" "}
          <Button variant="dark">Test</Button>{" "}
          <Button variant="dark" onClick={handleUpdSTKPx}>UpdSTKPx</Button>{" "}
          <div className="progressbar">
            <ProgressBar variant="success" now={progress} label={`${progress}%`}/>
          </div>
        </div>
      ) : (
        <div className="editlist-button-panel">
          <Button variant="warning">Loading All Watchlist Tickers...</Button>
        </div>
      )}
    </>
  )
}

export default React.memo(EditlistButtonPanel)
