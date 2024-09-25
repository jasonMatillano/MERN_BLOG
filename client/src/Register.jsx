import { Link } from "react-router-dom"

function Register() {
  return (
    <div className="signup_form">
      <h2>Sign Up</h2>
      <form action="">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button>Sign Up</button>
      </form>
      <br />
      <p>Already have an account? <a href="/login"><Link to='/login'>Login</Link></a></p>
    </div>
  )
}

export default Register