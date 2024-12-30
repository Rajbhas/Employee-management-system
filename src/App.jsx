import React from 'react'
import ListEmployeecomponent from './components/ListEmployeecomponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <HeaderComponent/>
    <Routes>
      {/* //http://localhost:3000 */}
      <Route path='/' element={<ListEmployeecomponent/> }></Route>
      {/* //http://localhost:3000/employee */}
      <Route path='/employee' element={<ListEmployeecomponent/> }></Route>
       {/* //http://localhost:3000/add-employee */}
      <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
      {/* //http://localhost:3000/edit-employee/id */}
      <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>

    </Routes>
    
    <FooterComponent/>
    
    </BrowserRouter>
    
      
    </>
  )
}

export default App
