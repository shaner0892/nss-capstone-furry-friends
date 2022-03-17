import React, { useEffect, useState } from "react";
import { getAllDogs } from "../ApiManager";
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button, CardText } from "reactstrap";

//this module is responsible for displaying all of the dogs

export const DogList = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [dogs, modifyDogs] = useState([])
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

    return (
        <>
            {/* //iterate dogs using map array method and convert them from objects to html using jsx
            //need to display an abbreviated bio (name, age, adoptable) 
            //need to display their picture 
            //use dynamic routing to create a link on each dog's name to access their individual profile*/}
            
            <h2>Furry Friends</h2>
            {
                dogs.map(
                    (dog) => {
                        return <section class="dogList" key={`dog--${dog.id}`}> 
                            <img src={dog.imageURL} onClick={() => history.push(`/dog-profile/${dog.id}`)}/>
                            <div>{dog.name} </div>
                            <div>{dog.age?.range} </div>
                            <div>{dog.sex}</div>
                            <div>{dog.adoptable? "Available for adoption!" : "Already adopted"}</div><br></br>
                            {/* <Button color ="success" outline >Learn more</Button> */}
                        </section>
                    }
                )
            }
            
            
            {/* <h2>Furry Friends</h2>
            <CardGroup>
            {
                dogs.map(
                    (dog) => {
                        <Card>
                            <CardImg
                                alt="dog profile picture"
                                src={dog.imageURL}
                                top
                                width="100%"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    {dog.name}
                                </CardTitle>
                                <CardText>
                                    <div>{dog.age?.range} </div>
                                    <div>{dog.sex}</div>
                                    <div>{dog.adoptable? "Available for adoption!" : "Already adopted"}</div>                                </CardText>
                                <Button>
                                    Button
                                </Button>
                            </CardBody>
                        </Card>
                    }
                )
            }
            </CardGroup> */}
        </>
    )
}
