import { useState, useContext } from 'react';
import axios from 'axios';
import { userContext } from './App';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const user = useContext(userContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)
        formData.append('email', user.email)

        axios.post('http://localhost:3001/create', formData)
        .then((response) => {
            console.log(response.data)
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    return ( 
        <div className="createpost">
            <form>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" 
                onChange={(event) => setTitle(event.target.value)}/>
                <label htmlFor="body">Body</label>
                <textarea name="body" id="body" cols="30" rows="10" 
                onChange={(event) => setDescription(event.target.value)}></textarea>
                <input type="file" className="image" id="image"
                onChange={(event) => setImage(event.target.files[0])}/>
                <button onClick={handleSubmit} type="submit" >Submit</button>
            </form>
        </div>
     );
}

export default CreatePost;