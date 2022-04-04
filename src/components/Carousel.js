import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import "./Carousel.css"

const items = [
    {
        src: 'https://res.cloudinary.com/dfxsl6a2c/image/upload/v1648747322/1_ahkled.png',
        caption: '',
        key: '1'
    },
    {
        src: 'https://res.cloudinary.com/dfxsl6a2c/image/upload/v1648747322/2_gukvbe.png',
        caption: '',
        key: '2'
    },
    {
        src: 'https://res.cloudinary.com/dfxsl6a2c/image/upload/v1648747322/3_sxkcth.png',
        caption: '',
        key: '3'
    }
];

export const DogCarousel = () => <UncontrolledCarousel items={items} />;

