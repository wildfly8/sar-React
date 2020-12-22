import React, { useState, useEffect } from 'react'
import WatchListTable  from './WatchListTable'
import { Tabs, Tab, Button } from 'react-bootstrap'
import SecurityConstants from '../SecurityConstants'
import { SERVER_URL, myFetcher } from '../api'

const WatchList = () => {

  const [tabKey, setTabKey] = useState(SecurityConstants.SECTOR_ETF)
  const [allTickersBySector, setAllTickersBySector] = useState({})
  const [numOfLoadedSectors, setNumOfLoadedSectors] = useState(0)

  useEffect(() => {
    SecurityConstants.TRADED_SECTORS.forEach(e => {
        myFetcher(`${SERVER_URL}/api/findINVWatchlistTickersBySector?sector=${e}`)
          .then(fulfillment => {
                setAllTickersBySector(prev => {
                  console.log(`allTickersBySector=${JSON.stringify(prev)}`)
                  return {...prev, ...{[e]: fulfillment}}
                })
                setNumOfLoadedSectors(prev => {
                  console.log(`numOfLoadedSectors=${prev}`)
                  return ++prev
                })
            })
          .catch(error => console.error(`API error when retrieving watchlist tickers for sector ${e}: ${error} !`))
          //.finally(() => console.log(`numOfLoadedSectors=${numOfLoadedSectors}`))
    })
    // eslint-disable-next-line
  }, [])
  
  const input_list = []
  // SecurityConstants.TRADED_SECTORS.

  const readonly_list = [...input_list, ...Array(50 - input_list.length).fill(0).map((element, i) => ({id: i + input_list.length, ticker: '', exchange: null}))]
  const editable_list = Array(20).fill(0).map((element, i) => ({id: i, ticker: '', exchange: null}))

  return (
    <>
      <div id="watchlist" className="watchlist-panel">
        <Tabs id="WatchList" className="watchlist-tabs" activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
          {SecurityConstants.TRADED_SECTORS.map((sector, i) => 
            ( <Tab key={i} eventKey={sector} title={sector}>
                <WatchListTable data={readonly_list} isEditable={false} />
              </Tab>
            )
          )}
        </Tabs>
      </div>
      <div id="editlist" className="editlist-panel">
        <Tabs id="EditList" className="watchlist-tabs" activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
          {SecurityConstants.TRADED_SECTORS.map((sector, i) => 
            ( <Tab key={i} eventKey={sector} title={sector}>
                <WatchListTable data={editable_list} isEditable={true} />
              </Tab>
            )
          )}
        </Tabs>
        {numOfLoadedSectors < SecurityConstants.TRADED_SECTORS.length? 
          <div className="editlist-button-panel"><Button variant="warning">Loading All Watchlist Tickers...</Button></div> 
          :
          <div className="editlist-button-panel">
            <Button variant="dark">Add</Button>{' '}
            <Button variant="dark">Update</Button>{' '}
            <Button variant="dark">Delete</Button>{' '}
            <Button variant="dark">UpdSTKPx</Button>{' '}
            <Button variant="dark">Map</Button>{' '}
            <Button variant="dark">Test</Button>{' '}
            <label>&nbsp;&nbsp;TYT Yield:</label>{' '}
            <ins>TBD</ins>{' '}
            <label>| FOMC:</label>{' '}
            <ins>TBD</ins>{' '}
            <label>| Monthly Jobs:</label>{' '}
            <ins>TBD</ins>{' '}
            <label>| Retail Sales:</label>{' '}
            <ins>TBD</ins>{' '}
            <label>| GDP:</label>{' '}
            <ins>TBD</ins>{' '}
          </div>
        }
      </div>
    </>
  )
}

export default WatchList
