import React, { useState, useEffect } from 'react'
import { useOktaAuth } from '@okta/okta-react';


export const MyContext = React.createContext()

export const MyContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const { authState, authService } = useOktaAuth();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]);

  return (
    <MyContext.Provider value={{ user: [userInfo, setUserInfo], auth: [authState, authService] }} >
      {props.children}
    </MyContext.Provider>
  )
}