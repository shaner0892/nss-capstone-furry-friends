import React, { useEffect, useState } from "react";
import { getAllDogs, getAllEvents, getAllBlogPosts } from "../ApiManager";
import { useHistory } from "react-router";
import { Button } from "reactstrap"
import { DogCarousel } from "./Carousel";
import "./LandingPage.css"

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
        return adoptableDogs.slice(0, 3).map(
            (dog) => {
                return <section key={`dog--${dog.id}`} className="homeDogPicTitle">
                    <img className="homeDogPic" id="zoom" src={dog.imageURL} onClick={() => history.push(`/dog-profile/${dog.id}`)} />
                    <div className="subtitle">{dog.name} </div>
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

    //display only TWO upcoming events with button "see more"
    const topEvents = () => {
        return events.slice(0, 1).map(
            (event) => {
                return <section className="homeEvent" key={`event--${event.id}`}>
                    <div className="eventTitle">{event.title}</div>
                    <div><b>Hosted by:</b> {event.rescue?.name}</div>
                    <div><b>Date:</b> {event.date}</div>
                    <div><b>Time:</b> {event.time}</div>
                    <div><b>Location:</b> {event.location}</div>
                    <div><b>About:</b> {event.description}</div>
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
                return <section className="homeBlogPicTitle" key={`blogPost--${post.id}`}>
                    <img className="blogPic" src={post.imageURL} />
                    <div className="subtitle">{post.title} </div>
                </section>
            }
        )
    }

    return (
        //add carousel
        //add preview of pages, fostering links
        <>
            <DogCarousel />
            <section className="homePage">
                <div className="row1">
                    <div className="dogSection" >
                        <h3 className="homeTopic">Adoptable Dogs</h3>
                            <div className="dogPics">
                                {
                                    topDogs()
                                },
                            </div>
                        <Button id="rightBtn" color="success" outline onClick={() => history.push(`/all-dogs`)}> See all dogs </Button>
                    </div>
                    <div className="eventSection">
                        <h3 className="homeTopic">Upcoming Events</h3>
                            <div className="events">
                                {
                                    topEvents()
                                },
                            </div>
                        <Button id="rightBtn" color="success" outline onClick={() => history.push(`/events`)}> See all events </Button>
                    </div>
                </div>
                <div className="row2">
                    <div className="postSection">
                        <h3 className="homeTopic">Recent Posts</h3>
                            <div className="blogPics">
                                {
                                    topPosts()
                                }
                            </div>
                        <Button id="rightBtn" color="success" outline onClick={() => history.push(`/blog-posts`)}> See all dog blogs </Button>
                    </div>
                    <div className="fosteringSection">
                        <h3 className="homeTopic">Join a Foster Roster</h3>
                        <ul>
                            <p>Interested in fostering? Click on a rescue organization to learn more!</p>
                            <li><a href="https://nashvillehumane.org/foster">Nashville Humane Association</a></li>
                            <li><a href="https://www.wagsandwalks.org/foster-nashville">Wags and Walks - Nashville</a></li>
                            <li><a href="https://www.nashvillepittie.org/foster">Nashville PITTIE</a></li>
                            <li><a href="https://app.betterimpact.com/PublicOrganization/065a796d-a375-413b-bbd8-eb01a1b2d52d/Gvi/5d8910d3-86a7-4da9-bb6a-d23f70e3ac41/2">Metro Animal Care & Control</a></li>
                        </ul>
                    </div>
                </div>
            
            </section>
        </>

    )

}