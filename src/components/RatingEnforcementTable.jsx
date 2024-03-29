import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'


export const RATING_ENFORCEMENT_HEADERS = Object.freeze({
  id: 'id',
  isNew: 'isNew',
  ticker: 'ticker',
  systemRating: 'systemRating',
  enforcedRating: 'enforcedRating',
  enforcedReason: 'enforcedReason'
})

const RatingEnforcementTable = ({ data }) => {
  const columns = [{
    dataField: RATING_ENFORCEMENT_HEADERS.id,
    text: 'id',
    hidden: true
  }, {
    dataField: RATING_ENFORCEMENT_HEADERS.isNew,
    text: 'isNew',
    hidden: true
  }, {
    dataField: RATING_ENFORCEMENT_HEADERS.ticker,
    text: 'ticker',
    formatter: (cell) => (
      cell? cell.toUpperCase() : cell
    ),
    headerStyle: {
      width: '10%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: RATING_ENFORCEMENT_HEADERS.systemRating,
    text: 'systemRating',
    formatter: (cell) => (
      cell? cell.toUpperCase() : null
    ),
    headerStyle: {
      width: '10%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: RATING_ENFORCEMENT_HEADERS.enforcedRating,
    text: 'enforcedRating',
    formatter: (cell) => (
      cell? cell.toUpperCase() : null
    ),
    headerStyle: {
      width: '10%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: RATING_ENFORCEMENT_HEADERS.enforcedReason,
    text: 'enforcedReason',
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px',
      textAlign: 'start'
    }
  }]

  const rowStyle = { height: '17px' }

  const selectRow = {
    mode: 'radio',
    bgColor: '#99ccff',
    hideSelectColumn: true,
    clickToSelect: true,
    clickToEdit: true
  }

  const cellEdit = cellEditFactory({
    mode: 'click',
    blurToSave: true,
    afterSaveCell: (oldValue, newValue, row, column) => { 
      newValue = newValue.toUpperCase()
    }
  })

  return (
    <div className="rating-enforcement-table">
      <BootstrapTable bootstrap4 hover columns={columns} keyField='id' data={data}
        selectRow={selectRow} condensed={true} rowStyle={rowStyle} cellEdit={cellEdit} />
    </div>
  )
}

export default RatingEnforcementTable