import React, { useState, useEffect } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import PxTargetTable from './PxTargetTable'
import { aggregatePTEnforcement } from '../MyUtil'
import SecurityConstants from '../SecurityConstants'


const PxTarget = () => {

  const [subscribed, setSubscribed] = useState(false)
  const [pxTargetArray, setPxTargetArray] = useState([])

  useEffect(() => {
    setSubscribed(false)
    myFetcher(`${SERVER_URL}/${VERSION}/api/px-target`)
    .then(fulfillment => {
        let index = 0
        fulfillment.forEach(pt => {
          if(pt.newPT || SecurityConstants.LIST_TYPES.includes(pt.ticker)) {
            pt.id = index.toString()
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

  return (
    <>
      <Modal centered size="lg" show={!subscribed} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Attention:</Modal.Title>
        </Modal.Header>
        <Modal.Body><h5>Server is handling your request...</h5><Spinner animation="border" variant="success" /></Modal.Body>
      </Modal>
      <div className="pxtarget-table-panel">
        <PxTargetTable data={pxTargetArray} />
      </div>
      <div className="pxtarget-button-panel">
        <Button variant="dark" onClick={savePxTarget}>Save</Button>{" "}
      </div>
    </>
  )
}
export default React.memo(PxTarget)
