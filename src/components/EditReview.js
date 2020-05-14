import React, {useState, useContext} from 'react'
import {RundownContext} from '../App'
import {Redirect} from 'react-router-dom'
import {deleteReview} from '../services/api-helper'

function EditReview(props) {
    const rundownContext = useContext(RundownContext)
    rundownContext.setReviewId(Number(props.match.params.id))
    const [isDeleted, setIsDeleted] = useState(false)

    console.log('EditReview props', props)

    const business = rundownContext.businesses.filter(business => {
        return business.name === props.match.params.name
    })

    const review = rundownContext.reviews.filter(review => {
        return review.id == props.match.params.id
    })

    const delReview = async (id) => {
        await deleteReview(Number(props.match.params.id), rundownContext.userInfo.token).then(res => {
            if(res.status == 204) {
                alert('Review successfully deleted!')
                setIsDeleted(true)
            } else {
                alert('You do not have permission to delete this review.')
            }
        }).then(setIsDeleted(false))
    }

    console.log('EditReview business', business)
    console.log('EditReview review', review)

    if(business[0] && review[0]) {
        return(
            <div className="container">
                <h1>{business[0].name}</h1>
                <h4>Edit your review!</h4>
                <form className="review-form" onSubmit={rundownContext.handleEditReview}>
                    <h6 className="review-rating">Rating</h6>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-btn" type="radio" name="rating" id="inlineRadio1" value="1" onClick={rundownContext.handleReviewChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-btn" type="radio" name="rating" id="inlineRadio2" value="2" onClick={rundownContext.handleReviewChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-btn" type="radio" name="rating" id="inlineRadio3" value="3" onClick={rundownContext.handleReviewChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-btn" type="radio" name="rating" id="inlineRadio2" value="4" onClick={rundownContext.handleReviewChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio4">4</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-btn" type="radio" name="rating" id="inlineRadio3" value="5" onClick={rundownContext.handleReviewChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio5">5</label>
                    </div>
                    <div className="form-group review-text">
                        <label htmlFor="exampleFormControlTextarea1">Review</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="review" placeholder={review[0].review} value={rundownContext.reviewInfo.review} onChange={rundownContext.handleReviewChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-info" name="business" value={business[0].id} onClick={rundownContext.handleReviewChange}>Post Review</button>
                    <button type="button" className="btn btn-danger edit-review-del" onClick={delReview}>Delete</button>
                </form>
                {(rundownContext.reviewCreated || isDeleted) && <Redirect to={`/business/${business[0].name}`} />}
            </div>
        )
    } else {
        return(
            <></>
        )
    }
}

export default EditReview