import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllRescues, getCurrentEvent, putEvent } from "../ApiManager";
import { Button } from "reactstrap";

export const EditEvent = () => {
    //use the useState hook function to set the initial value of the new object
    const [rescues, modifyRescues] = useState([])
    const [event, updateEvent] = useState({})
    const history = useHistory()
    const {eventId} = useParams()

    //add useEffect
    //this is watching for updates to the rescues array and fetches them from the API
    useEffect(
        () => {
            getAllRescues()
                .then((rescuesArray) => {
                    modifyRescues(rescuesArray)
                })
        },
        []
    )

    //useEffect to get the current event selected to edit
    useEffect(
        () => {
            getCurrentEvent(parseInt(eventId))
                .then((event) => {
                    updateEvent(event)
                })
        },
        []
    )

    const editEvent = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const editedEvent = {
            title: event.title,
            rescueId: event.rescueId,
            date: event.date,
            time: event.time,
            location: event.location,
            description: event.description,
        }
        //invoke the POST operation and send in the new event object
        putEvent(eventId, editedEvent)
            .then(() => history.push(`/events`))
    }
    //this will be the form you display, you need to capture user input and save to new object
    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input value={event.title}
                        required autoFocus
                        type="text"
                        className="form-control"
                        //this onChange function is an event listener that uses the setter function from above 
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.title = evt.target.value
                                updateEvent(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event">Hosted By: </label>
                    <select name="event" className="form-control" value={event.rescueId}
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.rescueId = parseInt(evt.target.value)
                                updateEvent(copy)
                            }
                        }
                    >
                        <option value="0">Select the Host Rescue</option>
                            {rescues.map((rescue) => {
                                return <option value={rescue.id}>{rescue.name}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="entryText">Date: </label>
                    <input value={event.date}
                        required autoFocus
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.date = evt.target.value
                                updateEvent(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="entryText">Time: </label>
                    <input value={event.time}
                        required autoFocus
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.time = evt.target.value
                                updateEvent(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="entryText">Location: </label>
                    <input value={event.location}
                        required autoFocus
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.location = evt.target.value
                                updateEvent(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="entryText">Description: </label>
                    <textarea id="form-bio" cols="40" rows="5" value={event.description}
                        required autoFocus
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.description = evt.target.value
                                updateEvent(copy)
                            }
                        } ></textarea>
                </div>
            </fieldset>
            <div>
                <Button id="btn" color ="success" outline className="btn btn-editEvent" onClick={editEvent} >
                    Submit
                </Button>
            </div>
        </form>
    )
}
