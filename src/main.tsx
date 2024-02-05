import React from 'react'
import ReactDOM from 'react-dom/client'
import 'assets/styles/indes.scss'
import Routers from 'routers/Routers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routers/>
  </React.StrictMode>,
)
