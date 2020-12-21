import {SEARCH, SEARCHED, SEARCH_FAILED} from '$constants/index';
import {search as searchState} from '../stores/index';

const intialState = {
    data: {},
    error: '',
    searched: false,
    query: '',
    loading: false,
}

const searchReducer = (action) => {
    const state = searchState || intialState; 
    switch (action.type){
        case SEARCH:
            state.query = action.query;
            state.loading = true;
            state.error = '';
            state.data = {};
            state.searched = true;
            break;
        case SEARCHED:
            state.loading = false;
            state.data = action.data;
            break;
        case SEARCH_FAILED:
            state.loading = false;
            state.error = action.error;
            break;
    }
    return state;
}

export {searchReducer}