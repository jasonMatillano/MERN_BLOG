import { useState } from 'react';
import axios from 'axios';

function CreatePost() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const  [file, setFile] = useState('')
    

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('file', file)

        axios.post('http://localhost:3001/create', formData)
        .then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    return ( 
        <div className="createpost">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" 
                onChange={(event) => setTitle(event.target.value)}/>
                <label htmlFor="body">Body</label>
                <textarea name="body" id="body" cols="30" rows="10" 
                onChange={(event) => setDescription(event.target.value)}></textarea>
                <input type="file" name="image" id="image"
                onChange={(event) => setFile(event.target.value)}/>
                <button type="submit" >Submit</button>
            </form>
        </div>
     );
}

export default CreatePost;