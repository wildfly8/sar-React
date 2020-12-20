import React, { useState } from 'react'
import WatchListTable  from './WatchListTable'
import { Tabs, Tab, Button } from 'react-bootstrap'

const WatchList = () => {

  const input_list = [{
    id: 0,
    ticker: 'QQQ',
    exchange: 'SMART',
    mktCap: 125
  }, {
    id: 1,
    ticker: 'SPY',
    exchange: 'SMART',
    mktCap: 277
  }, {
    id: 2,
    ticker: 'ARKG',
    exchange: 'SMART',
    mktCap: 2
  }, {
    id: 3, 
    ticker: 'SMH',
    exchange: 'SMART',
    mktCap: 3
  }]

  const readonly_list = [...input_list, ...Array(50 - input_list.length).fill(0).map((element, i) => ({id: i + input_list.length, ticker: '', exchange: null, mktCap: null}))]

  const editable_list = Array(20).fill(0).map((element, i) => ({id: i, ticker: '', exchange: null, mktCap: null}))

  const [tabKey, setTabKey] = useState('ETF')

  return (
    <>
      <div id="watchlist" className="watchlist-panel">
        <Tabs id="WatchList" className="watchlist-tabs" activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
          <Tab eventKey="ETF" title="ETF">
            <WatchListTable data={readonly_list} isEditable={false} />
          </Tab>
          <Tab eventKey="CG" title="CG">
            <WatchListTable data={readonly_list} isEditable={false} />
          </Tab>
          <Tab eventKey="HC" title="HC">
            <WatchListTable data={readonly_list} isEditable={false} />
          </Tab>
        </Tabs>
      </div>
      <div id="editlist" className="editlist-panel">
        <Tabs id="EditList" className="watchlist-tabs" activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
          <Tab eventKey="ETF" title="ETF">
            <WatchListTable data={editable_list} isEditable={true} />
          </Tab>
          <Tab eventKey="CG" title="CG">
            <WatchListTable data={editable_list} isEditable={true} />
          </Tab>
          <Tab eventKey="HC" title="HC">
            <WatchListTable data={editable_list} isEditable={true} />
          </Tab>
        </Tabs>
        <div align="center" className="editlist-panel-button">
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
      </div>
    </>
  )
}

export default WatchList
