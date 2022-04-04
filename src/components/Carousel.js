import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import "./Carousel.css"

const items = [
    {
        src: 'https://res.cloudinary.com/dfxsl6a2c/image/upload/v1648747322/1_ahkled.png',
        // altText: 'Slide 1',
        caption: '',
        // header: 'Welcome!',
        key: '1'
    },
    {
        src: 'https://res.cloudinary.com/dfxsl6a2c/image/upload/v1648747322/2_gukvbe.png',
        // altText: 'Slide 2',
        caption: '',
        // header: '',
        key: '2'
    },
    {
        src: 'https://res.cloudinary.com/dfxsl6a2c/image/upload/v1648747322/3_sxkcth.png',
        // altText: 'Slide 3',
        caption: '',
        // header: 'Slide 3 Header',
        key: '3'
    }
];

export const DogCarousel = () => <UncontrolledCarousel items={items} />;

