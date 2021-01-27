import React, { useState, useEffect } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { SERVER_URL, VERSION, myFetcher } from '../api'


const Screening = () => {
  const screeningReportFromStorage = sessionStorage.getItem('screeningReport')

  const [screeningReport, setScreeningReport] = useState(screeningReportFromStorage? screeningReportFromStorage : null)
  const [subscribed, setSubscribed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showStartModal, setShowStartModal] = useState(false)

  useEffect(() => {
    if(subscribed) {
      setShowStartModal(true)
    } else if(!subscribed && progress === 100) {
      setShowStartModal(false)
    }
  }, [subscribed, progress])

  const generateScreeningResult = () => {
    setSubscribed(true)
    setProgress(0)
    myFetcher(`${SERVER_URL}/${VERSION}/api/screening-result`)
    .then(fulfillment => {
        if(fulfillment) {
          setScreeningReport(fulfillment.response)
          sessionStorage.setItem('screeningReport', fulfillment.response)
        }
      })
    .catch(error => setScreeningReport(error.toString()))
    .finally(() => {
      setProgress(100)
      setSubscribed(false)
    })
  }

  return (
    <div>
      <Modal centered size="lg" show={showStartModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Attention:</Modal.Title>
        </Modal.Header>
        <Modal.Body><h5>Server is handling your request...</h5><Spinner animation="border" variant="success" /></Modal.Body>
      </Modal>
      <div className="screening-button-panel">
        <Button variant="dark" onClick={generateScreeningResult}>Generate Result</Button>
      </div>
      <div className="screening-report-panel">
        {screeningReport}
      </div>
    </div>
  )
}
export default React.memo(Screening)
