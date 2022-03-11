//this module is responsible for fetching data from the API

export const getAllUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(res => res.json())
}

export const getAllDogs = () => {
    return fetch("http://localhost:8088/dogs?_expand=user&_expand=rescue&_expand=size")
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
    return fetch("http://localhost:8088/ageRanges")
        .then(res => res.json())
}

export const getUserDogs = () => {
    return fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("furry_user"))}?_embed=dogs`)
        .then(res => res.json())
}

export const deleteDog = (id) => {
    fetch(`http://localhost:8088/dogs/${id}`, {
        method: "DELETE"
    })
}
