import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { SERVER_URL, myFetcher } from '../api'
import { replaceWithEdgeCodes } from '../MyUtil'


const CompanyAnalysis = () => {

  const [ticker, setTicker] = useState(null)
  const [companyBasics, setCompanyBasics] = useState(null)
  const [companyAnalystReportTitile, setCompanyAnalystReportTitle] = useState(null)
  const [companyAnalystReport, setCompanyAnalystReport] = useState(null)
  const [companyReport, setCompanyReport] = useState(null)

  const analyzeCompany = () => {
    myFetcher(`${SERVER_URL}/api/company-basics?ticker=${ticker}`)
    .then(fulfillment => {
        setCompanyBasics(fulfillment)
        if(fulfillment && fulfillment.basicsOverview) {
          setCompanyAnalystReportTitle(`${replaceWithEdgeCodes(fulfillment.basicsOverview.morningstarTake)}`)
          setCompanyAnalystReport(`${replaceWithEdgeCodes(fulfillment.basicsOverview.analystNote)}`)
        }
      })
    .catch(error => setCompanyBasics(error.toString()))

    myFetcher(`${SERVER_URL}/api/company-report?ticker=${ticker}`)
    .then(fulfillment => {
        if(fulfillment) {
          setCompanyReport(fulfillment.response)
        }
      })
    .catch(error => setCompanyReport(error.toString()))
  }

  const onInputChange = (e) => {
    e.target.value = e.target.value.toUpperCase()
    setTicker(e.target.value)
  }

  const handleKeyPress = (e) => {
    if(e.charCode === 13) {
      analyzeCompany()
      e.target.value = null
    } 
  }

  return (
    <div>
      <div className="company-analysis-input-panel">
        <label>Ticker:</label>{" "}
        <div>
          <InputGroup className="mb-3">
            <FormControl onChange={onInputChange} onKeyPress={handleKeyPress} aria-label="Ticker" aria-describedby="ticker-addon1" />
            <InputGroup.Append><Button variant="dark" onClick={analyzeCompany}>Analysis</Button></InputGroup.Append>
          </InputGroup>
        </div>
        <label>Employees:</label>{" "}
        <span>{companyBasics && companyBasics.basicsOverview && companyBasics.basicsOverview.numOfEmployees}</span>
        <label>Auditor:</label>{" "}
        <span>{companyBasics && companyBasics.basicsOverview && companyBasics.basicsOverview.auditor}</span>
        <label>Legal Advisor:</label>{" "}
        <span>{companyBasics && companyBasics.basicsOverview && companyBasics.basicsOverview.legalAdvisor}</span>
      </div>
      <div className="company-analysis-analyst-report-panel">
        {companyAnalystReportTitile}
        <br/><br/>
        {companyAnalystReport}
      </div>
      <p className="company-analysis-sar-report-panel">
        {companyReport}
      </p>

    </div>
  )
}
export default React.memo(CompanyAnalysis)
