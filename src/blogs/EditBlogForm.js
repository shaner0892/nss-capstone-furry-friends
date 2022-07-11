import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router";
import { Button } from "reactstrap";
import { getCurrentBlogPost, getUserDogs, putEditBlog } from "../ApiManager";
import UploadImages from "../UploadImage";

export const EditBlogPost = () => {
    //use the useState hook function to set the initial value of the new object
    const [dogs, modifyDogs] = useState([])
    const [blogPost, updateBlogPost] = useState([])
    const history = useHistory()
    const {blogPostId} = useParams()

    useEffect(
        () => {
            getUserDogs()
                .then(modifyDogs)
            getCurrentBlogPost(parseInt(blogPostId))
                .then(updateBlogPost)
        },
        []
    )

    const editBlogPost = (evt) => {
        evt.preventDefault()
        //object that we want to send to our API
        const editedPost = {
            userId: parseInt(localStorage.getItem("furry_user")),
            title: blogPost.title,
            entryText: blogPost.entryText,
            dogId: blogPost.dogId,
            date: new Date().toLocaleDateString('en-US'),
            imageURL: blogPost.imageURL
        }

        putEditBlog(blogPostId, editedPost)
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
                    <textarea id="form-bio" cols="40" rows="5" value={blogPost.entryText}
                        required autoFocus
                        type="text"
                        className="form-control"
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
                <Button id="btn" color ="success" outline className="btn btn-editBlogPost" onClick={editBlogPost} >
                    Save
                </Button>
            </div>
        </form>
    )
}
