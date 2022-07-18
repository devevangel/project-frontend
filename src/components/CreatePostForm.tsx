import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import dateFormat from 'dateformat'

const CreatePostForm = ({ history }: any) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [photo, setPhoto] = useState(null)
    const [description, setDescription] = useState('')

    const formData: any = new FormData();

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault()
        setError("")
        setLoading(true)
        const token = localStorage.getItem('token')

        const now = Date.now();
        formData.append("document", photo);
        formData.append('description', description)
        formData.append("date", dateFormat(now));
        formData.append("user", localStorage.getItem('id'));

        axios
            .post(`https://blooming-badlands-35254.herokuapp.com/api/v1/posts`, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },

            })
            .then((response) => {
                setLoading(false)
                console.log(response)
                history.push('/main')
            })
            .catch((error) => {
                setLoading(false)
                setError(error)
                console.log(error)
            });

        setDescription('')
        setPhoto(null)
    }

    const handlePhotoChange = (event: any) => {
        setPhoto(event.target.files[0])
    }

    return (
        <div className='add-page'>
            <div className='signup-container'>
                <h4 className='form-title'>{loading ? 'Loading...' : 'New Post'}</h4>
                {error && (<h4 className='form-title'>{error}</h4>)}
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input
                                type="file"
                                className="form-input"
                                name="name"
                                placeholder="Choose file..."
                                onChange={handlePhotoChange}

                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type="text"
                                className="form-input"
                                name="description"
                                value={description}
                                placeholder="Enter post description"
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="signup-form-submit">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div>
    )
}

export default withRouter(CreatePostForm)