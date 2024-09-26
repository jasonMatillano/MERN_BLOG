import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

function Home() {

  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/getposts')
    .then((response) => {
      // console.log(response.data)
      setPosts(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  return (
    <div>
      <div className="blogs">
        {
          posts.map((post) => {
            return (
              <Link to={`/post/${post._id}`} key={post._id} className="link">
                <div key={post._id}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <img src={`http://localhost:3001/images/${post.image}`} alt={post.title} />
                </div>
              </Link>

            )
          })
        }
      </div>
    </div>
  )
}

export default Home