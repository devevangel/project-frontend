import React, { useState } from 'react'
import Signup from '../components/Signup'
import Signin from '../components/Signin'

const Auth = () => {

    const [authState, setAuthState] = useState('up')

    const form = () => {
        if (authState === "up") {
            return <Signup setAuthState={setAuthState} />
        } else if (authState === "in") {
            return <Signin setAuthState={setAuthState} />
        }
    }

    return (
        <div className='auth-page'>
            {form()}
        </div>
    )
}

export default Auth