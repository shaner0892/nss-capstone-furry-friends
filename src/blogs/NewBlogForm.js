import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getUserDogs, postBlog } from "../ApiManager";
import UploadImages from "../UploadImage";
import { Button } from "reactstrap";

export const AddBlogPost = () => {
    //use the useState hook function to set the initial value of the new object
    const [dogs, modifyDogs] = useState([])
    const history = useHistory()

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

    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [blogPost, updateBlogPost] = useState({
        userId: 0,
        title: "",
        entryText: "",
        dogId: 0,
        date: "",
        imageURL: "https://res.cloudinary.com/dfxsl6a2c/image/upload/v1648139596/default_dxztcl.jpg"
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
            date: new Date().toLocaleDateString('en-US'),
            imageURL: blogPost.imageURL
        }

        postBlog(newPost)
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="entryText">Post: </label>
                    <textarea id="form-bio" cols="40" rows="5"
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
                        } ></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <UploadImages obj={blogPost} update={updateBlogPost} />
                </div>
            </fieldset>
            <div>
                <Button id="btn" color ="success" outline className="btn btn-addBlogPost" onClick={addNewBlogPost} >
                    Submit
                </Button>
            </div>
        </form>
    )
}
