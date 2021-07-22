import React, { useState, useEffect, useCallback } from 'react'
import { Button, Modal, Spinner, ProgressBar } from 'react-bootstrap'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import PxTargetTable from './PxTargetTable'
import { aggregatePTEnforcement, formatNumberInPercentWithDecimal } from '../MyUtil'
import SecurityConstants from '../SecurityConstants'


const PxTarget = () => {
  const [pxTargetArray, setPxTargetArray] = useState([])
  const [subscribed, setSubscribed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showSecurityRank, setShowSecurityRank] = useState(false)
  const [ntETFs, setNtETFs] = useState([])
  const [ltETFs, setLtETFs] = useState([])
  const [ptETFs, setPtETFs] = useState([])
  const [ntAs, setNtAs] = useState([])
  const [ltAs, setLtAs] = useState([])
  const [ptAs, setPtAs] = useState([])
  const [ntBs, setNtBs] = useState([])
  const [ltBs, setLtBs] = useState([])
  const [ptBs, setPtBs] = useState([])
  const [ntCs, setNtCs] = useState([])
  const [ltCs, setLtCs] = useState([])
  const [ptCs, setPtCs] = useState([])
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

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
    const summaryMap = pxTargetArray.reduce((map, currentValue) => {
      if(SecurityConstants.LIST_TYPES.includes(currentValue.ticker)) {
        map[currentValue.ticker] = currentValue
      }
      return map
    }, {})
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
          const quotedETFs = pxTargetArray.filter(e => 'ETF' === e.sector && e.dailyPercentChg != null && '^VIX' !== e.ticker)
          summaryMap['ETF_List'].dailyPercentChg = quotedETFs.reduce((sum, currentValue) => (sum + currentValue.dailyPercentChg), 0) / quotedETFs.length
        } else {
          const quotedSameList = pxTargetArray.filter(e => {
            return e.dailyPercentChg != null && ((pt.newPT && e.newPT) || (e.sector != null && e.sector !== 'ETF' && !pt.newPT && !e.newPT && (pt.propRatingCode? pt.propRatingCode.replace('+', '') : pt.propRatingCode) === (e.propRatingCode? e.propRatingCode.replace('+', '') : e.propRatingCode)))
          })
          let listName = 'New_List'
          if(!pt.newPT) {
            if(pt.propRatingCode == null) {
              listName = 'NR_List'
            } else {
              listName = `${pt.propRatingCode.replace('+', '')}_List`
            }
          }
          summaryMap[listName].dailyPercentChg = quotedSameList.reduce((sum, currentValue) => (sum + currentValue.dailyPercentChg), 0) / quotedSameList.length
        }
      }
      index++
      setProgress(Math.round(100 * index / pxTargetArray.length))
      forceUpdate()
    }
    setProgress(100)
  }

  const securityRank = () => {
    const etfList = pxTargetArray.filter(e => e.sector === 'ETF' && e.ticker !== '^VIX' && !e.newPT)
    setNtETFs([...etfList].sort((a, b) => b.neartermMargin - a.neartermMargin).slice(0, 10))
    setLtETFs([...etfList].sort((a, b) => b.longtermMargin - a.longtermMargin).slice(0, 10))
    setPtETFs([...etfList].sort((a, b) => b.potentialMargin - a.potentialMargin).slice(0, 10))
    const aList = pxTargetArray.filter(e => (e.propRatingCode === 'A' || e.propRatingCode === 'A+') && !e.newPT)
    setNtAs([...aList].sort((a, b) => b.neartermMargin - a.neartermMargin).slice(0, 10))
    setLtAs([...aList].sort((a, b) => b.longtermMargin - a.longtermMargin).slice(0, 10))
    setPtAs([...aList].sort((a, b) => b.potentialMargin - a.potentialMargin).slice(0, 10))
    const bList = pxTargetArray.filter(e => e.propRatingCode === 'B' && !e.newPT)
    setNtBs([...bList].sort((a, b) => b.neartermMargin - a.neartermMargin).slice(0, 10))
    setLtBs([...bList].sort((a, b) => b.longtermMargin - a.longtermMargin).slice(0, 10))
    setPtBs([...bList].sort((a, b) => b.potentialMargin - a.potentialMargin).slice(0, 10))
    const cList = pxTargetArray.filter(e => e.propRatingCode === 'C' && !e.newPT)
    setNtCs([...cList].sort((a, b) => b.neartermMargin - a.neartermMargin).slice(0, 10))
    setLtCs([...cList].sort((a, b) => b.longtermMargin - a.longtermMargin).slice(0, 10))
    setPtCs([...cList].sort((a, b) => b.potentialMargin - a.potentialMargin).slice(0, 10))
    setShowSecurityRank(true)
  }

  const handleDialogueClose = () => {
    setShowSecurityRank(false)
  }

  return (
    <>
      <Modal centered size="lg" show={showSecurityRank} backdrop="static" keyboard={false}>
        <Modal.Body className="security-rank-modal">
          <div><b>ETF_List NT Rank:</b></div><div><b>ETF_List LT Rank:</b></div><div><b>ETF_List PT Rank:</b></div>
          {[...Array(30).keys()].map(i => {
            if(i % 3 === 0) {
              return ntETFs.length >= 10? <div><span>{ntETFs[i/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ntETFs[i/3].neartermMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ntETFs[i/3].neartermMargin, 0)}</span></div> : null
            } else if(i % 3 === 1) {
              return ltETFs.length >= 10? <div><span>{ltETFs[(i-1)/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ltETFs[(i-1)/3].longtermMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ltETFs[(i-1)/3].longtermMargin, 0)}</span></div> : null
            } else {
              return ptETFs.length >= 10? <div><span>{ptETFs[(i-2)/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ptETFs[(i-2)/3].potentialMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ptETFs[(i-2)/3].potentialMargin, 0)}</span></div> : null
            }
          })}
          <div><b>A_List NT Rank:</b></div><div><b>A_List LT Rank:</b></div><div><b>A_List PT Rank:</b></div>
          {[...Array(30).keys()].map(i => {
            if(i % 3 === 0) {
              return ntAs.length >= 10? <div><span>{ntAs[i/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ntAs[i/3].neartermMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ntAs[i/3].neartermMargin, 0)}</span></div> : null
            } else if(i % 3 === 1) {
              return ltAs.length >= 10? <div><span>{ltAs[(i-1)/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ltAs[(i-1)/3].longtermMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ltAs[(i-1)/3].longtermMargin, 0)}</span></div> : null
            } else {
              return ptAs.length >= 10? <div><span>{ptAs[(i-2)/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ptAs[(i-2)/3].potentialMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ptAs[(i-2)/3].potentialMargin, 0)}</span></div> : null
            }
          })}
          <div><b>B_List NT Rank:</b></div><div><b>B_List LT Rank:</b></div><div><b>B_List PT Rank:</b></div>
          {[...Array(30).keys()].map(i => {
            if(i % 3 === 0) {
              return ntBs.length >= 10? <div><span>{ntBs[i/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ntBs[i/3].neartermMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ntBs[i/3].neartermMargin, 0)}</span></div> : null
            } else if(i % 3 === 1) {
              return ltBs.length >= 10? <div><span>{ltBs[(i-1)/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ltBs[(i-1)/3].longtermMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ltBs[(i-1)/3].longtermMargin, 0)}</span></div> : null
            } else {
              return ptBs.length >= 10? <div><span>{ptBs[(i-2)/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ptBs[(i-2)/3].potentialMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ptBs[(i-2)/3].potentialMargin, 0)}</span></div> : null
            }
          })}
          <div><b>C_List NT Rank:</b></div><div><b>C_List LT Rank:</b></div><div><b>C_List PT Rank:</b></div>
          {[...Array(30).keys()].map(i => {
            if(i % 3 === 0) {
              return ntCs.length >= 10? <div><span>{ntCs[i/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ntCs[i/3].neartermMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ntCs[i/3].neartermMargin, 0)}</span></div> : null
            } else if(i % 3 === 1) {
              return ltCs.length >= 10? <div><span>{ltCs[(i-1)/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ltCs[(i-1)/3].longtermMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ltCs[(i-1)/3].longtermMargin, 0)}</span></div> : null
            } else {
              return ptCs.length >= 10? <div><span>{ptCs[(i-2)/3].ticker}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{'color': ptCs[(i-2)/3].potentialMargin > 0? 'green' : 'red'}}>{formatNumberInPercentWithDecimal(ptCs[(i-2)/3].potentialMargin, 0)}</span></div> : null
            }
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDialogueClose}>Close</Button>
        </Modal.Footer>
      </Modal>
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
