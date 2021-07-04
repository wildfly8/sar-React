import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import RatingEnforcementTable, { RATING_ENFORCEMENT_HEADERS }  from './RatingEnforcementTable'
import { aggregateEditableRatingEnforcements, assembleRatingEnforcementTableRow } from '../MyUtil'


const EDIT_TABLE_ROWS = 200
let editableInitArray = Array(EDIT_TABLE_ROWS).fill(0).map((_, i) => ({[RATING_ENFORCEMENT_HEADERS.id]: i, [RATING_ENFORCEMENT_HEADERS.isNew]: true, [RATING_ENFORCEMENT_HEADERS.ticker]: null, [RATING_ENFORCEMENT_HEADERS.systemRating]: '', [RATING_ENFORCEMENT_HEADERS.enforcedRating]: '', [RATING_ENFORCEMENT_HEADERS.enforcedReason]: ''}))

const RatingEnforce = () => {
  const [editableArray, setEditableArray] = useState([])

  useEffect(() => {
    myFetcher(`${SERVER_URL}/${VERSION}/api/rating-enforcement`)
    .then(fulfillment => {
      setEditableArray([...fulfillment.map(e => assembleRatingEnforcementTableRow(e)), ...editableInitArray])
      })
    .catch(error => console.error(`API error when retrieving All Rating Enforcements: ${error} !`))
    // eslint-disable-next-line
  }, [])

  const saveRatingEnforcements = () => {
    const postMethodArgs = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aggregateEditableRatingEnforcements(editableArray))
    }
    myFetcher(`${SERVER_URL}/${VERSION}/api/rating-enforcement/save`, postMethodArgs)
    .then(fulfillment => {
        console.log(`RatingEnforcements have been saved successfully!`)
      })
    .catch(error => console.log(`saveRatingEnforcements response error! ${error}`))
    .finally(() => {
      window.location = window.location.href
    })
  }

  return (
    <div>
      <div className="rating-enforcement-table-panel">
        <RatingEnforcementTable data={editableArray} />
      </div>
      <div className="rating-enforcement-button-panel">
        <Button variant="dark" onClick={saveRatingEnforcements}>Save</Button>{" "}
      </div>
    </div>
  )
}
export default React.memo(RatingEnforce)
