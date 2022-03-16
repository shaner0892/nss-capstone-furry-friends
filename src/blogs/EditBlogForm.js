import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router";
import { getCurrentBlogPost, getUserDogs } from "../ApiManager";
import UploadImages from "../UploadImage";

export const EditBlogPost = () => {
    //use the useState hook function to set the initial value of the new object
    const [dogs, modifyDogs] = useState([])
    const [blogPost, updateBlogPost] = useState([])
    const history = useHistory()
    const {blogPostId} = useParams()

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

    //useEffect to get the current blog post selected to edit
    useEffect(
        () => {
            getCurrentBlogPost(parseInt(blogPostId))
                .then((blogPost) => {
                    updateBlogPost(blogPost)
                })
        },
        []
    )

    const editBlogPost = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const editedPost = {
            userId: parseInt(localStorage.getItem("furry_user")),
            title: blogPost.title,
            entryText: blogPost.entryText,
            dogId: blogPost.dogId,
            date: new Date().toLocaleDateString('en-US'),
            imageURL: ""
        }

        //PUT the editedPost object from above to the API
        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            //you cannot send JavaScript objects across HTTP so you have to send it in strings/stringify
            body: JSON.stringify(editedPost)
        }

        //fetch the new list of dogs from the API and take the user to their profile page
        return fetch(`http://localhost:8088/blogPosts/${blogPostId}`, fetchOption)
            .then(() => history.push("/blog-posts"))
    }
    //this will be the form you display, you need to capture user input and save to new object
    return (
        <form className="blogPostForm">
            <h2 className="blogPostForm__title">Edit Dog Blog Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input value={blogPost.title}
                        required autoFocus
                        type="text"
                        className="form-control"
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
                    <select name="dog" className="form-control" value={blogPost.dogId}
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
                    <input value={blogPost.entryText}
                        required autoFocus
                        type="text"
                        className="form-control"
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
                <UploadImages />
            </div>
            <div>
                <button className="btn btn-editBlogPost" onClick={editBlogPost} >
                    Save
                </button>
            </div>
        </form>
    )
}
