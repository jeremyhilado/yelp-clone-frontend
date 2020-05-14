import React, {useContext, useState} from 'react'
import {register} from '../services/api-helper'
import {RundownContext} from '../App'
import {Redirect} from 'react-router-dom'

function Register(props) {
    const rundownContext = useContext(RundownContext)
    const [userInfo, setUserInfo] = useState({
        email: '',
        username: '',
        password: '',
        first_name: '',
        last_name: ''
    })
    const [loggedIn, setLoggedIn] = useState(false)

    const handleChange = e => {
        const value = e.target.value
        setUserInfo({...userInfo, [e.target.name]: value})
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        await register(userInfo).then(res => {
            if(res.status === 201) {
                rundownContext.setUserInfo(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                setLoggedIn(true)
            } else {
                console.log('registration error')
                alert('There was a problem creating your account.')
            }
        })
    }
    return(
        <div className="container signup-form">
            <h1>Sign Up</h1>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='email'
                        value={userInfo.email}
                        onChange={handleChange} required
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='username'
                        value={userInfo.username}
                        onChange={handleChange} required
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Password (must be at least 8 characters)</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='password'
                        value={userInfo.password}
                        onChange={handleChange} required
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">First Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='first_name'
                        value={userInfo.first_name}
                        onChange={handleChange} required
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Last Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        name='last_name'
                        value={userInfo.last_name}
                        onChange={handleChange} required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {loggedIn && <Redirect to='/dashboard' />}
        </div>
    )
}

export default Register