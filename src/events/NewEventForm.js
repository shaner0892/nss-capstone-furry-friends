import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllRescues, postEvent } from "../ApiManager";
import { Button } from "reactstrap";

export const AddEvent = () => {
    //use the useState hook function to set the initial value of the new object
    const [rescues, modifyRescues] = useState([])
    const history = useHistory()

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

    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [event, updateEvent] = useState({
        title: "",
        rescueId: 0,
        date: "",
        time: "",
        location: "",
        description: "",
    });

    const addNewEvent = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const newEvent = {
            title: event.title,
            rescueId: event.rescueId,
            date: event.date,
            time: event.time,
            location: event.location,
            description: event.description,
        }
        //invoke the POST operation and send in the new event object
        postEvent(newEvent)
            .then(() => history.push(`/events`))
    }
    //this will be the form you display, you need to capture user input and save to new object
    return (
        <form className="eventForm">
            <h2 className="eventForm__title">New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Title of the event"
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
                    <select name="event" className="form-control"
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
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter the event date here"
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
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter the event time here"
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
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter the event location here"
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
                    <textarea id="form-bio" cols="40" rows="5"
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter the event description here"
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
                <Button id="btn" color ="success" outline className="btn btn-addEvent" onClick={addNewEvent} >
                    Submit
                </Button>
            </div>
        </form>
    )
}
