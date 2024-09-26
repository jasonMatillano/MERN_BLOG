import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Post() {
    const { id } = useParams();

    const [post, setPost] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3001/getpostby/${id}`)
        .then((response) => {
            console.log(response.data)
            setPost(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    return (
    <div className='post'>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <img src={`http://localhost:3001/images/${post.image}`} alt={post.title} />
    </div>
  )
}

export default Post