import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react'
import { userContext } from './App'

function Post() {

    const user = useContext(userContext)
    const { id } = useParams();
    const navigate = useNavigate(); // for navigating after deletion
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/getpostbyid/${id}`)
        .then((response) => {
            console.log(response.data);
            setPost(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [id]);

    // Function to handle the delete request
    const handleDelete = () => {
        axios.delete(`http://localhost:3001/deletepost/${id}`)
        .then(() => {
            // Redirect to homepage after deletion
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
    <div className='post'>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <img src={`http://localhost:3001/images/${post.image}`} alt={post.title} />

        <div className="button-container">
            {
              user.email === post.email ? 
              <div>
                <Link to={`/editpost/${post._id}`} className="update-btn">Edit</Link>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
              </div>
              : 
              <></>
            }


        </div>
    </div>
  );
}

export default Post;
