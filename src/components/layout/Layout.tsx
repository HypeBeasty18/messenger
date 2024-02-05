import React from 'react'
import SideBar from './sideBar/SideBar'

type Props = {
  children: React.ReactNode
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <div>
      <SideBar/>
      {children}
    </div>
  )
}

export default Layout