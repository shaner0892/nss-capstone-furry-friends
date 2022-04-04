import React from "react";
import { useHistory } from "react-router";

//this module is responsible for displaying all of the dogs

export const AllDogs = ({filterDogs}) => {
    const history = useHistory()

    return (
        <>
            {/* //iterate dogs using map array method and convert them from objects to html using jsx
            //need to display an abbreviated bio (name, age, adoptable) 
            //need to display their picture, when user clicks on a picture they should be rerouted to their individual profile*/}
            <section className="dogList">
            {
                filterDogs.map(
                    (dog) => {
                        return <section className="dog" key={`dog--${dog.id}`}> 
                            <img className="zoom" id="dogListPics" src={dog.imageURL} onClick={() => history.push(`/dog-profile/${dog.id}`)}/>
                            <div><b>{dog.name}</b> </div>
                            <div>{dog.age?.range} </div>
                            <div>{dog.sex}</div>
                            <div>{dog.adoptable? "Available for adoption!" : "Already adopted"}</div>
                        </section>
                    }
                )
            }
            </section>
        </>
    )
}
