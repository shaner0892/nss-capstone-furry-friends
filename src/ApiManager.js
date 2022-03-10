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