import React, { useEffect, useState } from "react";
import { getAllEvents } from "../ApiManager";
import ".//Events.css"

//this module is responsible for displaying all of the events

export const EventList = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [events, modifyEvents] = useState([])

    //get all the event info from the Api and update when it changes
    useEffect(
        () => {
            getAllEvents()
                .then((eventArray) => {
                    modifyEvents(eventArray)
                })
        },
        []
    )
    
    return (
        <>
            {/* //iterate events using map array method and convert them from objects to html using jsx
            //need to display title, date, time, location, about, host*/}
            <h2>Upcoming Events</h2>
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
                        </section>
                    }
                )
            }
        </>
    )
}