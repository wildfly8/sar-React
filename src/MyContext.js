import React, { useState, useEffect } from 'react'
import { useOktaAuth } from '@okta/okta-react'
import { SERVER_URL, myFetcher } from './api'


export const MyContext = React.createContext()

export const MyContextProvider = (props) => {

  const [economicIndices, setEconomicIndices] = useState({})
  const [userInfo, setUserInfo] = useState(null)
  const { authState, authService } = useOktaAuth()

  useEffect(() => {
    myFetcher(`${SERVER_URL}/api/findAllMacroEconomicIndices`)
    .then(fulfillment => {
        setEconomicIndices(fulfillment)
      })
    .catch(error => console.error(`API error when retrieving All Macro Economic Indices: ${error} !`))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUserInfo(null)
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info)
      })
    }
  }, [authState, authService])

  return (
    <MyContext.Provider value={{ econIndices: [economicIndices, setEconomicIndices], user: [userInfo, setUserInfo], auth: [authState, authService] }} >
      {props.children}
    </MyContext.Provider>
  )
}