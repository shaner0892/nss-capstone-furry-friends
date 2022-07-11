import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";
import { deleteEvent, getAllEvents } from "../ApiManager";
import ".//Events.css"


export const EventList = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [events, modifyEvents] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getAllEvents()
                .then(modifyEvents)
        },
        []
    )

    //invoke the DELETE method from ApiManager and then fetch the new list of events
    const removeEvent = (id) => {
        deleteEvent(id)
            .then(()=> {
                getAllEvents()
                    .then(modifyEvents)
            })
    }
    
    return (
        <>
            {/* //iterate events using map array method and convert them from objects to html using jsx
            //need to display title, date, time, location, about, host*/}
            <h2>Upcoming Events</h2>
            {
                parseInt(localStorage.getItem("furry_user")) === 1 ? <Button id="btn" color="success" outline onClick={() => history.push(`/add-event`)}> Add Event </Button> : ""
            }
            <br></br>
            {
                events.map(
                    (event) => {
                        return <section className="eventList" key={`event--${event.id}`}> 
                            <h4>{event.title} </h4>
                            <div><b>Hosted by:</b> {event.rescue?.name}</div>
                            <div><b>Date:</b> {event.date}</div>
                            <div><b>Time:</b> {event.time}</div>
                            <div><b>Location:</b> {event.location}</div>
                            <div><b>About:</b> {event.description}</div>
                            {
                                parseInt(localStorage.getItem("furry_user")) === 1 ? <Button id="btn" color="success" outline onClick={() => history.push(`/edit-event/${event.id}`)}> Edit Event </Button> : ""
                            }
                            {
                                parseInt(localStorage.getItem("furry_user")) === 1 ? <Button id="btn" color="success" outline onClick={() => {removeEvent(event.id)}}> Delete Event </Button> : ""
                            }
                        </section>
                    }
                )
            }
        </>
    )
}