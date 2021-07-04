import React, { useState } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import KeyRatiosTable from './KeyRatiosTable'
import { formatNumberInCommaWithDecimal, formatNumberInPercent } from '../MyUtil'


const Valuation = () => {

  const [ticker, setTicker] = useState(null)
  const [vendorValuations, setVendorValuations] = useState(null)
  const [keyRatiosArray, setKeyRatiosArray] = useState([])
  const [lastPx, setLastPx] = useState(null)
  const [intrinsicValuation, setIntrinsicValuation] = useState(null)

  const onInputChange = (e) => {
    e.target.value = e.target.value.toUpperCase()
    setTicker(e.target.value)
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
    .catch(error => console.log(`Error during relative-valuations API call! ${error}`))
  }

  const getKeyRatios = () => {
    myFetcher(`${SERVER_URL}/${VERSION}/api/keyratios?ticker=${ticker}`)
    .then(fulfillment => {
        if(fulfillment) {
          let index = 0
          fulfillment.forEach((keyratios) => {
            keyratios.id = index
            index++
          })
          setKeyRatiosArray(fulfillment)          
        }
      })
    .catch(error => console.log(`Error during keyratios API call! ${error}`))
  }

  const getIntrinsicValuation = () => {
    myFetcher(`${SERVER_URL}/${VERSION}/api/ticker-eod-px?tickers=${ticker}`)
    .then(fulfillment => {
      setLastPx(fulfillment[ticker])
      })
    .catch(error => console.error(`API error when retrieving ticker EOD Px: ${error} !`))
    myFetcher(`${SERVER_URL}/${VERSION}/api/intrinsic-valuation?ticker=${ticker}`)
    .then(fulfillment => {
        if(fulfillment) {
          setIntrinsicValuation(fulfillment)
        }
      })
    .catch(error => console.log(`Error during intrinsic-valuation API call! ${error}`))
  }

  const calculateIV = (event) => {
    event.preventDefault()
    
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
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._PE : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._5YearAvgPE : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation.IndustryAvgPE : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._SnP500PE : null}</label>
          <label>P/B</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._PB : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._5YearAvgPB : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation.IndustryAvgPB : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._SnP500PB : null}</label>
          <label>P/S</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._PS : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._5YearAvgPS : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation.IndustryAvgPS : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._SnP500PS : null}</label>
          <label>P/C</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._PC : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._5YearAvgPC : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation.IndustryAvgPC : null}</label>
          <label>{vendorValuations? vendorValuations.currentRelativeValuation._SnP500PC : null}</label>
        </div>
        <div className="forward-relative-value">
          <label></label>
          <label>{ticker}</label>
          <label>Industry Avg</label>
          <label>S&P 500</label>
          <label>Forward P/E</label>
          <label>{vendorValuations? vendorValuations.forwardRelativeValuation.forwardPE : null}</label>
          <label>{vendorValuations? vendorValuations.forwardRelativeValuation.IndustryAvgForwardPE : null}</label>
          <label>{vendorValuations? vendorValuations.forwardRelativeValuation._SnP500ForwardPE : null}</label>
          <label>PEG</label>
          <label>{vendorValuations? vendorValuations.forwardRelativeValuation._PEG : null}</label>
          <label>{vendorValuations? vendorValuations.forwardRelativeValuation.IndustryAvgPEG : null}</label>
          <label>{vendorValuations? vendorValuations.forwardRelativeValuation._SnP500PEG : null}</label>
        </div>
      </div>
      <div className="keyratios-table">
        <KeyRatiosTable data={keyRatiosArray} />
      </div>
      <div className="intrinsic-valuation-panel">
        <Form inline onSubmit={calculateIV}>
          <Form.Label htmlFor="nyFCF" srOnly>nyFCF:</Form.Label>
          <InputGroup size="sm">
            <Form.Label>nyFCF:</Form.Label>
            <Form.Control id="nyFCF" placeholder={intrinsicValuation? formatNumberInCommaWithDecimal(intrinsicValuation.nextYearFCF, 0) : null} />
          </InputGroup>
          <Form.Label htmlFor="fcfGr" srOnly>fcfGr</Form.Label>
          <InputGroup size="sm">
            <Form.Label>fcfGr:</Form.Label>
            <FormControl id="fcfGr" placeholder={intrinsicValuation? formatNumberInCommaWithDecimal(intrinsicValuation.nextDecadeFCFGrowthRate, 2) : null} />
          </InputGroup>
          <Form.Label htmlFor="SharesGr" srOnly>SharesGr</Form.Label>
          <InputGroup size="sm">
            <Form.Label>SharesGr:</Form.Label>
            <FormControl id="SharesGr" placeholder={intrinsicValuation? formatNumberInCommaWithDecimal(intrinsicValuation.nextDecadeSharesGrowthRate, 2) : null} />
          </InputGroup>
          <Form.Label htmlFor="DiscR" srOnly>DiscR</Form.Label>
          <InputGroup size="sm">
            <Form.Label>DiscR:</Form.Label>
            <FormControl id="DiscR" placeholder={intrinsicValuation? formatNumberInCommaWithDecimal(intrinsicValuation.discountRate, 3) : null} />
          </InputGroup>
          <Form.Label htmlFor="PerpGr" srOnly>PerpGr</Form.Label>
          <InputGroup size="sm">
            <Form.Label>PerpGr:</Form.Label>
            <FormControl id="PerpGr" placeholder={intrinsicValuation? formatNumberInCommaWithDecimal(intrinsicValuation.perpetuityGrowthRate, 2) : null} />
          </InputGroup>
          <Form.Label htmlFor="MoS" srOnly>MoS</Form.Label>
          <InputGroup size="sm">
            <Form.Label>MoS:</Form.Label>
            <FormControl id="MoS" placeholder={intrinsicValuation? formatNumberInCommaWithDecimal(intrinsicValuation.marginOfSafety, 2) : null} />
          </InputGroup>
          <Form.Label htmlFor="BuyPx" srOnly>BuyPx</Form.Label>
          <InputGroup size="sm">
            <Form.Label>BuyPx:</Form.Label>
            <FormControl id="BuyPx" placeholder={intrinsicValuation? formatNumberInCommaWithDecimal(intrinsicValuation.buyPx, 1) : null} readOnly />
          </InputGroup>
          <Form.Label htmlFor="IV" srOnly>IV</Form.Label>
          <InputGroup size="sm">
            <Form.Label>IV:</Form.Label>
            <FormControl id="IV" placeholder={intrinsicValuation? formatNumberInCommaWithDecimal(intrinsicValuation.perShareIV, 1) : null} readOnly />
          </InputGroup>
          <Form.Label htmlFor="NT" srOnly>NT</Form.Label>
          <InputGroup size="sm">
            <Form.Label>NT:</Form.Label>
            <FormControl id="NT" placeholder={intrinsicValuation && lastPx? formatNumberInPercent((intrinsicValuation.buyPx - lastPx) / lastPx) : null} readOnly />
          </InputGroup>
          <Form.Label htmlFor="LT" srOnly>LT</Form.Label>
          <InputGroup size="sm">
            <Form.Label>LT:</Form.Label>
            <FormControl id="LT" placeholder={intrinsicValuation && lastPx? formatNumberInPercent((intrinsicValuation.perShareIV - lastPx) / lastPx) : null} readOnly />
          </InputGroup>
          <Button size="sm" variant="dark" type="submit">Calc</Button>
        </Form>
      </div>
    </div>
  )
}
export default React.memo(Valuation)
