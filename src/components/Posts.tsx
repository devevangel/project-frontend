import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dateFormat from "dateformat";

const Posts = () => {

    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [error, setError] = useState('')

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const fetchPosts = () => {
        const token: any = localStorage.getItem('token')
        setError('')
        setLoading(true)

        axios
            .get(`https://blooming-badlands-35254.herokuapp.com/api/v1/posts`, {
                headers: {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response: any) => {
                const posts = response.data.data.posts;
                setPosts(posts)
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
        fetchPosts()
    }, [])


    return (
        <div className='post-main'>
            <h4>{loading ? 'Loading...' : 'Posts'}</h4>
            {error && (<h4>{error}</h4>)}
            <div className='post-container'>
                {
                    posts.map((post: any, index) => (
                        <div className='post-item' key={index}>
                            <div className='post-photo-container'>
                                <img className='post-photo' src={post.url} alt="post" />
                            </div>
                            <span className='post-description'>{post.description}</span>
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

export default Posts