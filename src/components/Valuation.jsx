import React, { useState, useEffect } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import KeyRatiosTable from './KeyRatiosTable'
import { formatNumberInCommaWithDecimal, formatNumberInPercentWithDecimal } from '../MyUtil'


const Valuation = () => {
  const tickerStorage = sessionStorage.getItem('ticker')
  const lastPxStorage = sessionStorage.getItem('lastPx')? parseFloat(sessionStorage.getItem('lastPx')) : null
  const nyFCFStorage = sessionStorage.getItem('nyFCF')
  const fcfGrStorage = sessionStorage.getItem('fcfGr')
  const sharesGrStorage = sessionStorage.getItem('sharesGr')
  const perpGrStorage = sessionStorage.getItem('perpGr')
  const discRStorage = sessionStorage.getItem('discR')
  const moSStorage = sessionStorage.getItem('moS')
  const buyPxStorage = sessionStorage.getItem('buyPx')
  const perShareIVStorage = sessionStorage.getItem('perShareIV')

  const [ticker, setTicker] = useState(tickerStorage? tickerStorage : null)
  const [vendorValuations, setVendorValuations] = useState(null)
  const [keyRatiosArray, setKeyRatiosArray] = useState([])
  const [lastPx, setLastPx] = useState(lastPxStorage? lastPxStorage : null)
  const [nyFCF, setNyFCF] = useState(nyFCFStorage? nyFCFStorage : null)
  const [fcfGr, setFcfGr] = useState(fcfGrStorage? fcfGrStorage : null)
  const [sharesGr, setSharesGr] = useState(sharesGrStorage? sharesGrStorage : null)
  const [perpGr, setPerpGr] = useState(perpGrStorage? perpGrStorage : null)
  const [discR, setDiscR] = useState(discRStorage? discRStorage : null)
  const [moS, setMoS] = useState(moSStorage? moSStorage : null)
  const [buyPx, setBuyPx] = useState(buyPxStorage? buyPxStorage : null)
  const [perShareIV, setPerShareIV] = useState(perShareIVStorage? perShareIVStorage : null)

  useEffect(() => {
    if(tickerStorage) {
      getRelativeValuations()
      getKeyRatios()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onInputChange = (e) => {
    const tickerInput = e.target.value.toUpperCase()
    setTicker(tickerInput)
    sessionStorage.setItem('ticker', tickerInput)
  }

  const handleKeyPress = (e) => {
    if(e.charCode === 13) {
      getRelativeValuations()
      getKeyRatios()
      getIntrinsicValuation()
      e.target.value = null
    } 
  }

  const getRelativeValuations = () => {
    myFetcher(`${SERVER_URL}/${VERSION}/api/relative-valuations?ticker=${ticker}`)
    .then(fulfillment => {
        if(fulfillment) {
          setVendorValuations(fulfillment)
        }
      })
    .catch(error => {
        console.log(`${ticker}: Error during relative-valuations API call! ${error}`)
        setVendorValuations(null)
      })
  }

  const getKeyRatios = () => {
    myFetcher(`${SERVER_URL}/${VERSION}/api/keyratios?ticker=${ticker}`)
    .then(fulfillment => {
        if(fulfillment) {
          let index = 0
          fulfillment.forEach(keyratios => {
            keyratios.id = index
            index++
          })
          setKeyRatiosArray(fulfillment)
        }
      })
    .catch(error => {
        console.log(`${ticker}: Error during keyratios API call! ${error}`)
        setKeyRatiosArray([])
      })
  }

  const getIntrinsicValuation = () => {
    myFetcher(`${SERVER_URL}/${VERSION}/api/ticker-eod-px?tickers=${ticker}`)
    .then(fulfillment => {
      setLastPx(fulfillment[ticker])
      sessionStorage.setItem('lastPx', fulfillment[ticker])      
      })
    .catch(error => {
        console.error(`${ticker}: API error when retrieving ticker EOD Px: ${error} !`)
        setLastPx(null)
        sessionStorage.setItem('lastPx', null)      
      })
    myFetcher(`${SERVER_URL}/${VERSION}/api/intrinsic-valuation?ticker=${ticker}`)
    .then(fulfillment => {
        if(fulfillment) {
          setNyFCF(fulfillment.nextYearFCF)
          sessionStorage.setItem('nyFCF', fulfillment.nextYearFCF)      
          setFcfGr(fulfillment.nextDecadeFCFGrowthRate)
          sessionStorage.setItem('fcfGr', fulfillment.nextDecadeFCFGrowthRate)      
          setSharesGr(fulfillment.nextDecadeSharesGrowthRate)
          sessionStorage.setItem('sharesGr', fulfillment.nextDecadeSharesGrowthRate)
          setPerpGr(fulfillment.perpetuityGrowthRate)
          sessionStorage.setItem('perpGr', fulfillment.perpetuityGrowthRate)
          setDiscR(fulfillment.discountRate)
          sessionStorage.setItem('discR', fulfillment.discountRate)
          setMoS(fulfillment.marginOfSafety)
          sessionStorage.setItem('moS', fulfillment.marginOfSafety)
          setBuyPx(fulfillment.buyPx)
          sessionStorage.setItem('buyPx', fulfillment.buyPx)
          setPerShareIV(fulfillment.perShareIV)
          sessionStorage.setItem('perShareIV', fulfillment.perShareIV)
        }
      })
    .catch(error => {
        console.log(`${ticker}: Error during intrinsic-valuation API call! ${error}`)
        setNyFCF(null)
        sessionStorage.setItem('nyFCF', null)
        setFcfGr(null)
        sessionStorage.setItem('fcfGr', null)
        setSharesGr(null)
        sessionStorage.setItem('sharesGr', null)
        setPerpGr(null)
        sessionStorage.setItem('perpGr', null)
        setDiscR(null)
        sessionStorage.setItem('discR', null)
        setMoS(null)
        sessionStorage.setItem('moS', null)
        setBuyPx(null)
        sessionStorage.setItem('buyPx', null)
        setPerShareIV(null)
        sessionStorage.setItem('perShareIV', null)
      })
  }

  const handleIVInputChange = (e) => {
    if(e.target.id === 'nyFCF') {
      setNyFCF(e.target.value)
      sessionStorage.setItem('nyFCF', e.target.value)
    } else if(e.target.id === 'fcfGr') {
      setFcfGr(e.target.value)
      sessionStorage.setItem('fcfGr', e.target.value)
    } else if(e.target.id === 'SharesGr') {
      setSharesGr(e.target.value)
      sessionStorage.setItem('sharesGr', e.target.value)
    } else if(e.target.id === 'DiscR') {
      setDiscR(e.target.value)
      sessionStorage.setItem('discR', e.target.value)
    } else if(e.target.id === 'PerpGr') {
      setPerpGr(e.target.value)
      sessionStorage.setItem('perpGr', e.target.value)
    } else if(e.target.id === 'MoS') {
      setMoS(e.target.value)
      sessionStorage.setItem('moS', e.target.value)
    }
  }

  const calculateIV = (e) => {
    e.preventDefault()
    if(nyFCF == null || nyFCF.length === 0 || fcfGr == null || fcfGr.length === 0 || sharesGr == null || sharesGr.length === 0 || discR == null || discR.length === 0 || perpGr == null || perpGr.length === 0 || moS == null || moS.length === 0) {
      alert("FCF || Gr || Sh || Pp || DR || MoS is not valid!")
      return
    }
    myFetcher(`${SERVER_URL}/${VERSION}/api/intrinsic-valuation/calculate?ticker=${ticker}&nyFCF=${nyFCF}&fcfGr=${fcfGr}&SharesGr=${sharesGr}&PerpGr=${perpGr}&DiscR=${discR}&MoS=${moS}`)
    .then(fulfillment => {
        if(fulfillment) {
          setNyFCF(fulfillment.nextYearFCF)
          sessionStorage.setItem('nyFCF', fulfillment.nextYearFCF)      
          setFcfGr(fulfillment.nextDecadeFCFGrowthRate)
          sessionStorage.setItem('fcfGr', fulfillment.nextDecadeFCFGrowthRate)      
          setSharesGr(fulfillment.nextDecadeSharesGrowthRate)
          sessionStorage.setItem('sharesGr', fulfillment.nextDecadeSharesGrowthRate)
          setPerpGr(fulfillment.perpetuityGrowthRate)
          sessionStorage.setItem('perpGr', fulfillment.perpetuityGrowthRate)
          setDiscR(fulfillment.discountRate)
          sessionStorage.setItem('discR', fulfillment.discountRate)
          setMoS(fulfillment.marginOfSafety)
          sessionStorage.setItem('moS', fulfillment.marginOfSafety)
          setBuyPx(fulfillment.buyPx)
          sessionStorage.setItem('buyPx', fulfillment.buyPx)
          setPerShareIV(fulfillment.perShareIV)
          sessionStorage.setItem('perShareIV', fulfillment.perShareIV)
        }
      })
    .catch(error => alert(`${ticker}: Error during intrinsic-valuation/calculate API call! ${error}`))
  }

  return (
    <div className="valuation-panel">
      <div className="relative-valuation-panel">
        <div className="value-traps">
            <label>Ticker:</label>{" "}
            <InputGroup>
              <FormControl onChange={onInputChange} onKeyPress={handleKeyPress} />
            </InputGroup>
          <label>Goodwill Impairment:</label>
          <span></span>
          <label>Recent M&A/Spinoff/Charges:</label>
          <span></span>
          <label>Is Cyclical:</label>
          <span></span>
          <label>Capitalize Or Expense Assets:</label>
          <span></span>
          <label>Capital-Intensive:</label>
          <span></span>
        </div>
        <div className="current-relative-value">
          <label></label>
          <label>{ticker}</label>
          <label>5y Avg</label>
          <label>Industry Avg</label>
          <label>S&P 500</label>
          <label>P/E</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._PE : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._5YearAvgPE : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation.IndustryAvgPE : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._SnP500PE : null}</label>
          <label>P/B</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._PB : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._5YearAvgPB : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation.IndustryAvgPB : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._SnP500PB : null}</label>
          <label>P/S</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._PS : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._5YearAvgPS : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation.IndustryAvgPS : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._SnP500PS : null}</label>
          <label>P/C</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._PC : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._5YearAvgPC : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation.IndustryAvgPC : null}</label>
          <label>{vendorValuations && vendorValuations.currentRelativeValuation? vendorValuations.currentRelativeValuation._SnP500PC : null}</label>
        </div>
        <div className="forward-relative-value">
          <label></label>
          <label>{ticker}</label>
          <label>Industry Avg</label>
          <label>S&P 500</label>
          <label>Forward P/E</label>
          <label>{vendorValuations && vendorValuations.forwardRelativeValuation? vendorValuations.forwardRelativeValuation.forwardPE : null}</label>
          <label>{vendorValuations && vendorValuations.forwardRelativeValuation? vendorValuations.forwardRelativeValuation.IndustryAvgForwardPE : null}</label>
          <label>{vendorValuations && vendorValuations.forwardRelativeValuation? vendorValuations.forwardRelativeValuation._SnP500ForwardPE : null}</label>
          <label>PEG</label>
          <label>{vendorValuations && vendorValuations.forwardRelativeValuation? vendorValuations.forwardRelativeValuation._PEG : null}</label>
          <label>{vendorValuations && vendorValuations.forwardRelativeValuation? vendorValuations.forwardRelativeValuation.IndustryAvgPEG : null}</label>
          <label>{vendorValuations && vendorValuations.forwardRelativeValuation? vendorValuations.forwardRelativeValuation._SnP500PEG : null}</label>
        </div>
      </div>
      <div className="keyratios-table">
        <KeyRatiosTable data={keyRatiosArray} />
      </div>
      <div className="intrinsic-valuation-panel">
        <Form noValidate inline onSubmit={calculateIV}>
          <Form.Label htmlFor="nyFCF" srOnly>nyFCF</Form.Label>
          <InputGroup>
            <Form.Label>FCF</Form.Label>
            <Form.Control id="nyFCF" value={formatNumberInCommaWithDecimal(nyFCF, 0)} onChange={handleIVInputChange} />
          </InputGroup>
          <Form.Label htmlFor="fcfGr" srOnly>Gr</Form.Label>
          <InputGroup>
            <Form.Label>Gr</Form.Label>
            <FormControl id="fcfGr" value={formatNumberInCommaWithDecimal(fcfGr, 2)} onChange={handleIVInputChange} />
          </InputGroup>
          <Form.Label htmlFor="SharesGr" srOnly>SharesGr</Form.Label>
          <InputGroup>
            <Form.Label>Sh</Form.Label>
            <FormControl id="SharesGr" value={formatNumberInCommaWithDecimal(sharesGr, 2)} onChange={handleIVInputChange} />
          </InputGroup>
          <Form.Label htmlFor="PerpGr" srOnly>PerpGr</Form.Label>
          <InputGroup>
            <Form.Label>Pp</Form.Label>
            <FormControl id="PerpGr" value={formatNumberInCommaWithDecimal(perpGr, 2)} onChange={handleIVInputChange} />
          </InputGroup>
          <Form.Label htmlFor="DiscR" srOnly>DiscR</Form.Label>
          <InputGroup>
            <Form.Label>DR</Form.Label>
            <FormControl id="DiscR" value={formatNumberInCommaWithDecimal(discR, 3)} onChange={handleIVInputChange} />
          </InputGroup>
          <Form.Label htmlFor="MoS" srOnly>MoS</Form.Label>
          <InputGroup>
            <Form.Label>MoS</Form.Label>
            <FormControl id="MoS" value={formatNumberInCommaWithDecimal(moS, 2)} onChange={handleIVInputChange} />
          </InputGroup>
          <Form.Label htmlFor="BuyPx" srOnly>TP</Form.Label>
          <InputGroup>
            <Form.Label>TP</Form.Label>
            <FormControl id="BuyPx" value={formatNumberInCommaWithDecimal((typeof buyPx === 'string' || buyPx instanceof String)? parseFloat(buyPx) : buyPx, 1)} readOnly />
          </InputGroup>
          <Form.Label htmlFor="IV" srOnly>IV</Form.Label>
          <InputGroup>
            <Form.Label>IV</Form.Label>
            <FormControl id="IV" value={formatNumberInCommaWithDecimal((typeof perShareIV === 'string' || perShareIV instanceof String)? parseFloat(perShareIV) : perShareIV, 1)} readOnly />
          </InputGroup>
          <Form.Label htmlFor="NT" srOnly>NT</Form.Label>
          <InputGroup>
            <Form.Label>NT</Form.Label>
            <FormControl id="NT" value={buyPx != null && lastPx? ((buyPx - lastPx) < 0? '(' + formatNumberInPercentWithDecimal(-(buyPx - lastPx) / lastPx, 0) + ')' : formatNumberInPercentWithDecimal((buyPx - lastPx) / lastPx, 0)) : ""} readOnly />
          </InputGroup>
          <Form.Label htmlFor="LT" srOnly>LT</Form.Label>
          <InputGroup>
            <Form.Label>LT</Form.Label>
            <FormControl id="LT" value={perShareIV != null && lastPx? ((perShareIV - lastPx) < 0? '(' + formatNumberInPercentWithDecimal(-(perShareIV - lastPx) / lastPx, 0) + ')' : formatNumberInPercentWithDecimal((perShareIV - lastPx) / lastPx, 0)) : ""} readOnly />
          </InputGroup>
          <Button variant="dark" type="submit">IV</Button>
        </Form>
      </div>
    </div>
  )
}

export default React.memo(Valuation)