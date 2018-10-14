import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    places: {},
    loading: false,
};

const setPlaces = ( state, action ) => {
    const updPlaces = updateObject(state.places, action.places);
    const updState = updateObject(state, {places: updPlaces});
    console.log(updPlaces)
    console.log(updState)

    const blah = updateObject(state, updState);
    console.log(blah);
    return blah;
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_PLACES: return setPlaces( state, action );
        default: return state;
    }
};

export default reducer;