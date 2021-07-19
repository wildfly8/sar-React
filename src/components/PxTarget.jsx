import React, { useState, useEffect } from 'react'
import { Button, Modal, Spinner, ProgressBar } from 'react-bootstrap'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import PxTargetTable from './PxTargetTable'
import { aggregatePTEnforcement } from '../MyUtil'
import SecurityConstants from '../SecurityConstants'


const PxTarget = () => {

  const [pxTargetArray, setPxTargetArray] = useState([])
  const [subscribed, setSubscribed] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setSubscribed(false)
    myFetcher(`${SERVER_URL}/${VERSION}/api/px-target`)
    .then(fulfillment => {
        let index = 0
        fulfillment.forEach(pt => {
          if(pt.newPT || SecurityConstants.LIST_TYPES.includes(pt.ticker)) {
            pt.id = index
            index++
          }
        })
        setPxTargetArray(fulfillment)       
      })
    .catch(error => console.error(`API error when retrieving All Px Targets: ${error} !`))
    .finally(() => setSubscribed(true))
    // eslint-disable-next-line
  }, [])

  const savePxTarget = () => {
    const postMethodArgs = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aggregatePTEnforcement(pxTargetArray))
    }
    myFetcher(`${SERVER_URL}/${VERSION}/api/px-target/save`, postMethodArgs)
    .then(fulfillment => {
        console.log(`PxTargets have been saved successfully!`)
      })
    .catch(error => console.log(`save PxTargets error! ${error}`))
    .finally(() => window.location = window.location.href)
  }

  const updatePx = () => {
    requestYahooQuote(pxTargetArray)
  }

  const requestYahooQuote = async (pxTargetArray) => {
    let index = 0
    for(let pt of pxTargetArray) {  //cannot use forEach here for async/await because forEach won't await 
      if(!SecurityConstants.LIST_TYPES.includes(pt.ticker)) {
        const response = await fetch(`${SERVER_URL}/${VERSION}/api/yahoo-quote?ticker=${pt.ticker.replace('^', '%5E')}`);
        const jsonResponse = await response.json();
        if(jsonResponse && pt.lastPx) {
          pt.dailyPercentChg = (jsonResponse - pt.lastPx) / pt.lastPx
        }
        //calculate currently looped List average dChg
        if(pt.sector === 'ETF') {
          pxTargetArray[0].dailyPercentChg = pxTargetArray.filter(e => 'ETF' === e.sector && e.dailyPercentChg != null).reduce((accumulator, currentValue, currentIndex) => (accumulator + currentValue.dailyPercentChg) / (currentIndex + 1), 0.0)
        } else {
          pxTargetArray.filter(e => {
            if(pt.propRatingCode == null) {
              if(pt.newPT) {
                return 'New_List' === e.ticker
              } else {
                return 'NR_List' === e.ticker
              }
            } else {
              return `${pt.propRatingCode.replace('+', '')}_List` === e.ticker
            }
          })[0].dailyPercentChg = pxTargetArray.filter(e => ((pt.propRatingCode == null && e.propRatingCode == null) || (pt.propRatingCode === e.propRatingCode)) && e.dailyPercentChg != null).reduce((accumulator, currentValue, currentIndex) => (accumulator + currentValue.dailyPercentChg) / (currentIndex + 1), 0.0)
        }
      }
      index++
      setProgress(Math.round(100 * index / pxTargetArray.length))
    }
    setProgress(100)
  }

  const securityRank = () => {
    
  }

  return (
    <>
      <Modal centered size="lg" show={!subscribed} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Attention:</Modal.Title>
        </Modal.Header>
        <Modal.Body><h5>Loading All Watchlist Tickers...</h5><Spinner animation="border" variant="success" /></Modal.Body>
      </Modal>
      <div className="pxtarget-table-panel">
        <PxTargetTable data={pxTargetArray} />
      </div>
      <div className="pxtarget-button-panel">
        <Button variant="dark" onClick={savePxTarget}>Save</Button>{" "}
        <Button variant="dark" onClick={securityRank}>Rank</Button>{" "}
        <Button variant="dark" onClick={updatePx}>UpdatePx</Button>{" "}
        <div className="progressbar">
          <ProgressBar variant="success" now={progress} label={`${progress}%`}/>
        </div>
      </div>
    </>
  )
}
export default React.memo(PxTarget)
