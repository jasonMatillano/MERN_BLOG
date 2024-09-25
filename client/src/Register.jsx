import { Link } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'

function Register() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3001/register', {
      username: username,
      email: email,
      password: password
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="signup_form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" 
          onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" 
          onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password"
          onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <button>Sign Up</button>
      </form>
      <br />
      <p>Already have an account? <a href="/login"><Link to='/login'>Login</Link></a></p>
    </div>
  )
}

export default Register