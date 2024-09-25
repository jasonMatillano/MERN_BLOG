import Navbar from "./Navbar"
import Login from "./login"
import Home from "./Home"
import CreatePost from "./CreatePost"
import Register from "./Register"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { createContext, useEffect , useState } from "react"
import axios from 'axios'

export const userContext = createContext()

function App() {

  const [user, setUser] = useState({})

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:3001/')
    .then((user) => {
      setUser(user.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  
  return (
    <userContext.Provider value={user}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
