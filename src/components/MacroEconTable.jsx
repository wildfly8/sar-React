import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

const HEADERS = Object.freeze({
  id: 'id',
  indexName:  'indexName',
  nextReportDate: 'nextReportDate',
  reports: 'reports',
})

const rowStyle = { height: '17px' }

const MacroEconTable = ({ data }) => {

  const columns = [{
    dataField: HEADERS.id,
    text: 'id',
    hidden: true
  }, {
    dataField: HEADERS.indexName,
    text: 'indexName',
    headerStyle: {
      width: '20%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: HEADERS.nextReportDate,
    text: 'nextReportDate',
    headerStyle: {
      width: '5%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: HEADERS.reports,
    text: 'reports',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }]

  const selectRow = {
    mode: 'radio',
    bgColor: '#99ccff',
    hideSelectColumn: true,
    clickToSelect: true,
  }

  return (
    <div className="watchlist-table">
      <BootstrapTable bootstrap4 columns={ columns } keyField='id' data={ data }
        selectRow={ selectRow } condensed = { true } rowStyle={ rowStyle } />
    </div>
  )
}

export default MacroEconTable
export { HEADERS }