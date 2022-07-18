import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dateFormat from "dateformat";

const UserPosts = () => {

    const [loading, setLoading] = useState(false)
    const [myPosts, setMyPosts] = useState([])
    const [error, setError] = useState('')

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const fetchMyPosts = () => {
        const token: any = localStorage.getItem('token')
        setError('')
        setLoading(true)

        axios
            .get(`https://blooming-badlands-35254.herokuapp.com/api/v1/posts/me`, {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response: any) => {
                const posts = response.data.data.posts;
                setMyPosts(posts)
                setLoading(false)
                console.log(posts)
            })

            .catch((error) => {
                setError(error.response?.data?.message)
                setLoading(false)
                console.log(error.response?.data?.message)
            })

    }

    useEffect(() => {
        fetchMyPosts()
    }, [])

    return (
        <div className='post-main'>
            <h4>{loading ? 'Loading...' : 'My Posts'}</h4>
            {error && (<h4>{error}</h4>)}
            <div className='post-container'>
                {
                    myPosts.map((post: any, index) => (
                        <div className='post-item' key={index}>
                            <div className='post-photo-container'>
                                <img className='post-photo' src={post.url} alt="post" />
                            </div>
                            <div className='post-description'>{post.description}</div>
                            <span className='post-date'>{dateFormat(
                                post.date.toLocaleString("en-US", {
                                    timeZone: timezone,
                                }),
                                "mm/dd/yyyy"
                            )}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UserPosts