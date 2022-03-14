import React, { useEffect, useState } from "react";
import { getAllEvents } from "../ApiManager";
import { Link } from "react-router-dom"

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
            //need to display an abbreviated bio (name, age, adoptable) 
            //need to display their picture 
            //use dynamic routing to create a link on each event's name to access their individual profile*/}
            <h2>Upcoming Events</h2>
            {
                events.map(
                    (event) => {
                        return <section key={`event--${event.id}`}> 
                        {/* <Link to={`/event-profile/${event.id}`}>{event.title} </Link>  */}
                        <h3>{event.title} </h3>
                        <div>Date: {event.date}</div>
                        <div>Time: {event.time}</div>
                        <div>Location: {event.location}</div>
                        <div>About: {event.description}</div>
                        <div>Hosted by: {event.rescue?.name}</div>
                        <br></br></section>
                    }
                )
            }
        </>
    )
}