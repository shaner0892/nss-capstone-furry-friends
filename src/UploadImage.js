import React, { useState } from "react"

export default function UploadImages({dog, updateDog}) {
    
    const [uploadedImage, setUploadedImage] = useState("")

    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {
            debugger
            const copy = {...dog}
            copy.imageURL = resultEvent.info.secure_url
            updateDog(copy)
            setUploadedImage(`${resultEvent.info.original_filename}.${resultEvent.info.format}`)
        }
    }

    const showWidget = (e) => {
        e.preventDefault()
        let widget = window.cloudinary.createUploadWidget({cloudName: "dfxsl6a2c", uploadPreset: "tb942fag"}, (error, result) => {checkUploadResult(result)})
        widget.open()
    }

    return (
        <>
            <button type="file" onClick={showWidget} >Upload an image</button>
            <p>{uploadedImage}</p>
        </>
    )
}