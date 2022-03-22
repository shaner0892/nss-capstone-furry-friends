import React from 'react';
// import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';
import "./Carousel.css"

const items = [
    {
        src: 'https://res.cloudinary.com/dfxsl6a2c/image/upload/v1647973917/1_b7nzkb.png',
        // altText: 'Slide 1',
        // caption: 'Slide 1',
        // header: 'Welcome!',
        key: '1'
    },
    {
        src: 'https://res.cloudinary.com/dfxsl6a2c/image/upload/v1647973917/2_n4waz7.png',
        // altText: 'Slide 2',
        // caption: 'Slide 2',
        // header: '',
        key: '2'
    },
    {
        src: 'https://res.cloudinary.com/dfxsl6a2c/image/upload/v1647973917/3_jl5okb.png',
        // altText: 'Slide 3',
        // caption: 'Slide 3',
        // header: 'Slide 3 Header',
        key: '3'
    }
];

export const DogCarousel = () => <UncontrolledCarousel items={items} />;

