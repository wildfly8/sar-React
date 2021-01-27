import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import { replaceWithEdgeCodes } from '../MyUtil'

const CompanyAnalysis = () => {
  const numOfEmployeesFromStorage = sessionStorage.getItem('numOfEmployees')
  const auditorFromStorage = sessionStorage.getItem('auditor')
  const legalAdvisorFromStorage = sessionStorage.getItem('legalAdvisor')
  const analystReportTitileFromStorage = sessionStorage.getItem('analystReportTitile')
  const analystReportFromStorage = sessionStorage.getItem('analystReport')
  const sarReportFromStorage = sessionStorage.getItem('sarReport')

  const [ticker, setTicker] = useState(null)
  const [numOfEmployees, setNumOfEmployees] = useState(numOfEmployeesFromStorage? numOfEmployeesFromStorage : null)
  const [auditor, setAuditor] = useState(auditorFromStorage? auditorFromStorage : null)
  const [legalAdvisor, setLegalAdvisor] = useState(legalAdvisorFromStorage? legalAdvisorFromStorage : null)
  const [analystReportTitile, setAnalystReportTitle] = useState(analystReportTitileFromStorage? analystReportTitileFromStorage : null)
  const [analystReport, setAnalystReport] = useState(analystReportFromStorage? analystReportFromStorage : null)
  const [sarReport, setSarReport] = useState(sarReportFromStorage? sarReportFromStorage : null)

  const analyzeCompany = () => {
    myFetcher(`${SERVER_URL}/${VERSION}/api/company-basics?ticker=${ticker}`)
    .then(fulfillment => {
        if(fulfillment && fulfillment.basicsOverview) {
          setNumOfEmployees(fulfillment.basicsOverview.numOfEmployees)
          sessionStorage.setItem('numOfEmployees', fulfillment.basicsOverview.numOfEmployees)
          setAuditor(fulfillment.basicsOverview.auditor)
          sessionStorage.setItem('auditor', fulfillment.basicsOverview.auditor)
          setLegalAdvisor(fulfillment.basicsOverview.legalAdvisor)
          sessionStorage.setItem('legalAdvisor', fulfillment.basicsOverview.legalAdvisor)
          setAnalystReportTitle(`${replaceWithEdgeCodes(fulfillment.basicsOverview.morningstarTake)}`)
          sessionStorage.setItem('analystReportTitile', fulfillment.basicsOverview.morningstarTake)
          setAnalystReport(`${replaceWithEdgeCodes(fulfillment.basicsOverview.analystNote)}`)
          sessionStorage.setItem('analystReport', fulfillment.basicsOverview.analystNote)
        }
      })
    .catch(error => console.log(`Error during company-basics API call! ${error}`))

    myFetcher(`${SERVER_URL}/${VERSION}/api/company-report?ticker=${ticker}`)
    .then(fulfillment => {
        if(fulfillment) {
          setSarReport(fulfillment.response)
          sessionStorage.setItem('sarReport', fulfillment.response)
        }
      })
    .catch(error => setSarReport(error.toString()))
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
        <InputGroup>
          <FormControl onChange={onInputChange} onKeyPress={handleKeyPress} aria-label="Ticker" aria-describedby="ticker-addon1" />
          <InputGroup.Append><Button variant="dark" onClick={analyzeCompany}>Analyze</Button></InputGroup.Append>
        </InputGroup>
        <label>Employees:</label>{" "}
        <span>{numOfEmployees}</span>
        <label>Auditor:</label>{" "}
        <span>{auditor}</span>
        <label>Legal Advisor:</label>{" "}
        <span>{legalAdvisor}</span>
      </div>
      <div className="company-analysis-analyst-report-panel">
        {analystReportTitile}
        <br/><br/>
        {analystReport}
      </div>
      <div className="company-analysis-sar-report-panel">
        {sarReport}
      </div>
    </div>
  )
}
export default React.memo(CompanyAnalysis)
