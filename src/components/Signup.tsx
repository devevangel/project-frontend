import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const Signup = ({ setAuthState, history }: any) => {

    const [fullname, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/main')
        }
    }, [history])

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault()
        setError("")
        setLoading(true)

        const userData = {
            fullname: fullname,
            email: email,
            password: password
        }

        axios
            .post(`https://blooming-badlands-35254.herokuapp.com/api/v1/users/signup`, userData, {
                headers: {
                    "content-type": "application/json",
                },
            })
            .then((response: any) => {
                const user = response.data.data.user;
                const token = response.data.token

                localStorage.setItem('token', token)
                localStorage.setItem('id', user._id)
                localStorage.setItem("email", user.email);
                localStorage.setItem("fullname", user.fullname)
                localStorage.setItem("photo", user.photo);

                setLoading(false)
                history.push('/main')
            })
            .catch((error) => {
                setError(error.response?.data?.message)
                setLoading(false)
            })

        setEmail('')
        setFullName('')
        setPassword('')
    }

    return (
        <div className='signup-container'>
            <h4 className='form-title'>{loading ? 'Loading...' : 'SignUp'}</h4>
            {error && (<h4 className='form-title'>{error}</h4>)}
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input
                            type="text"
                            className="form-input"
                            name="name"
                            placeholder="Enter fullname"
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}

                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type="email"
                            className="form-input"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type="password"
                            className="form-input"
                            name="password"
                            placeholder="Enter yout password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="signup-form-submit">
                            Sign Up
                        </button>
                    </div>
                </form>
                <p>
                    Already have an account? <span className='auth-direction' onClick={() => setAuthState('in')}>Log in here.</span>
                </p>
            </div>
        </div >
    )
}

export default withRouter(Signup)