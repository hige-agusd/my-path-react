import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import MapComponent from './containers/MapComponent/MapComponent';
import Itinerary from './containers/Itinerary/Itinerary';
import Blog from './containers/Blog/Blog';
import Photos from './containers/Photos/Photos';

import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/map" component={MapComponent} />
          <Route path="/itinerary" component={Itinerary} />
          <Route path="/blog" component={Blog} />
          <Route path="/photos" component={Photos} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
