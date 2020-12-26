import React, { useState, useEffect, useContext } from 'react'
import WatchListTable, { WATCHLIST_HEADERS } from './WatchListTable'
import { Tabs, Tab, Button } from 'react-bootstrap'
import SecurityConstants from '../SecurityConstants'
import MacroEconomicIndexConstants from '../MacroEconomicIndexConstants'
import { SERVER_URL, myFetcher } from '../api'
import { assembleWatchlistTableRow, formatDate } from '../MyUtil'
import { MyContext } from '../MyContext'


let readonlyInitMap = {}
SecurityConstants.TRADED_SECTORS.forEach(e => {
  readonlyInitMap = {...readonlyInitMap, ...{[e]: Array(50).fill(0).map((_, i) => ({[WATCHLIST_HEADERS.id]: i, [WATCHLIST_HEADERS.ticker]: '', [WATCHLIST_HEADERS.exchange]: null}))}}
})
let editableInitMap = {}
SecurityConstants.TRADED_SECTORS.forEach(e => {
  editableInitMap = {...editableInitMap, ...{[e]: Array(20).fill(0).map((_, i) => ({[WATCHLIST_HEADERS.id]: i, [WATCHLIST_HEADERS.ticker]: '', [WATCHLIST_HEADERS.exchange]: null}))}}
})

const WatchList = () => {
  const { econIndices } = useContext(MyContext)
  const [economicIndices, ] = econIndices;
  const [tabKey, setTabKey] = useState(SecurityConstants.SECTOR_ETF)
  const [loaded, setLoaded] = useState(false)
  const [readonlyMap, setReadonlyMap] = useState(readonlyInitMap)
  const [editableMap, setEditableMap] = useState(editableInitMap)

  useEffect(() => {
    myFetcher(`${SERVER_URL}/api/findINVWatchlistTickersBySectors?sectors=${SecurityConstants.TRADED_SECTORS}`)
    .then(fulfillment => {
        SecurityConstants.TRADED_SECTORS.forEach(sector => {
          readonlyMap[sector] = [...fulfillment[sector].map((e, i) => assembleWatchlistTableRow(e, i)), ...Array(50 - fulfillment[sector].length).fill(0).map((_, i) => ({[WATCHLIST_HEADERS.id]: i + fulfillment[sector].length, [WATCHLIST_HEADERS.ticker]: '', [WATCHLIST_HEADERS.exchange]: null}))]
        })
        // console.log(`readonlyMap=${JSON.stringify(readonlyMap)}`)
        setReadonlyMap(readonlyMap)
      })
    .catch(error => console.error(`API error when retrieving watchlist tickers: ${error} !`))
    .finally(() => setLoaded(true))
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      <div id="watchlist" className="watchlist-panel">
        <Tabs id="WatchList" className="watchlist-tabs" activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
          {SecurityConstants.TRADED_SECTORS.map((sector, i) => 
            ( <Tab key={i} eventKey={sector} title={sector}>
                <WatchListTable data={readonlyMap[sector]} isEditable={false} />
              </Tab>
            )
          )}
        </Tabs>
      </div>
      <div id="editlist" className="editlist-panel">
        <Tabs id="EditList" className="watchlist-tabs" activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
          {SecurityConstants.TRADED_SECTORS.map((sector, i) => 
            ( <Tab key={i} eventKey={sector} title={sector}>
                <WatchListTable data={editableMap[sector]} isEditable={true} />
              </Tab>
            )
          )}
        </Tabs>
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
      </div>
    </>
  )
}

export default WatchList
