import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import { featureTypes } from '../types';



class PointForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: props.position.lat,
            lng: props.position.lng,
            country: '',
            countryOther: '',
            city: '',
            cityOther: '',
            amenity: '',
            name: '',
            popupContent: '',
            type: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchPlaces();
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const country = this.state.country && this.state.country !== '-1' ? this.state.country : this.state.countryOther;
        const city = this.state.city && this.state.city !== '-1' ? this.state.city : this.state.cityOther;
        let counter = this.state.country === '-1' ? 0 :
            (this.state.city === '-1') ? 0 :
                parseInt(this.props.places[country][city].slice(-1)[0].id.replace(/\D/g, ''), 10) + 1;
        counter = (counter < 100) ? (counter < 10) ? '00' + counter : '0' + counter : counter;
        const newPoint = {
            geometry: {
                coordinates: [this.state.lat, this.state.lng],
                type: 'Point'
            },
            id: country.toLowerCase() + city.toLowerCase() + counter,
            properties: {
                amenity: this.state.amenity,
                name: this.state.name,
                popupContent: this.state.popupContent,
                type: this.state.type,
            },
            type: 'Feature'
        };
        const body = (this.state.country === '-1' || this.state.city === '-1') ? [newPoint] :
            [...this.props.places[country][city], newPoint];
        this.props.setPlace({ path: [country, city], body: body });
        event.preventDefault();
    }

    getCountries() {
        return Object.keys(this.props.places);
    }

    getCities() {
        return Object.keys(this.props.places[this.state.country]);
    }

    render() {
        const countryOther = this.state.country !== '-1' ? null : (
            <input
                name="countryOther"
                type="text"
                value={this.state.countryOther}
                onChange={this.handleInputChange} />
        );
        const cityOther = this.state.city !== '-1' && this.state.country !== '-1' ? null : (
            <input
                name="cityOther"
                type="text"
                value={this.state.cityOther}
                onChange={this.handleInputChange} />
        );

        const countries = this.getCountries().map(country => {
            return <option key={country} value={country}>{country}</option>;
        });
        const citiesSelect = !this.state.country ? null : (
            <label>
                City:
                {this.state.country !== '-1' ?
                    <select value={this.state.city}
                        name="city"
                        disabled={!this.state.country || this.state.country === '-1'}
                        onChange={this.handleInputChange} >
                        <option value=''>Choose one</option>
                        {this.getCities().map(city => {
                            return <option key={city} value={city}>{city}</option>;
                        })}
                        <option value='-1'>Other</option>
                    </select> : null}
                {cityOther}
            </label>
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Country:
          <select value={this.state.country}
                        name="country"
                        onChange={this.handleInputChange} >
                        <option value=''>Choose one</option>
                        {countries}
                        <option value='-1'>Other</option>
                    </select>
                    {countryOther}
                </label>
                {citiesSelect}
                <label>
                    Latitude:
          <input
                        name="lat"
                        type="number"
                        value={this.state.lat}
                        disabled
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Longitude:
          <input
                        name="lng"
                        type="number"
                        value={this.state.lng}
                        disabled
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Amenity:
          <input
                        name="amenity"
                        type="text"
                        value={this.state.amenity}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Name:
          <input
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Content:
          <input
                        name="popupContent"
                        type="text"
                        value={this.state.popupContent}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Type:
          <select value={this.state.type}
                        name="type"
                        onChange={this.handleInputChange} >
                        <option value=''>Choose one</option>
                        {Object.keys(featureTypes).map(type => {
                            return <option key={featureTypes[type]} value={featureTypes[type]}>{featureTypes[type]}</option>;
                        })}
                    </select>
                </label>
                <input
                    disabled={(!this.state.country || (this.state.country === '-1' && !this.state.countryOther))
                        || (!this.state.city || (this.state.city === '-1' && !this.state.cityOther))
                        || !this.state.amenity || !this.state.name || !this.state.type || !this.state.lat || !this.state.lng
                    }
                    type="submit" value="Submit" />
            </form>
        );
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
        setPlace: (newPoint) => dispatch(actions.setPlace(newPoint))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointForm);