import { useState } from 'react'
import Layout from './components/layout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Createteam from "./pages/creategrp"
import './App.css'

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Createteam />}/>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
