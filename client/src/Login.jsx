import { Link } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
      event.preventDefault()
      axios.post('http://localhost:3001/login', {
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
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
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
      <button>Login</button>
    </form>
    <br />
    <p>Not Registered? <a href="/login"><Link to='/register'>Sign Up</Link></a></p>
  </div>
  )
}

export default Login