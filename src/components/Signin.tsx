import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const Signin = ({ setAuthState, history }: any) => {

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
            userEmail: email,
            userPassword: password
        }

        axios
            .post(`https://blooming-badlands-35254.herokuapp.com/api/v1/users/signin`, userData, {
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
        setPassword('')
    }

    return (
        <div className='signin-container'>
            <h4 className='form-title'>{loading ? 'Loading...' : 'SignIn'}</h4>
            {error && (<h4 className='form-title'>{error}</h4>)}
            <div className='form-container'>
                <form onSubmit={handleSubmit}>

                    <div className='form-group'>
                        <input
                            type="email"
                            className="form-input"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="signin-form-submit">
                            Sign In
                        </button>
                    </div>
                </form>
                <p>
                    Don't have an account?{" "}<span onClick={() => setAuthState('up')} className='auth-direction'>Signup here</span>
                </p>
            </div>
        </div >
    )
}

export default withRouter(Signin)