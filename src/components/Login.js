import React, {useContext, useState} from 'react'
import {RundownContext} from '../App'
import {Redirect} from 'react-router-dom'

function Login(props) {
    const rundownContext = useContext(RundownContext)

    return(
        <div className="container login-form">
            <h1>Log In</h1>
            <form onSubmit={rundownContext.handleLogin}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='username'
                        value={rundownContext.user.username}
                        onChange={rundownContext.handleLoginChange} required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        name='password'
                        value={rundownContext.user.password}
                        onChange={rundownContext.handleLoginChange} required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {rundownContext.loggedIn && <Redirect to='/dashboard' />}
        </div>
    )
}

export default Login