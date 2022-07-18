import React from 'react'
import { withRouter } from 'react-router-dom'


const Header = ({ history }: any) => {

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem("email")
        localStorage.removeItem("fullname")
        localStorage.removeItem("photo")

        history.push('/')
    }

    let photo: any = ''
    if (localStorage.getItem('photo')) {
        photo = localStorage.getItem('photo')
    }

    return (
        <div className='header-container'>
            <nav className='nav-container'>
                <h3 className='nav-logo' onClick={() => { history.push('/main') }}>Home</h3>
                <div className='nav-item'>
                    <p className='me' onClick={() => { history.push('/me') }}>My Posts</p>
                    <button onClick={() => history.push('/add')}>Create Post</button>
                    <button className='logout' onClick={logout}>LogOut</button>
                    <div className='avatar-container'>
                        <img className='avatar' src={photo} alt="avatar" />
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default withRouter(Header)