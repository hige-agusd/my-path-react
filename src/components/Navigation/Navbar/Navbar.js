import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Navbar.css';

const navbar = () => {
    return (
        <div className={'Navbar'} >
            <NavigationItems />
        </div>
    )
};

export default navbar;