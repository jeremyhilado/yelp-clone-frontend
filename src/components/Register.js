import React, {useContext, useState} from 'react'
import {RundownContext} from '../App'
import {Redirect} from 'react-router-dom'

function Register(props) {
    const rundownContext = useContext(RundownContext)
   
    return(
        <div className="container signup-form">
            <h1>Sign Up</h1>
            <form onSubmit={rundownContext.handleRegister}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='email'
                        value={rundownContext.userSignup.email}
                        onChange={rundownContext.handleRegisterChange} required
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
                        value={rundownContext.userSignup.username}
                        onChange={rundownContext.handleRegisterChange} required
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
                        value={rundownContext.userSignup.password}
                        onChange={rundownContext.handleRegisterChange} required
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
                        value={rundownContext.userSignup.first_name}
                        onChange={rundownContext.handleRegisterChange} required
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Last Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        name='last_name'
                        value={rundownContext.userSignup.last_name}
                        onChange={rundownContext.handleRegisterChange} required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {rundownContext.loggedIn && <Redirect to='/dashboard' />}
        </div>
    )
}

export default Register