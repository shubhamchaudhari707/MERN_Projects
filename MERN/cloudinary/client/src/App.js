import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import Register from './Register'

const App = () => {
  return (
    <>

      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App