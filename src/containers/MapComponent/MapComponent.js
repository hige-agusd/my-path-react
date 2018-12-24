import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { connect } from 'react-redux';
import PopupContent from '../../components/popupContent';
import PointForm from '../../components/PointForm';
import * as actions from '../../store/actions/index';

// import classes from './MapComponent.css';
import './MapComponent.css';


class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0.0,
            lng: 0.0,
            zoom: 2,
            popupForm: null,
        };
        this.onMapClick = this.onMapClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchPlaces();
    }

    onMapClick(e) {
        let state = { ...this.state };
        state.popupForm = (
            <Popup 
                onClose={
                    this.setState({
                        ...this.state,
                        popupForm: null
                    })
                }
                position={e.latlng} > 
                <PointForm position={e.latlng}/>
            </Popup>);
        this.setState(state);
        // alert("You clicked the map at " + e.latlng);
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        // console.log(this.props.places);
        const keysPlaces = Object.keys(this.props.places);
        const markerCluster = (keysPlaces.length === 0) ? null
            : (<MarkerClusterGroup>
                {
                    [].concat(...Object.keys(this.props.places).map(country => {
                        return [].concat(
                            ...Object.keys(this.props.places[country]).map(city => {
                                // console.log(temp1[country][city]);
                                return [].concat(
                                    ...this.props.places[country][city].map(point => { return { ...point, city: city, country: country } }));
                            })
                        );
                    })).map(point => {
                        return (
                            <Marker position={point.geometry.coordinates}
                                key={point.id}
                                >
                                <Popup>
                                    <PopupContent
                                        properties={point.properties}
                                        geometry={point.geometry} />
                                </Popup>
                            </Marker>
                        )
                    })}
            </MarkerClusterGroup>)
        return (
            <div className={'MapWrapper'} >
                <Map center={position} zoom={this.state.zoom}
                    onclick={this.onMapClick}
                    maxZoom={25} minZoom={1}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    {markerCluster}
                    {this.state.popupForm}
                </Map>
            </div>
        )
    }
}

const mapStateToProps = state => {
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