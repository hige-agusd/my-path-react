import React, { Component } from 'react';

import './Layout.css';
import Navbar from '../../components/Navigation/Navbar/Navbar';

class Layout extends Component {

    render () {
        return (
            <React.Fragment>
                <Navbar />
                <main className={'Content'}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout;