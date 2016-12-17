// @flow

// import Immutable from 'immutable';
import { Map } from 'immutable';
import { MAKE_BARK } from '../actions/dog-actions';

const initialState = Map({
    hasBarked: false,
});

const dogReducer = (state: Map<string, boolean> = initialState, action: any) => {
    switch (action.type) {
    case MAKE_BARK:
        return state.set('hasBarked', action.payload);
    default:
        return state;
    }
};

export default dogReducer;
