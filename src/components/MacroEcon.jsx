import React, { useContext } from 'react'
import { MyContext } from '../MyContext'
import MacroEconTable from './MacroEconTable'


const MacroEcon = () => {
  const { econIndices } = useContext(MyContext)
  const [economicIndices, ] = econIndices;

  return (
    <>
      <div id="macroecon" className="macro-econ">
        <MacroEconTable data={Object.values(economicIndices)} />
      </div>
    </>
  )
}
export default MacroEcon
