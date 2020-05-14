import React, { useContext } from 'react'
import {RundownContext} from '../App'
import {Redirect} from 'react-router-dom'

function CreateBusiness(props) {
    const rundownContext = useContext(RundownContext)

    return(
        <div className="container add-business">
            <h1>Add Business</h1>
            <form onSubmit={rundownContext.handleCreateBusiness}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='name'
                        value={rundownContext.businessInfo.name}
                        onChange={rundownContext.handleBusinessChange}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Image URL</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='image_url'
                        value={rundownContext.businessInfo.image_url}
                        onChange={rundownContext.handleBusinessChange}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">City</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='location_city'
                        value={rundownContext.businessInfo.location_city}
                        onChange={rundownContext.handleBusinessChange}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">State (abbreviation)</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='location_state'
                        value={rundownContext.businessInfo.location_state}
                        onChange={rundownContext.handleBusinessChange}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Category</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        name='category'
                        value={rundownContext.businessInfo.category}
                        onChange={rundownContext.handleBusinessChange}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Price ($ - $$$$)</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name='price'
                        value={rundownContext.businessInfo.price}
                        onChange={rundownContext.handleBusinessChange}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Phone (##########)</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        name='phone'
                        value={rundownContext.businessInfo.phone}
                        onChange={rundownContext.handleBusinessChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {rundownContext.businessCreated && <Redirect to='/dashboard' />}
        </div>
    )
}

export default CreateBusiness