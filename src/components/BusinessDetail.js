import React, {useState, useContext} from 'react'
import {RundownContext} from '../App'
import {Link, Redirect} from 'react-router-dom'
import {deleteBusiness} from '../services/api-helper'

function BusinessDetail(props) {
    const rundownContext = useContext(RundownContext)
    rundownContext.setBusinessId(Number(props.match.params.id))
    const [isDeleted, setIsDeleted] = useState(false)

    console.log('BusinessDetail props', props)
    
    const business = rundownContext.businesses.filter(business => {
        return business.name === props.match.params.name
    })

    console.log('BusinessDetail business', business)

    const delBusiness = async (id) => {
        await deleteBusiness(business[0].id, rundownContext.userInfo.token).then(res => {
                alert('Business successfully deleted!')
                setIsDeleted(true)
        }).then(setIsDeleted(false))
    }


    if(business[0]) {
        const reviews = business[0].reviews.map((review, i) => {
            return(
                <div className="card review-card" style={{width: 650}} key={i}>
                    <div className="card-body">
                        <h5 className="card-title">{review.rating}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{review.owner}</h6>
                        <p className="card-text">{review.review}</p>
                        <Link to={`/business/${business[0].name}/editreview/${review.id}`} style={{marginRight: 15}}>Edit/Delete</Link>
                    </div>
                </div>
            )
        })

        return(
            <div className="container">
                <div className="detail-header">
                    <h1>{business[0].name}</h1>
                    <div>
                    <Link to={`/business/${business[0].name}/writereview`}><button type="button" className="btn btn-info detail-write-btn">Write Review</button></Link>
                    <Link to={`/business/${business[0].name}/editbusiness/${business[0].id}`}><button type="button" className="btn btn-info detail-write-btn">Edit Business</button></Link>
                    <button type="button" className="btn btn-danger edit-review-del" onClick={delBusiness}>Delete Business</button>
                    </div>
                </div>
                <div className="detail-info">
                    <img className="detail-img" src={business[0].image_url ? business[0].image_url : 'https://res.cloudinary.com/do6tcpizk/image/upload/c_scale,h_700,w_700/v1585845946/Project%202%20React%20App/product_image_not_available_otx8jx.png'}/>
                    <div className="detail-details">
                        <h3>Category: {business[0].category}</h3>
                        <h3>Location: {business[0].location_city}, {business[0].location_state}</h3>
                        <h3>Phone: ({business[0].phone.substring(0, 3)}) {business[0].phone.substring(3, 6)} - {business[0].phone.substring(6, 10)}</h3>
                        <h3>Price Range: {business[0].price}</h3>
                    </div>
                </div>
                <div className="detail-reviews">
                    <h3>Reviews</h3>
                    {reviews}
                </div>
                {isDeleted && <Redirect to='/dashboard' />}
            </div>
        )
    } else {
        return <></>
    }

}

export default BusinessDetail