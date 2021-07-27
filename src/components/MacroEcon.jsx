import React from 'react'
import MacroEconTable from './MacroEconTable'

const MacroEcon = ({ economicIndices }) => {

  return (
    <>
      <div id="macroecon" className="macro-econ">
        <MacroEconTable data={economicIndices} />
      </div>
    </>
  )
}

const areEconIndicesEqual = (prevProps, props) => {
  return prevProps.economicIndices === props.economicIndices
}

export default React.memo(MacroEcon, areEconIndicesEqual)
