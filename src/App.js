import React from 'react'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import CreateProfile from './pages/CreateProfile'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/createprofile" element={<CreateProfile />} />
      </Routes>
    </Router>
    
  )
}

export default App