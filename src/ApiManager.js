//this module is responsible for fetching data from the API

export const getAllUsers = () => {
    return fetch("https://furry-friends-api-33qtl.ondigitalocean.app/users")
        .then(res => res.json())
}

export const getCurrentUser = () => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/users/${parseInt(localStorage.getItem("furry_user"))}`)
        .then(res => res.json())
}

export const getAllDogs = () => {
    return fetch("https://furry-friends-api-33qtl.ondigitalocean.app/dogs?_expand=user&_expand=rescue&_expand=size&_expand=age")
        .then(res => res.json())
}

export const getAllRescues = () => {
    return fetch("https://furry-friends-api-33qtl.ondigitalocean.app/rescues")
        .then(res => res.json())
}

export const getAllSizes = () => {
    return fetch("https://furry-friends-api-33qtl.ondigitalocean.app/sizes")
        .then(res => res.json())
}

export const getAllAgeRanges = () => {
    return fetch("https://furry-friends-api-33qtl.ondigitalocean.app/ages")
        .then(res => res.json())
}

export const getAllEvents = () => {
    return fetch("https://furry-friends-api-33qtl.ondigitalocean.app/events?_expand=rescue")
        .then(res => res.json())
}

export const getAllBlogPosts = () => {
    return fetch("https://furry-friends-api-33qtl.ondigitalocean.app/blogPosts?_expand=user&_expand=dog")
        .then(res => res.json())
}

export const getUserDogs = () => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/users/${parseInt(localStorage.getItem("furry_user"))}?_embed=dogs`)
        .then(res => res.json())
}

export const deleteDog = (id) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/dogs/${id}`, {
        method: "DELETE"
    })
}

export const getCurrentDog = (id) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/dogs/${id}?_expand=user&_expand=rescue&_expand=size&_expand=age`)
        .then(res => res.json())
}

export const getCurrentBlogPost = (id) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/blogPosts/${id}`)
        .then(res => res.json())
}

export const getCurrentEvent = (id) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/events/${id}`)
        .then(res => res.json())
}

export const deleteBlogPost = (id) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/blogPosts/${id}`, {
        method: "DELETE"
    })
}

export const getUserEmail = (email) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/users?email=${email}`)
        .then(res => res.json())
}

export const putEditUser = (user) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

export const postBlog = (newPost) => {
    return fetch("https://furry-friends-api-33qtl.ondigitalocean.app/blogPosts?_expand=user&_expand=dog", {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
    })
}

export const putEditBlog = (blogPostId, editedPost) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/blogPosts/${blogPostId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedPost)
    })
}

export const postEvent = (newEvent) => {
    return fetch("https://furry-friends-api-33qtl.ondigitalocean.app/events", {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
    })
}

export const putEvent = (eventId, editedEvent) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedEvent)
    })
}

export const deleteEvent = (id) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/events/${id}`, {
        method: "DELETE"
    })
}

export const postDog = (newDog) => {
    return fetch("https://furry-friends-api-33qtl.ondigitalocean.app/dogs?_expand=user&_expand=rescue&_expand=size", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDog)
    })
}

export const putEditDog = (dog, editedDog) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/dogs/${dog.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedDog)
    })
}

export const postRegistration = (user) => {
    return fetch("https://furry-friends-api-33qtl.ondigitalocean.app/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const getUserEmailReg = (user) => {
    return fetch(`https://furry-friends-api-33qtl.ondigitalocean.app/users?email=${user.email}`)
        .then(res => res.json())
}