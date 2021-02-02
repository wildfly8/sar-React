import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import { replaceWithEdgeCodes } from '../MyUtil'
import SarConstants from '../SarConstants'

const CompanyAnalysis = () => {
  const numOfEmployeesFromStorage = sessionStorage.getItem('numOfEmployees')
  const auditorFromStorage = sessionStorage.getItem('auditor')
  const legalAdvisorFromStorage = sessionStorage.getItem('legalAdvisor')
  const analystReportTitileFromStorage = sessionStorage.getItem('analystReportTitile')
  const analystReportFromStorage = sessionStorage.getItem('analystReport')
  const perfSummaryFromStorage = JSON.parse(sessionStorage.getItem('perfSummary'))
  const sarReportFromStorage = sessionStorage.getItem('sarReport')

  const [ticker, setTicker] = useState(null)
  const [numOfEmployees, setNumOfEmployees] = useState(numOfEmployeesFromStorage? numOfEmployeesFromStorage : null)
  const [auditor, setAuditor] = useState(auditorFromStorage? auditorFromStorage : null)
  const [legalAdvisor, setLegalAdvisor] = useState(legalAdvisorFromStorage? legalAdvisorFromStorage : null)
  const [analystReportTitile, setAnalystReportTitle] = useState(analystReportTitileFromStorage? analystReportTitileFromStorage : null)
  const [analystReport, setAnalystReport] = useState(analystReportFromStorage? analystReportFromStorage : null)
  const [perfSummary, setPerfSummary] = useState(perfSummaryFromStorage? perfSummaryFromStorage : {})
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

    myFetcher(`${SERVER_URL}/${VERSION}/api/company-perfsummary?ticker=${ticker}`)
    .then(fulfillment => {
        if(fulfillment) {
          setPerfSummary(fulfillment)
          sessionStorage.setItem('perfSummary', JSON.stringify(fulfillment))
        }
      })
    .catch(error => console.log(`Error during company-perfsummary API call! ${error}`))

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
      <div className="company-performance-summary">
        <label>|| NetMargin* (tl_0):</label>
        <label>{perfSummary[SarConstants.NET_MARGIN_LEVEL_0]}</label>
        <label>|| NetMargin* (tl_1):</label>
        <label>{perfSummary[SarConstants.NET_MARGIN_LEVEL_1]}</label>
        <label>|| NetMargin* (tl_2):</label>
        <label>{perfSummary[SarConstants.NET_MARGIN_LEVEL_2]}</label>
        <label>|| NetMargin* (tl_3):</label>
        <label>{perfSummary[SarConstants.NET_MARGIN_LEVEL_3]}</label>
        <label>|| NetMargin* (ttm):</label>
        <label>{perfSummary[SarConstants.NET_MARGIN_TTM]}</label>
        <label>|| FcfMargin* (tl_0):</label>
        <label>{perfSummary[SarConstants.FCF_MARGIN_LEVEL_0]}</label>
        <label>|| FcfMargin* (tl_1):</label>
        <label>{perfSummary[SarConstants.FCF_MARGIN_LEVEL_1]}</label>
        <label>|| FcfMargin* (tl_2):</label>
        <label>{perfSummary[SarConstants.FCF_MARGIN_LEVEL_2]}</label>
        <label>|| FcfMargin* (tl_3):</label>
        <label>{perfSummary[SarConstants.FCF_MARGIN_LEVEL_3]}</label>
        <label>|| FcfMargin* (ttm):</label>
        <label>{perfSummary[SarConstants.FCF_MARGIN_TTM]}</label>
        <label>|| ROA* (tl_0):</label>
        <label>{perfSummary[SarConstants.ROA_LEVEL_0]}</label>
        <label>|| ROA* (tl_1):</label>
        <label>{perfSummary[SarConstants.ROA_LEVEL_1]}</label>
        <label>|| ROA* (tl_2):</label>
        <label>{perfSummary[SarConstants.ROA_LEVEL_2]}</label>
        <label>|| ROA* (tl_3):</label>
        <label>{perfSummary[SarConstants.ROA_LEVEL_3]}</label>
        <label>|| ROA* (ttm):</label>
        <label>{perfSummary[SarConstants.ROA_TTM]}</label>
        <label>|| ROE* (tl_0):</label>
        <label>{perfSummary[SarConstants.ROE_LEVEL_0]}</label>
        <label>|| ROE* (tl_1):</label>
        <label>{perfSummary[SarConstants.ROE_LEVEL_1]}</label>
        <label>|| ROE* (tl_2):</label>
        <label>{perfSummary[SarConstants.ROE_LEVEL_2]}</label>
        <label>|| ROE* (tl_3):</label>
        <label>{perfSummary[SarConstants.ROE_LEVEL_3]}</label>
        <label>|| ROE* (ttm):</label>
        <label>{perfSummary[SarConstants.ROE_TTM]}</label>
        <label>|| Leverage* (tl_0):</label>
        <label>{perfSummary[SarConstants.LEVERAGE_LEVEL_0]}</label>
        <label>|| Leverage* (tl_1):</label>
        <label>{perfSummary[SarConstants.LEVERAGE_LEVEL_1]}</label>
        <label>|| Leverage* (tl_2):</label>
        <label>{perfSummary[SarConstants.LEVERAGE_LEVEL_2]}</label>
        <label>|| Leverage* (tl_3):</label>
        <label>{perfSummary[SarConstants.LEVERAGE_LEVEL_3]}</label>
        <label>|| Leverage* (ttm):</label>
        <label>{perfSummary[SarConstants.LEVERAGE_TTM]}</label>
        <label>|| Debt/Equity* (tl_0):</label>
        <label>{perfSummary[SarConstants.DEBT_TO_EQUITY_LEVEL_0]}</label>
        <label>|| Debt/Equity* (tl_1):</label>
        <label>{perfSummary[SarConstants.DEBT_TO_EQUITY_LEVEL_1]}</label>
        <label>|| Debt/Equity* (tl_2):</label>
        <label>{perfSummary[SarConstants.DEBT_TO_EQUITY_LEVEL_2]}</label>
        <label>|| Debt/Equity* (tl_3):</label>
        <label>{perfSummary[SarConstants.DEBT_TO_EQUITY_LEVEL_3]}</label>
        <label>|| Debt/Equity* (ttm):</label>
        <label>{perfSummary[SarConstants.DEBT_TO_EQUITY_TTM]}</label>
        <label>|| CoverageR* (tl_0):</label>
        <label>{perfSummary[SarConstants.COVERAGE_RATIO_LEVEL_0]}</label>
        <label>|| CoverageR* (tl_1):</label>
        <label>{perfSummary[SarConstants.COVERAGE_RATIO_LEVEL_1]}</label>
        <label>|| CoverageR* (tl_2):</label>
        <label>{perfSummary[SarConstants.COVERAGE_RATIO_LEVEL_2]}</label>
        <label>|| CoverageR* (tl_3):</label>
        <label>{perfSummary[SarConstants.COVERAGE_RATIO_LEVEL_3]}</label>
        <label>|| CoverageR* (ttm):</label>
        <label>{perfSummary[SarConstants.COVERAGE_RATIO_TTM]}</label>
        <label>|| CurrentR* (tl_0):</label>
        <label>{perfSummary[SarConstants.CURRENT_RATIO_LEVEL_0]}</label>
        <label>|| CurrentR* (tl_1):</label>
        <label>{perfSummary[SarConstants.CURRENT_RATIO_LEVEL_1]}</label>
        <label>|| CurrentR* (tl_2):</label>
        <label>{perfSummary[SarConstants.CURRENT_RATIO_LEVEL_2]}</label>
        <label>|| CurrentR* (tl_3):</label>
        <label>{perfSummary[SarConstants.CURRENT_RATIO_LEVEL_3]}</label>
        <label>|| CurrentR* (ttm):</label>
        <label>{perfSummary[SarConstants.CURRENT_RATIO_TTM]}</label>
        <label>|| QuickR* (tl_0):</label>
        <label>{perfSummary[SarConstants.QUICK_RATIO_LEVEL_0]}</label>
        <label>|| QuickR* (tl_1):</label>
        <label>{perfSummary[SarConstants.QUICK_RATIO_LEVEL_1]}</label>
        <label>|| QuickR* (tl_2):</label>
        <label>{perfSummary[SarConstants.QUICK_RATIO_LEVEL_2]}</label>
        <label>|| QuickR* (tl_3):</label>
        <label>{perfSummary[SarConstants.QUICK_RATIO_LEVEL_3]}</label>
        <label>|| QuickR* (ttm):</label>
        <label>{perfSummary[SarConstants.QUICK_RATIO_TTM]}</label>
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
