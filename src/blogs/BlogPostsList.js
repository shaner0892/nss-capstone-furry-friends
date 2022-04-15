import React, { useEffect, useState } from "react";
import { deleteBlogPost, getAllBlogPosts } from "../ApiManager";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";
import "./BlogPosts.css"

//this module is responsible for displaying all of the blog posts

export const BlogPostList = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [blogPosts, modifyBlogPosts] = useState([])
    const history = useHistory()

    //get all the blogPost info from the Api and update when it changes
    useEffect(
        () => {
            getAllBlogPosts()
                .then((blogPostsArray) => {
                    modifyBlogPosts(blogPostsArray)
                })
        },
        []
    )

    //define a function to delete a blog post
    //invoke the DELETE method from ApiManager and then fetch the new list of posts
    const removeBlogPost = (id) => {
        deleteBlogPost(id)
            .then(()=> {
                getAllBlogPosts()
                    .then((blogPostsArray) => {
                        modifyBlogPosts(blogPostsArray)
                    })
            })
    }

    return (
        <>
            {/* iterate events using map array method and convert them from objects to html using jsx
            need to display title, author, date, entry, and picture
            if the logged in user is the author, there needs to be an edit and delete button added*/}
            <h2>Dog Blogs</h2>
            <Button id="rightBtn" color ="success" outline  onClick={() => history.push(`/add-blog-posts`)}> Add New Dog Blog </Button>
            <section class="blogList">
            {
                blogPosts.map(
                    (post) => {
                        return <section class="blog" key={`blogPost--${post.id}`}> 
                            <img src={post.imageURL}/>
                            <h4>{post.title} </h4>
                            <div>Author: {post.user?.firstName}</div>
                            <div>Date: {post.date}</div>
                            <div>{post.entryText}</div>
                            {
                                post.user?.id===parseInt(localStorage.getItem("furry_user")) ? <Button id="btn" color="success" outline id={post.id} onClick={() => history.push(`/edit-blog-posts/${post.id}`)}> Edit Blog Post </Button> : ""
                            }
                            <br></br>
                            {
                                post.user?.id===parseInt(localStorage.getItem("furry_user")) ? <Button id="btn" color="success" outline onClick={() => {removeBlogPost(post.id)}}> Delete Blog Post </Button> : ""
                            }
                        </section>
                    }
                )
            }
            </section>
        </>
    )
}