import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, LayerGroup } from 'react-leaflet';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// import classes from './MapComponent.css';
import './MapComponent.css';


class MapComponent extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    }

    componentDidMount() {
        this.props.fetchPlaces();
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        // console.log(this.props.places);
        const keysPlaces = Object.keys(this.props.places);
        const layerGroup = (keysPlaces.length === 0) ? null 
            : (<LayerGroup>
                { this.props.places.Japan.Himeji.map(point => {
                    return (
                        <Marker position={point.geometry.coordinates}
                            key={point.id}
                        ></Marker>
                    )
                }) }
            </LayerGroup>)
        return (
            <div className={'MapWrapper'} >
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { layerGroup }
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