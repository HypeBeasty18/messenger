import React from 'react'
import SideBar from './sideBar/SideBar'
import s from './Layout.module.scss'
import ControlPanel from './controlPanel/ControlPanel'

type Props = {
  children: React.ReactNode
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <div className={s.container}>
      <ControlPanel/>
      <SideBar/>
      {children}
    </div>
  )
}

export default Layout