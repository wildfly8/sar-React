import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import { formatNumberInCommaWithDecimal, formatNumberInPercent } from '../MyUtil'

export const PX_TARGET_HEADERS = Object.freeze({
  id: 'id',
  ticker: 'ticker',
  sector: 'sector',
  lastPx: 'lastPx',
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

const rowStyle = { height: '17px' }

const RatingEnforcementTable = ({ data }) => {
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
    text: 'lastPx',
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
          color: 'lime',
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
          color: 'lime',
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
    dataField: PX_TARGET_HEADERS.neartermMargin,
    text: 'nt %',
    editable: false,
    formatter: (cell) => (
      formatNumberInPercent(cell)
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
          color: 'lime',
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
    dataField: PX_TARGET_HEADERS.longtermMargin,
    text: 'lt %',
    editable: false,
    formatter: (cell) => (
      formatNumberInPercent(cell)
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
          color: 'lime',
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
    text: 'pt %',
    editable: false,
    formatter: (cell) => (
      formatNumberInPercent(cell)
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
          color: 'lime',
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
      width: '12%',
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

  return (
    <div className="rating-enforcement-table">
      <BootstrapTable bootstrap4 columns={columns} keyField='id' data={data}
        selectRow={selectRow} condensed={true} rowStyle={rowStyle} cellEdit={cellEdit}  />
    </div>
  )
}

export default RatingEnforcementTable