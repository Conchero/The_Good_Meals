import { useState } from 'react'
import ReactDOM from 'react-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './assets/scripts/Header'
import { BrowserRouter, Routes, Route } from 'react-router'
import Homepage from './assets/scripts/Homepage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>


    <Routes>
      <Route path="/" Component={Homepage}/>
    </Routes>
    </ BrowserRouter>
  )
}

export default App
