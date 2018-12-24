import * as actionTypes from './actionTypes';
import axios from 'axios';
import { baseUrl } from '../../config';

export const setPlaces = data => {
    return {
        type: actionTypes.SET_PLACES,
        places: data,
    }
}

export const setPlace = data => {
    return dispatch => {
        axios.put(baseUrl + 'places/' + data.path.join('/') + '.json', data.body)
            .then(res => {
                dispatch(fetchPlaces());
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const fetchPlaces = () => {
    return dispatch => {
        axios.get(baseUrl + 'places.json')
            .then(res => {
                dispatch(setPlaces(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}