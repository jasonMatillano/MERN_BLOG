import { Link } from "react-router-dom"

function Login() {
  return (
    <div className="signup_form">
    <h2>Login</h2>
    <form action="">
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <button>Login</button>
    </form>
    <br />
    <p>Not Registered? <a href="/login"><Link to='/register'>Sign Up</Link></a></p>
  </div>
  )
}

export default Login