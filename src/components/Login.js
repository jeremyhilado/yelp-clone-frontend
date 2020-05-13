import React, {useContext, useState} from 'react'
import {RundownContext} from '../App'
import {login} from '../services/api-helper'
import {Redirect} from 'react-router-dom'

function Login(props) {
    const rundownContext = useContext(RundownContext)
    const [user, setUser] = useState({
        username: '',
        password: '',
    })
    const [loggedIn, setLoggedIn] = useState(false)

    const handleChange = (e) => {
        const value = e.target.value
        setUser({...user, [e.target.name]: value})
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        await login(user).then(res => {
            if(res.status === 200) {
                rundownContext.setUserInfo(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                setLoggedIn(true)
            } else {
                console.log('login error')
                alert('A user with that username or password was not found.')
            }
        })
    }

    return(
        <div class="container login-form">
            <h1>Log In</h1>
            <form onSubmit={handleLogin}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='username'
                        value={user.username}
                        onChange={handleChange} required
                    />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        id="exampleInputPassword1"
                        name='password'
                        value={user.password}
                        onChange={handleChange} required
                    />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            {loggedIn && <Redirect to='/dashboard' />}
        </div>
    )
}

export default Login