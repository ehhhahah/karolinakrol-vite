import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/App.css'
import HomePage from './HomePage'
import Layout from './components/Layout'


const MainContent = () => {
  return (
    <Routes>
      <Route path="/*" element={<HomePage isList={false} />} />
      <Route path="/works" element={<HomePage isList={true} />} />
    </Routes>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <MainContent />
      </Layout>
    </BrowserRouter>
  )
}

export default App