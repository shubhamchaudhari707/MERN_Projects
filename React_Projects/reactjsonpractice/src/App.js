import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmpListening from './EmpListening';
import EmpCreate from './EmpCreate';
import EmpDetails from './EmpDetails';
import EmpEdit from './EmpEdit';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpListening/>}  />
          <Route path='/employee' element={<EmpCreate/>}  />
          <Route path='/empdetail/:empid' element={<EmpDetails/>}  />
          <Route path='/empedit/:empid' element={<EmpEdit/>}  />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App