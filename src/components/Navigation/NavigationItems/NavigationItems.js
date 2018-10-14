import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const navigationItems = () => (
    <ul className={'NavigationItems'}>
        <NavigationItem link="/map">Map</NavigationItem>
        <NavigationItem link="/itinerary">Itinerary</NavigationItem>
        <NavigationItem link="/blog">Blog</NavigationItem>
        <NavigationItem link="/photos">Photos</NavigationItem>
    </ul>
);

export default navigationItems;