import React from 'react'
import SideBar from './sideBar/SideBar'
import s from './Layout.module.scss'

type Props = {
  children: React.ReactNode
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <div className={s.container}>
      <SideBar/>
      {children}
    </div>
  )
}

export default Layout