import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getUserDogs } from "../ApiManager";
import UploadImages from "../UploadImage";

export const AddBlogPost = () => {
    //use the useState hook function to set the initial value of the new object
    const [dogs, modifyDogs] = useState([])
    // const [user, setUser] = useState({})    
    const history = useHistory()
    // const timeStamp = Date.now()

    // //this function fetches the current user from local storage and invokes the setUser function to update the user object
    // const currentUser = () => {
    //     return fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("furry_user"))}`)
    //         .then(res => res.json())
    //         .then(user => setUser(user))
    // }

    // useEffect(
    //     () => {
    //         currentUser()
    //     },
    //     []
    // )

    //add useEffect
    //this is watching for updates to the dogs array and fetches them from the API
    useEffect(
        () => {
            getUserDogs()
                .then((dogsArray) => {
                    modifyDogs(dogsArray.dogs)
                })
        },
        []
    )

    useEffect(
        () => {
            getUserDogs()
                .then((dogsArray) => {
                    modifyDogs(dogsArray.dogs)
                })
        },
        []
    )

    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [blogPost, updateBlogPost] = useState({
        userId: 0,
        title: "",
        entryText: "",
        dogId: 0,
        date: ""
    });

    const addNewBlogPost = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const newPost = {
            userId: parseInt(localStorage.getItem("furry_user")),
            title: blogPost.title,
            entryText: blogPost.entryText,
            dogId: blogPost.dogId,
            date: new Date().toLocaleDateString('en-US')
        }

        //POST the newDog object from above to the API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //you cannot send JavaScript objects across HTTP so you have to send it in strings/stringify
            body: JSON.stringify(newPost)
        }

        //fetch the new list of dogs from the API and take the user to their profile page
        return fetch("http://localhost:8088/blogPosts?_expand=user&_expand=dog", fetchOption)
            .then(() => history.push(`/blog-posts`))
    }
    //this will be the form you display, you need to capture user input and save to new object
    return (
        <form className="blogPostForm">
            <h2 className="blogPostForm__title">New Dog Blog Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Title of your post"
                        //this onChange function is an event listener that uses the setter function from above 
                        onChange={
                            (evt) => {
                                const copy = {...blogPost}
                                copy.title = evt.target.value
                                updateBlogPost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dog">Dog: </label>
                    <select name="dog" className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...blogPost}
                                copy.dogId = parseInt(evt.target.value)
                                updateBlogPost(copy)
                            }
                        }
                    >
                        <option value="0">Select the Dog Your Post is About</option>
                            {dogs.map((dog) => {
                                return <option value={dog.id}>{dog.name}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="01/01/2022"
                        onChange={
                            (evt) => {
                                const copy = {...blogPost}
                                copy.date = evt.target.value
                                updateBlogPost(copy)
                            }
                        } />
                </div>
            </fieldset> */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="entryText">Post: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter blog post here"
                        onChange={
                            (evt) => {
                                const copy = {...blogPost}
                                copy.entryText = evt.target.value
                                updateBlogPost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <div>
                <p>Add an image: </p>
                <UploadImages />
            </div>
            <div>
                <button className="btn btn-addBlogPost" onClick={addNewBlogPost} >
                    Submit
                </button>
            </div>
        </form>
    )
}
