import React, { useEffect, useState } from "react";
import { getAllRescues } from "../ApiManager";


export const RescueList = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [rescues, modifyRescues] = useState([])

    //useEffect is a hook, it takes two arguments(function and array)
    //sole purpose is to run code when state changes(it's like an event listener)
    useEffect(
        () => {
            getAllRescues()
                .then(modifyRescues)
        },
        []
    )
    
    return (
        <>
            {/* //iterate rescues and convert them from objects to html using jsx
            //use map array method conversion tool */}
            {
                rescues.map(
                    (rescue) => {
                        return <p key={`rescue--${rescue.id}`}>{rescue.name} </p>
                    }
                )
            }
        </>
    )
}