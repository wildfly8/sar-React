import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import PxTargetTable, { PX_TARGET_HEADERS }  from './PxTargetTable'

const EDIT_TABLE_ROWS = 200
let editableInitArray = Array(EDIT_TABLE_ROWS).fill(0).map((_, i) => ({[PX_TARGET_HEADERS.id]: i, [PX_TARGET_HEADERS.isNew]: true, [PX_TARGET_HEADERS.ticker]: null, [PX_TARGET_HEADERS.systemRating]: '', [PX_TARGET_HEADERS.enforcedRating]: '', [PX_TARGET_HEADERS.enforcedReason]: ''}))

const PxTarget = () => {

  const [editableArray, setEditableArray] = useState([])

  useEffect(() => {
    myFetcher(`${SERVER_URL}/${VERSION}/api/px-target`)
    .then(fulfillment => {
        // setEditableArray([...fulfillment.map(e => assembleRatingEnforcementTableRow(e)), ...editableInitArray])
      })
    .catch(error => console.error(`API error when retrieving All Px Targets: ${error} !`))
    // eslint-disable-next-line
  }, [])

  const savePxTarget = () => {
    const postMethodArgs = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(aggregateEditableRatingEnforcements(editableArray))
    }
    myFetcher(`${SERVER_URL}/${VERSION}/api/px-target/save`, postMethodArgs)
    .then(fulfillment => {
        console.log(`PxTargets have been saved successfully!`)
      })
    .catch(error => console.log(`save PxTargets error! ${error}`))
  }

  return (
    <>
      <div className="pxtarget-table-panel">
        <PxTargetTable data={editableArray} />
      </div>
      <div className="pxtarget-button-panel">
        <Button variant="dark" onClick={savePxTarget}>Save</Button>{" "}
      </div>
    </>
  )
}
export default React.memo(PxTarget)
