import { useState } from 'react'
import ReactDOM from 'react-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './assets/scripts/Header'
import { BrowserRouter, Routes, Route } from 'react-router'
import Homepage from './assets/scripts/Homepage'
import RecipePage from './assets/scripts/RecipePage'
import Footer from './assets/scripts/Footer'
import NewRecipePage from './assets/scripts/NewRecipePage'
import FavoritePage from './assets/scripts/FavoritePage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>


      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/:name" Component={RecipePage} />
        <Route path="/new-recipe" Component={NewRecipePage} />
        <Route path="/favorites" Component={FavoritePage} />
      </Routes>
      <Footer />
    </ BrowserRouter>
  )
}

export default App
