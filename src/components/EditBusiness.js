import React, {useState, useContext} from 'react'
import {RundownContext} from '../App'
import {Redirect} from 'react-router-dom'
import {deleteBusiness} from '../services/api-helper'

function EditBusiness(props) {
    const rundownContext = useContext(RundownContext)
    rundownContext.setBusinessId(Number(props.match.params.id))
    const [isDeleted, setIsDeleted] = useState(false)

    console.log('EditBusiness props', props)

    const business = rundownContext.businesses.filter(business => {
        return business.name === props.match.params.name
    })

    const delBusiness = async (id) => {
        await deleteBusiness(Number(props.match.params.id), rundownContext.userInfo.token).then(res => {
            if(res.status == 204) {
                alert('Business successfully deleted!')
                setIsDeleted(true)
            } else {
                alert('We are unable to delete this business.')
            }
        }).then(setIsDeleted(false))
    }

    console.log('EditBusiness business', business)

    if(business[0]) {
        return(
            <div className="container add-business">
                <h1>Edit Business</h1>
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
    } else {
        return(
            <></>
        ) 
    }
}

export default EditBusiness