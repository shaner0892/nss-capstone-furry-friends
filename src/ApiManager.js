//this module is responsible for fetching data from the API

export const getAllUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(res => res.json())
}

export const getCurrentUser = () => {
    return fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("furry_user"))}`)
        .then(res => res.json())
}

export const getAllDogs = () => {
    return fetch("http://localhost:8088/dogs?_expand=user&_expand=rescue&_expand=size&_expand=age")
        .then(res => res.json())
}

export const getAllRescues = () => {
    return fetch("http://localhost:8088/rescues")
        .then(res => res.json())
}

export const getAllSizes = () => {
    return fetch("http://localhost:8088/sizes")
        .then(res => res.json())
}

export const getAllAgeRanges = () => {
    return fetch("http://localhost:8088/ages")
        .then(res => res.json())
}

export const getAllEvents = () => {
    return fetch("http://localhost:8088/events?_expand=rescue")
        .then(res => res.json())
}

export const getAllBlogPosts = () => {
    return fetch("http://localhost:8088/blogPosts?_expand=user&_expand=dog")
        .then(res => res.json())
}

export const getUserDogs = () => {
    return fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("furry_user"))}?_embed=dogs`)
        .then(res => res.json())
}

export const deleteDog = (id) => {
    return fetch(`http://localhost:8088/dogs/${id}`, {
        method: "DELETE"
    })
}

export const getCurrentDog = (id) => {
    return fetch(`http://localhost:8088/dogs/${id}?_expand=user&_expand=rescue&_expand=size&_expand=age`)
        .then(res => res.json())
}

export const getCurrentBlogPost = (id) => {
    return fetch(`http://localhost:8088/blogPosts/${id}`)
        .then(res => res.json())
}

export const deleteBlogPost = (id) => {
    return fetch(`http://localhost:8088/blogPosts/${id}`, {
        method: "DELETE"
    })
}

export const getUserEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
        .then(res => res.json())
}

export const putEditUser = (user) => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

export const postBlog = (newPost) => {
    return fetch("http://localhost:8088/blogPosts?_expand=user&_expand=dog", {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
    })
}

export const putEditBlog = (blogPostId, editedPost) => {
    return fetch(`http://localhost:8088/blogPosts/${blogPostId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedPost)
    })
}

export const postDog = (newDog) => {
    return fetch("http://localhost:8088/dogs?_expand=user&_expand=rescue&_expand=size", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDog)
    })
}

export const putEditDog = (dog, editedDog) => {
    return fetch(`http://localhost:8088/dogs/${dog.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedDog)
    })
}

export const postRegistration = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const getUserEmailReg = (user) => {
    return fetch(`http://localhost:8088/users?email=${user.email}`)
        .then(res => res.json())
}