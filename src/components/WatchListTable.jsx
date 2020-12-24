import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor'
import { formatNumber } from '../MyUtil'

const WATCHLIST_HEADERS = Object.freeze({
  id: 'id',
  ticker:  'ticker',
  exchange: 'exchange',
  algoRating: 'algoRating',
  mktCap: 'mktCap',
  earDate: 'earDate',
  divYld: 'divYld',
  exDate: 'exDate',
  floatPercent: 'floatPercent',
  avgVolume: 'avgVolume',
  shortRatio: 'shortRatio',
  numOfEmployees: 'numOfEmployees',
  insiderPercent: 'insiderPercent',
  institutionPercent: 'institutionPercent',
  netIncome: 'netIncome',
  freeCashflow: 'freeCashflow',
  netMargin: 'netMargin',
  returnOnAsset: 'returnOnAsset',
  returnOnEquity: 'returnOnEquity',
  quarterlyRevenueGrowthYoY: 'quarterlyRevenueGrowthYoY',
  quarterlyEarningsGrowthYoY: 'quarterlyEarningsGrowthYoY',
  debtToEquity: 'debtToEquity',
  pE: 'pE',
  forwardPE: 'forwardPE',
  pS: 'pS',
  pB: 'pB',
  isDow30: 'isDow30',
  isSnP500: 'isSnP500',
  isNasdaq100: 'isNasdaq100'
})

const rowStyle = { height: '17px' }

const WatchListTable = ({ data, isEditable }) => {

  const columns = [{
    dataField: WATCHLIST_HEADERS.id,
    text: 'id',
    hidden: true
  }, {
    dataField: WATCHLIST_HEADERS.ticker,
    text: 'ticker',
    formatter: (cell) => (
      cell.toUpperCase()
    ),
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.exchange,
    text: 'exch',
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'SMART',
        label: 'SMART'
      }, {
        value: 'CVE',
        label: 'CVE'
      }, {
        value: 'AXS',
        label: 'AXZ'
      }]
    }
  }, {
    dataField: WATCHLIST_HEADERS.algoRating,
    text: 'algoRt',
    editable: false,
    headerStyle: {
      width: '3%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.mktCap,
    text: 'mktCap',
    sort: isEditable? false : true,
    editable: false,
    type: Type.number,
    formatter: (cell) => (
      formatNumber(cell)
    ),
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.earDate,
    text: 'earDate',
    editable: false,
    formatter: (cell) => (
      cell? (cell.startsWith(",")? cell.replace(",", "") : cell.replace(",", " ")) : null
    ),
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.divYld,
    text: 'divYld',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.exDate,
    text: 'exDate',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.floatPercent,
    text: 'float%',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.avgVolume,
    text: 'avgVol',
    editable: false,
    formatter: (cell) => (
      cell? formatNumber(parseFloat(cell.replace(/,/g, ''))) : null
    ),
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.shortRatio,
    text: 'shortR',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.numOfEmployees,
    text: 'empls',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.insiderPercent,
    text: 'insider%',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.institutionPercent,
    text: 'inst%',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.netIncome,
    text: 'NIAC',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.freeCashflow,
    text: 'LCF',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.netMargin,
    text: 'nMgn',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.returnOnAsset,
    text: 'ROA',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.returnOnEquity,
    text: 'ROE',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.quarterlyRevenueGrowthYoY,
    text: 'yRevGr',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.quarterlyEarningsGrowthYoY,
    text: 'yEarGr',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.debtToEquity,
    text: 'D/E',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.pE,
    text: 'P/E',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.forwardPE,
    text: 'fwP/E',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.pS,
    text: 'P/S',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.pB,
    text: 'P/B',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.isDow30,
    text: 'D&J',
    editable: false,
    formatter: (cell) => (
      cell? "Y" : null
    ),
    headerStyle: {
      width: '2%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.isSnP500,
    text: 'S&P',
    editable: false,
    formatter: (cell) => (
      cell? "Y" : null
    ),
    headerStyle: {
      width: '2%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: WATCHLIST_HEADERS.isNasdaq100,
    text: 'NAS',
    editable: false,
    formatter: (cell) => (
      cell? "Y" : null
    ),
    headerStyle: {
      width: '2%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }]
   
  const defaultSorted = [{
    dataField: WATCHLIST_HEADERS.mktCap,
    order: 'desc'
  }]

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
    beforeSaveCell: (oldValue, newValue, row, column) => { 
      newValue = newValue.toUpperCase()
      console.log(`beforeSaveCell: oldValue=${oldValue}, newValue=${newValue}`)
    },
    afterSaveCell: (oldValue, newValue, row, column) => { 
      newValue = newValue.toUpperCase()
      console.log(`afterSaveCell: oldValue=${oldValue}, newValue=${newValue}`)
    }
  })

  if(isEditable) {
    return (
      <div className="editlist-table">
        <BootstrapTable bootstrap4 columns={ columns } keyField='id' data={ data } headerWrapperClasses='watchlist-table-header' 
          selectRow={ selectRow } condensed = { true } rowStyle={ rowStyle } cellEdit={ cellEdit }  />
      </div>
    )
  } else {
    return (
      <div className="watchlist-table">
        <BootstrapTable bootstrap4 columns={ columns } keyField='id' data={ data } defaultSorted={ defaultSorted } headerWrapperClasses='watchlist-table-header' 
          selectRow={ selectRow } condensed = { true } rowStyle={ rowStyle } />
      </div>
    )
  }
}

export default WatchListTable
export { WATCHLIST_HEADERS }