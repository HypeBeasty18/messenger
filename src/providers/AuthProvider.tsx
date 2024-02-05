import React from 'react'
import { FC, createContext } from "react";

type Props = {}

const AuthContext = createContext({})


const AuthProvider:FC = (props: Props) => {




  return (
    <AuthContext.Provider value={{}}>

    </AuthContext.Provider>
  )
}

export default AuthProvider


