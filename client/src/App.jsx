import Navbar from "./Navbar"
import Login from "./login"
import Home from "./Home"
import Register from "./Register"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { createContext, useEffect } from "react"
import axios from 'axios'

export const UserContext = createContext()

function App() {

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:3001/')
    .then((response) => {
      console.log(response)
    })
  }, [])
  
  return (
    // <UserContext.Provider value="">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
