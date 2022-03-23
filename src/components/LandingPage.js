import React, { useEffect, useState } from "react";
import { getAllDogs, getAllEvents, getAllBlogPosts } from "../ApiManager";
import { useHistory } from "react-router";
import { Button } from "reactstrap"
import { DogCarousel } from "./Carousel";

export const LandingPage = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [dogs, modifyDogs] = useState([])
    const [events, modifyEvents] = useState([])
    const [blogPosts, modifyBlogPosts] = useState([])
    const history = useHistory()

    //get all the dog info from the Api and update when it changes
    useEffect(
        () => {
            getAllDogs()
                .then((dogArray) => {
                    modifyDogs(dogArray)
                })
        },
        []
    )

    const adoptableDogs = dogs.filter((dog) => {
        return dog.adoptable === true
    })

    //display only THREE dogs available for adoption with button "see more"
    const topDogs = () => {
        return adoptableDogs.slice(0, 4).map(
            (dog) => {
                return <section key={`dog--${dog.id}`} id="homeDog">
                    <img class="homeDogPic" src={dog.imageURL} onClick={() => history.push(`/dog-profile/${dog.id}`)} />
                    <div className="subtitle"><b>{dog.name}</b> </div>
                </section>
            }
        )
    }

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

    //display only ONE upcoming event with button "see more"
    const topEvents = () => {
        return events.slice(0, 1).map(
            (event) => {
                return <section class="homeEvent" key={`event--${event.id}`}>
                    <div id="homeTitle"><b>{event.title} </b></div>
                    <div><b>Date:</b> {event.date}</div>
                    <div><b>Time:</b> {event.time}</div>
                    <div><b>Location:</b> {event.location}</div>
                    <div><b>About:</b> {event.description}</div>
                    <div><b>Hosted by:</b> {event.rescue?.name}</div>
                    <br></br></section>
            }
        )
    }

    //get all the blogPost info from the Api and update when it changes
    useEffect(
        () => {
            getAllBlogPosts()
                .then((blogPostArray) => {
                    modifyBlogPosts(blogPostArray)
                })
        },
        []
    )

    //display only THREE recent dog blog posts with button "see more"
    const topPosts = () => {
        return blogPosts.slice(0, 3).map(
            (post) => {
                return <section class="homePost" key={`blogPost--${post.id}`}>
                    <img src={post.imageURL} />
                    <div className="subtitle"><b>{post.title}</b> </div>
                    {/* <div>Author: {post.user?.firstName}</div>
                    <div>Date: {post.date}</div>
                    <div>{post.entryText}</div> */}
                </section>
            }
        )
    }

    return (
        //add carousel
        //add "welcome" and preview of pages
        <>
            <DogCarousel />
            {/* <h2 class="homeWelcome">Welcome!</h2> */}
            <section className="homePage">
                <div className="dogSection">
                    <h3 className="homeTopic1">Adoptable Dogs</h3>
                    <div className="row1" >
                        {
                            topDogs()
                        },
                    </div>
                    <Button id="rightBtn" color="success" outline onClick={() => history.push(`/all-dogs`)}> See all pups </Button>
                </div>
                <div className="row2">
                    <div className="eventSection">
                        <h3 className="homeTopic2">Next Event</h3>
                        {
                            topEvents()
                        },

                        <Button id="rightBtn" color="success" outline onClick={() => history.push(`/events`)}> See all events </Button>
                    </div>
                    <div className="postSection">
                        <h3 className="homeTopic2">Recent Posts</h3>
                        <div className="eventRow">

                        {
                            topPosts()
                        }
                    </div>
                        </div>
                </div>
                    <Button id="rightBtn" color="success" outline onClick={() => history.push(`/blog-posts`)}> See all dog blogs </Button>
            </section>
        </>

    )

}