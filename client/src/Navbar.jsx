import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from './App'
import axios from 'axios'

function Navbar() {

    const user = useContext(userContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
        .then((response) => {
            console.log(response.data)
            navigate(0)
        })
        .catch((error) => {
            console.log(error)
        })
    }

  return (
    <div className='navbar-header'>
        <div><h3>Blog App</h3></div>
        <div>
            <Link to='/' className='link'>Home</Link>
            {
              user.username ? 
              <Link to='/create' className='link'>Create</Link> 
              : 
              <></>
            }
            <Link to='/create' className='link'>Create</Link>
            <a className='link' href='/contact'>Contact</a>
        </div>
        {
          user.username ? 
          <div><h5><a className='link' onClick={handleLogout}>Logout</a></h5></div> 
          : 
          <div><h5><Link to='/register' className='link'>Register/Login</Link></h5></div>
        }

    </div>
  )
}

export default Navbar