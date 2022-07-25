const API = 'https://furry-friends-api-33qtl.ondigitalocean.app'

export const getAllUsers = () => {
    return fetch(`${API}/users`)
        .then(res => res.json())
}

export const getCurrentUser = () => {
    return fetch(`${API}/users/${parseInt(localStorage.getItem("furry_user"))}`)
        .then(res => res.json())
}

export const getAllDogs = () => {
    return fetch(`${API}/dogs?_expand=user&_expand=rescue&_expand=size&_expand=age`)
        .then(res => res.json())
}

export const getAllRescues = () => {
    return fetch(`${API}/rescues`)
        .then(res => res.json())
}

export const getAllSizes = () => {
    return fetch(`${API}/sizes`)
        .then(res => res.json())
}

export const getAllAgeRanges = () => {
    return fetch(`${API}/ages`)
        .then(res => res.json())
}

export const getAllEvents = () => {
    return fetch(`${API}/events?_expand=rescue`)
        .then(res => res.json())
}

export const getAllBlogPosts = () => {
    return fetch(`${API}/blogPosts?_expand=user&_expand=dog`)
        .then(res => res.json())
}

export const getUserDogs = () => {
    return fetch(`${API}/users/${parseInt(localStorage.getItem("furry_user"))}?_embed=dogs`)
        .then(res => res.json())
}

export const deleteDog = (id) => {
    return fetch(`${API}/dogs/${id}`, {
        method: "DELETE"
    })
}

export const getCurrentDog = (id) => {
    return fetch(`${API}/dogs/${id}?_expand=user&_expand=rescue&_expand=size&_expand=age`)
        .then(res => res.json())
}

export const getCurrentBlogPost = (id) => {
    return fetch(`${API}/blogPosts/${id}`)
        .then(res => res.json())
}

export const getCurrentEvent = (id) => {
    return fetch(`${API}/events/${id}`)
        .then(res => res.json())
}

export const deleteBlogPost = (id) => {
    return fetch(`${API}/blogPosts/${id}`, {
        method: "DELETE"
    })
}

export const getUserEmail = (email) => {
    return fetch(`${API}/users?email=${email}`)
        .then(res => res.json())
}

export const putEditUser = (user) => {
    return fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

export const postBlog = (newPost) => {
    return fetch(`${API}/blogPosts?_expand=user&_expand=dog`, {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
    })
}

export const putEditBlog = (blogPostId, editedPost) => {
    return fetch(`${API}/blogPosts/${blogPostId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedPost)
    })
}

export const postEvent = (newEvent) => {
    return fetch(`${API}/events`, {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
    })
}

export const putEvent = (eventId, editedEvent) => {
    return fetch(`${API}/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedEvent)
    })
}

export const deleteEvent = (id) => {
    return fetch(`${API}/events/${id}`, {
        method: "DELETE"
    })
}

export const postDog = (newDog) => {
    return fetch(`${API}/dogs?_expand=user&_expand=rescue&_expand=size`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDog)
    })
}

export const putEditDog = (dog, editedDog) => {
    return fetch(`${API}/dogs/${dog.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedDog)
    })
}

export const postRegistration = (user) => {
    return fetch(`${API}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const getUserEmailReg = (user) => {
    return fetch(`${API}/users?email=${user.email}`)
        .then(res => res.json())
}