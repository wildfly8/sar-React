import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import { SERVER_URL, VERSION, myFetcher } from '../api'
import { formatNumberInCommaWithDecimal, formatNumberInPercentWithDecimal } from '../MyUtil'
import SecurityConstants from '../SecurityConstants'

export const PX_TARGET_HEADERS = Object.freeze({
  id: 'id',
  ticker: 'ticker',
  sector: 'sector',
  lastPx: 'lastPx',
  dailyPercentChg: 'dailyPercentChg',
  ttmPE: 'ttmPE',
  leverage: 'leverage',
  passGrahamTest: 'passGrahamTest',
  confidenceLevel: 'confidenceLevel',
  fcf: 'fcf',
  enforcedFcf: 'enforcedFcf',
  fcfGrowth: 'fcfGrowth',
  enforcedFcfGrowth: 'enforcedFcfGrowth',
  sharesGrowth: 'sharesGrowth',
  enforcedSharesGrowth: 'enforcedSharesGrowth',
  perpGrowth: 'perpGrowth',
  enforcedPerpGrowth: 'enforcedPerpGrowth',
  discountRate: 'discountRate',
  moS: 'moS',
  vendorLowPT: 'vendorLowPT',
  neartermPT: 'neartermPT',
  enforcedNeartermPT: 'enforcedNeartermPT',
  neartermMargin: 'neartermMargin',
  vendorMedianPT: 'vendorMedianPT',
  longtermPT: 'longtermPT',
  enforcedLongtermPT: 'enforcedLongtermPT',
  longtermMargin: 'longtermMargin',  
  vendorHighPT: 'vendorHighPT',
  potentialPT: 'potentialPT',
  enforcedPotentialPT: 'enforcedPotentialPT',
  potentialMargin: 'potentialMargin',
  zacksAndYahooRank: 'zacksAndYahooRank'
})

const RatingEnforcementTable = ({ data }) => {
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  const columns = [{
    dataField: PX_TARGET_HEADERS.id,
    text: 'id',
    hidden: true
  }, {
    dataField: PX_TARGET_HEADERS.ticker,
    text: 'ticker',
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
    dataField: PX_TARGET_HEADERS.sector,
    text: 'sector',
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
    dataField: PX_TARGET_HEADERS.lastPx,
    text: 'eodPx',
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
    dataField: PX_TARGET_HEADERS.dailyPercentChg,
    text: 'dChg%',
    editable: false,
    formatter: (cell) => (
      formatNumberInPercentWithDecimal(cell, 2)
    ),
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: (cell, row, rowIndex, colIndex) => {
      if(cell != null && cell > 0.0) {
        return {
          color: 'green',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      } else if(cell != null && cell === 0.0) {
        return {
          color: 'black',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      } else {
        return {
          color: 'red',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }
    }
  }, {
    dataField: PX_TARGET_HEADERS.ttmPE,
    text: 'ttmPE',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: (cell, row, rowIndex, colIndex) => {
      if(cell && cell < 20.0 && cell > 0.0) {
        return {
          color: 'green',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      } else {
        return {
          color: 'red',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }
    }
  }, {
    dataField: PX_TARGET_HEADERS.leverage,
    text: 'lvg',
    editable: false,
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: (cell, row, rowIndex, colIndex) => {
      if(cell && cell > 4.0) {
        return {
          color: 'red',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      } else {
        return {
          color: 'green',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }
    }
  }, {
    dataField: PX_TARGET_HEADERS.passGrahamTest,
    text: 'GT',
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
    dataField: PX_TARGET_HEADERS.confidenceLevel,
    text: 'cl',
    headerStyle: {
      width: '2%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: (cell, row, rowIndex, colIndex) => {
      if(cell && cell === 4) {
        return {
          color: 'red',
          backgroundColor: '#D3D3D3',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      } else if(cell && cell === 3) {
        return {
          color: 'magenta',
          backgroundColor: '#D3D3D3',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }  else if(cell && cell === 2) {
        return {
          color: 'cyan',
          backgroundColor: '#D3D3D3',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }  else if(cell && cell === 1) {
        return {
          color: 'green',
          backgroundColor: '#D3D3D3',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      } else {
        return {
          backgroundColor: '#D3D3D3',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }
    }
  }, {
    dataField: PX_TARGET_HEADERS.fcf,
    text: 'fcf',
    editable: false,
    formatter: (cell) => (
      formatNumberInCommaWithDecimal(cell, 0)
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
    dataField: PX_TARGET_HEADERS.enforcedFcf,
    text: 'fcf*',
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      backgroundColor: '#D3D3D3',
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: PX_TARGET_HEADERS.fcfGrowth,
    text: 'fcfGr',
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
    dataField: PX_TARGET_HEADERS.enforcedFcfGrowth,
    text: 'fcfGr*',
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      backgroundColor: '#D3D3D3',
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: PX_TARGET_HEADERS.sharesGrowth,
    text: 'shGr',
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
    dataField: PX_TARGET_HEADERS.enforcedSharesGrowth,
    text: 'shGr*',
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      backgroundColor: '#D3D3D3',
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: PX_TARGET_HEADERS.perpGrowth,
    text: 'perpGr',
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
    dataField: PX_TARGET_HEADERS.enforcedPerpGrowth,
    text: 'perpGr*',
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      backgroundColor: '#D3D3D3',
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: PX_TARGET_HEADERS.discountRate,
    text: 'discR',
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
    dataField: PX_TARGET_HEADERS.moS,
    text: 'MoS',
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
    dataField: PX_TARGET_HEADERS.vendorLowPT,
    text: 'ana_lpt',
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
    dataField: PX_TARGET_HEADERS.neartermPT,
    text: 'nt_pt',
    editable: false,
    formatter: (cell) => (
      formatNumberInCommaWithDecimal(cell, 1)
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
    dataField: PX_TARGET_HEADERS.enforcedNeartermPT,
    text: 'enf_pt',
    editable: false,
    formatter: (cell) => (
      formatNumberInCommaWithDecimal(cell, 1)
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
    dataField: PX_TARGET_HEADERS.neartermMargin,
    text: 'nt%',
    editable: false,
    formatter: (cell) => (
      formatNumberInPercentWithDecimal(cell, 0)
    ),
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: (cell, row, rowIndex, colIndex) => {
      if(cell && cell < -0.1) {
        return {
          color: 'red',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      } else if(cell && cell < 0.0) {
        return {
          color: 'magenta',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }  else if(cell && cell < 0.2) {
        return {
          color: 'cyan',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }  else {
        return {
          color: 'green',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }
    }
  }, {
    dataField: PX_TARGET_HEADERS.vendorMedianPT,
    text: 'ana_mpt',
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
    dataField: PX_TARGET_HEADERS.longtermPT,
    text: 'lt_pt',
    editable: false,
    formatter: (cell) => (
      formatNumberInCommaWithDecimal(cell, 1)
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
    dataField: PX_TARGET_HEADERS.enforcedLongtermPT,
    text: 'enf_pt',
    editable: false,
    formatter: (cell) => (
      formatNumberInCommaWithDecimal(cell, 1)
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
    dataField: PX_TARGET_HEADERS.longtermMargin,
    text: 'lt%',
    editable: false,
    formatter: (cell) => (
      formatNumberInPercentWithDecimal(cell, 0)
    ),
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: (cell, row, rowIndex, colIndex) => {
      if(cell && cell < -0.1) {
        return {
          color: 'red',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      } else if(cell && cell < 0.0) {
        return {
          color: 'magenta',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }  else if(cell && cell < 0.2) {
        return {
          color: 'cyan',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }  else {
        return {
          color: 'green',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }
    }
  }, {
    dataField: PX_TARGET_HEADERS.vendorHighPT,
    text: 'ana_hpt',
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
    dataField: PX_TARGET_HEADERS.potentialPT,
    text: 'pt_pt',
    editable: false,
    formatter: (cell) => (
      formatNumberInCommaWithDecimal(cell, 1)
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
    dataField: PX_TARGET_HEADERS.enforcedPotentialPT,
    text: 'enf_pt',
    formatter: (cell) => (
      formatNumberInCommaWithDecimal(cell, 1)
    ),
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      backgroundColor: '#D3D3D3',
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: PX_TARGET_HEADERS.potentialMargin,
    text: 'pt%',
    editable: false,
    formatter: (cell) => (
      formatNumberInPercentWithDecimal(cell, 0)
    ),
    headerStyle: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: (cell, row, rowIndex, colIndex) => {
      if(cell && cell < -0.1) {
        return {
          color: 'red',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      } else if(cell && cell < 0.0) {
        return {
          color: 'magenta',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }  else if(cell && cell < 0.2) {
        return {
          color: 'cyan',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }  else {
        return {
          color: 'green',
          paddingTop: '0px',
          paddingBottom: '0px'
        }
      }
    }
  }, {
    dataField: PX_TARGET_HEADERS.zacksAndYahooRank,
    text: 'Zacks_Yahoo_rank',
    editable: false,
    headerStyle: {
      width: '11%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }]
  
  const rowStyle = (row, rowIndex) => {
    if(SecurityConstants.LIST_TYPES.includes(row.ticker)) {
      return { 
        height: '17px',
        fontWeight: 'bold',
        backgroundColor: '#D3D3D3'
      }
    } else {
      return { 
        height: '17px'  
      }
    }
  }

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
    nonEditableRows: () => [0, 1, 2, 3, 4, 5],
    afterSaveCell: (oldValue, newValue, row, column) => { 
      if(PX_TARGET_HEADERS.enforcedFcf === column.dataField || PX_TARGET_HEADERS.enforcedFcfGrowth === column.dataField || PX_TARGET_HEADERS.enforcedSharesGrowth === column.dataField || PX_TARGET_HEADERS.enforcedPerpGrowth === column.dataField) {
        myFetcher(`${SERVER_URL}/${VERSION}/api/intrinsic-valuation/calculate?ticker=${row.ticker}&nyFCF=${(row.enforcedFcf == null || row.enforcedFcf.length === 0)? row.fcf : row.enforcedFcf}&fcfGr=${(row.enforcedFcfGrowth == null || row.enforcedFcfGrowth.length === 0)? row.fcfGrowth : row.enforcedFcfGrowth}&SharesGr=${(row.enforcedSharesGrowth == null || row.enforcedSharesGrowth.length === 0)? row.sharesGrowth : row.enforcedSharesGrowth}&PerpGr=${(row.enforcedPerpGrowth == null || row.enforcedPerpGrowth.length === 0)? row.perpGrowth : row.enforcedPerpGrowth}&DiscR=${row.discountRate}&MoS=${row.moS}`)
        .then(fulfillment => {
            if(fulfillment) {
              row.enforcedNeartermPT = fulfillment.buyPx
              row.enforcedLongtermPT = fulfillment.perShareIV
              row.neartermMargin = (row.enforcedNeartermPT - row.lastPx) / row.lastPx
              row.longtermMargin = (row.enforcedLongtermPT - row.lastPx) / row.lastPx
              forceUpdate()
            }
          })
        .catch(error => alert(`${row.ticker} field ${column.dataField}: Error during iv-calculate API call! ${error}`))
      } else if(PX_TARGET_HEADERS.enforcedPotentialPT === column.dataField) {
        if(newValue == null || newValue.length === 0) {
          row.potentialMargin = (row.potentialPT - row.lastPx) / row.lastPx
        } else {
          row.potentialMargin = (row.enforcedPotentialPT - row.lastPx) / row.lastPx
        }
        forceUpdate()
      }
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