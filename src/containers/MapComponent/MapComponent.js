import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, LayerGroup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// import classes from './MapComponent.css';
import './MapComponent.css';


class MapComponent extends Component {
    state = {
        lat: 0.0,
        lng: 0.0,
        zoom: 2,
    }

    componentDidMount() {
        this.props.fetchPlaces();
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        // console.log(this.props.places);
        const points = [].concat(...Object.keys(this.props.places).map(country => {
            return [].concat(
                ...Object.keys(this.props.places[country]).map(city => {
                    // console.log(temp1[country][city]);
                    return [].concat(
                        ...this.props.places[country][city].map(point => { return { ...point, city: city, country: country } }));
                })
            );
        }));
        const keysPlaces = Object.keys(this.props.places);
        const layerGroup = (keysPlaces.length === 0) ? null
            : (<MarkerClusterGroup>
                {points.map(point => {
                    return (
                        <Marker position={point.geometry.coordinates}
                            key={point.id}
                            ></Marker>
                    )
                })}
            </MarkerClusterGroup>)
        return (
            <div className={'MapWrapper'} >
                <Map center={position} zoom={this.state.zoom} maxZoom={25} minZoom={1}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    {layerGroup}
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        places: state.places.places,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPlaces: () => dispatch(actions.fetchPlaces()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);