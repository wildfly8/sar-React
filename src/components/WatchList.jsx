import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Button } from 'react-bootstrap'
import WatchListTable, { WATCHLIST_HEADERS } from './WatchListTable'
import EditlistButtonPanel from './EditlistButtonPanel'
import SecurityConstants from '../SecurityConstants'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import { assembleWatchlistTableRow } from '../MyUtil'

const READONLY_TABLE_ROWS = 100
const EDIT_TABLE_ROWS = 100
let readonlyInitMap = {}
SecurityConstants.TRADED_SECTORS.forEach(e => {
  readonlyInitMap = {...readonlyInitMap, ...{[e]: Array(READONLY_TABLE_ROWS).fill(0).map((_, i) => ({[WATCHLIST_HEADERS.id]: i, [WATCHLIST_HEADERS.ticker]: '', [WATCHLIST_HEADERS.exchange]: null}))}}
})
let editableInitMap = {}
SecurityConstants.TRADED_SECTORS.forEach(e => {
  editableInitMap = {...editableInitMap, ...{[e]: Array(EDIT_TABLE_ROWS).fill(0).map((_, i) => ({[WATCHLIST_HEADERS.id]: i, [WATCHLIST_HEADERS.ticker]: '', [WATCHLIST_HEADERS.exchange]: null}))}}
})

const WatchList = () => {
  const [tabKey, setTabKey] = useState(SecurityConstants.SECTOR_ETF)
  const [loaded, setLoaded] = useState(false)
  const [readonlyMap, setReadonlyMap] = useState(readonlyInitMap)
  const [editableMap, ] = useState(editableInitMap)
  const [error, setError] = useState('')

  useEffect(() => {
    let isSubscribed = true
    myFetcher(`${SERVER_URL}/${VERSION}/api/ordered-inv-watchlist-tickers-of-sectors?order=desc&sectors=${SecurityConstants.TRADED_SECTORS}`)
    .then(fulfillment => {
        SecurityConstants.TRADED_SECTORS.forEach(sector => {
          readonlyMap[sector] = [...fulfillment[sector].map((e, i) => assembleWatchlistTableRow(e, i)), ...Array(READONLY_TABLE_ROWS - fulfillment[sector].length).fill(0).map((_, i) => ({[WATCHLIST_HEADERS.id]: i + fulfillment[sector].length, [WATCHLIST_HEADERS.ticker]: '', [WATCHLIST_HEADERS.exchange]: null}))]
        })
        if(isSubscribed) {
          // console.log(`readonlyMap=${JSON.stringify(readonlyMap)}`)
          setReadonlyMap(readonlyMap)
        }
      })
    .catch(error => (isSubscribed ? setError(error.toString()) : null))
    .finally(() => (isSubscribed ? setLoaded(true) : null))

    return () => {
      isSubscribed = false //cleanup API subscription during unmounting
    }
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      {error && <Button variant="danger">{error}</Button>}
      {!error && 
        <div id="watchlist" className="watchlist-panel">
          <Tabs id="WatchList" className="watchlist-tabs" activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
            {SecurityConstants.TRADED_SECTORS.map((sector, i) => 
              (<Tab key={i} eventKey={sector} title={sector}>
                <WatchListTable data={readonlyMap[sector]} isEditable={false} />
              </Tab>)
            )}
          </Tabs>
        </div>
      }
      <div id="editlist" className="editlist-panel">
        <Tabs id="EditList" className="watchlist-tabs" activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
          {SecurityConstants.TRADED_SECTORS.map((sector, i) => 
            (<Tab key={i} eventKey={sector} title={sector}>
              <WatchListTable data={editableMap[sector]} isEditable={true} />
            </Tab>)
          )}
        </Tabs>
        <EditlistButtonPanel loaded={loaded} editableMap={editableMap} />
      </div>
    </>
  )
}

export default React.memo(WatchList)
