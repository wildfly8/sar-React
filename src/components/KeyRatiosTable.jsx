import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { formatSimpleDate, formatNumberInComma } from '../MyUtil'


export const KEYRATIOS_HEADERS = Object.freeze({
  id: 'id',
  endDate: 'endDate',
  shares: 'dilutedNumOfSharesKeyRatios',
  revenue: 'revenueKeyRatios',
  operatingIncome: 'operatingIncomeKeyRatios',
  operatingCashflow: 'ocf',
  netIncome: 'netIncomeKeyRatios',
  freeCashflow: 'fcf',
  capex: 'capexKeyRatios',
  dividends: 'dividend',
  grossMargin: 'grossMargin',
  sGnAMargin: 'sGnAMargin',
  rnDMargin : 'rnDMargin',
  operatingMargin : 'operatingMargin',
  netMargin : 'netMargin',
  fcfMargin : 'fcfMargin',
  rOA : 'rOA',
  rOE : 'rOE',
  leverage : 'financialLeverage',
  debtToEquity: 'debtToEquity',
  coverageRatio: 'coverageRatio',
  currentRatio: 'currentRatio',
  quickRatio: 'quickRatio',
  tenYearAvgRevenueGrowth: 'tenYearAvgRevenueGrowth',
  yearOverYearRevenueGrowth: 'yoyRevenueGrowth',
  tenYearAvgOIGrowth: 'tenYearAvgOperatingIncomeGrowth',
  yearOverYearOIGrowth: 'yoyOperatingIncomeGrowth',
  tenYearAvgNIGrowth: 'tenYearAvgNetIncomeGrowth',
  yearOverYearNIGrowth: 'yoyNetIncomeGrowth',
})

const RatingEnforcementTable = ({ data }) => {
  const columns = [{
    dataField: KEYRATIOS_HEADERS.id,
    text: 'id',
    hidden: true
  }, {
    dataField: KEYRATIOS_HEADERS.endDate,
    text: 'End Date',
    formatter: (cell) => (
      formatSimpleDate(cell)
    ),
    headerStyle: {
      width: '4%',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    style: {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  }, {
    dataField: KEYRATIOS_HEADERS.shares,
    text: 'Shares',
    formatter: (cell) => (
      formatNumberInComma(cell)
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
    dataField: KEYRATIOS_HEADERS.revenue,
    text: 'Revenue',
    formatter: (cell) => (
      formatNumberInComma(cell)
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
    dataField: KEYRATIOS_HEADERS.operatingIncome,
    text: 'OI',
    formatter: (cell) => (
      formatNumberInComma(cell)
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
    dataField: KEYRATIOS_HEADERS.operatingCashflow,
    text: 'OCF',
    formatter: (cell) => (
      formatNumberInComma(cell)
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
    dataField: KEYRATIOS_HEADERS.netIncome,
    text: 'NI',
    formatter: (cell) => (
      formatNumberInComma(cell)
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
      dataField: KEYRATIOS_HEADERS.freeCashflow,
      text: 'FCF',
      formatter: (cell) => (
        formatNumberInComma(cell)
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
    dataField: KEYRATIOS_HEADERS.capex,
    text: 'Capex',
    formatter: (cell) => (
      formatNumberInComma(cell)
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
  dataField: KEYRATIOS_HEADERS.dividends,
  text: 'Div',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.grossMargin,
  text: 'Gross%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.sGnAMargin,
  text: 'SG&A%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.rnDMargin,
  text: 'R&D%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.operatingMargin,
  text: 'OI%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.netMargin,
  text: 'NI%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.fcfMargin,
  text: 'FCF%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.rOA,
  text: 'ROA',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.rOE,
  text: 'ROE',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.leverage,
  text: 'Leverage',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.debtToEquity,
  text: 'Debt/Eq',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.coverageRatio,
  text: 'CovR',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.currentRatio,
  text: 'CurR',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.quickRatio,
  text: 'QuickR',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.tenYearAvgRevenueGrowth,
  text: '10yRev%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.yearOverYearRevenueGrowth,
  text: 'yoy%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.tenYearAvgOIGrowth,
  text: '10yOI%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.yearOverYearOIGrowth,
  text: 'yoy%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.tenYearAvgNIGrowth,
  text: '10yNI%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}, {
  dataField: KEYRATIOS_HEADERS.yearOverYearNIGrowth,
  text: 'yoy%',
  headerStyle: {
    paddingTop: '0px',
    paddingBottom: '0px'
  },
  style: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
}]

const rowStyle = { height: '17px' }

const selectRow = {
  mode: 'radio',
  bgColor: '#99ccff',
  hideSelectColumn: true,
  clickToSelect: true,
}

  return (
    <div className="rating-enforcement-table">
      <BootstrapTable bootstrap4 columns={columns} keyField='id' data={data}
        selectRow={selectRow} condensed={true} rowStyle={rowStyle} />
    </div>
  )
}

export default RatingEnforcementTable