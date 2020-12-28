import React from 'react'
import MacroEconTable from './MacroEconTable'

const MacroEcon = ({ economicIndices }) => {

  return (
    <>
      <div id="macroecon" className="macro-econ">
        <MacroEconTable data={Object.values(economicIndices)} />
      </div>
    </>
  )
}
export default React.memo(MacroEcon)
