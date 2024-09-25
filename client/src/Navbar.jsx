import './style.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from './App'

function Navbar() {

    const user = useContext(userContext)

  return (
    <div className='navbar-header'>
        <div><h3>Blog App</h3></div>
        <div>
            <a className = 'link' href='/'>Home</a>
            <a className = 'link' href='/create'>Create</a>
            <a className = 'link' href='/contact'>Contact</a>
        </div>
        {
          user.username ? 
          <div><h5><Link to='/logout' className='link'>Logout</Link></h5></div> 
          : 
          <div><h5><Link to='/register' className='link'>Register/Login</Link></h5></div>
        }

    </div>
  )
}

export default Navbar