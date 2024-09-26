import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

function EditPost() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    const handleUpdate = (event) => {
        event.preventDefault()

        axios.put('http://localhost:3001/editpost/' + id, {
            title: title,
            description: description
        })
        .then((response) => {
            console.log(response.data)
            navigate('/')
            
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios.get('http://localhost:3001/getpostbyid/' + id)
        .then((response) => {
            console.log(response.data)
            setTitle(response.data.title)
            setDescription(response.data.description)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return ( 
        <div className="createpost">
            <form>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" 
                value={title}
                onChange={(event) => setTitle(event.target.value)}/>
                <label htmlFor="body">Body</label>
                <textarea name="body" id="body" cols="30" rows="10" 
                value={description}
                onChange={(event) => setDescription(event.target.value)}></textarea>
                <button onClick={handleUpdate} type="submit" >Update</button>
            </form>
        </div>
     );
}

export default EditPost;