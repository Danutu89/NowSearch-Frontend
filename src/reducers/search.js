import {SEARCH, SEARCHED, SEARCH_FAILED, SEARCH_RESET} from '$constants/index';
import {search as searchState} from '../stores/index';

const intialState = {
    data: {},
    error: '',
    searched: false,
    query: '',
    loading: false,
    category: 'general',
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
            state.category = action.category;
            break;
        case SEARCHED:
            state.loading = false;
            state.data = action.data;
            break;
        case SEARCH_FAILED:
            state.loading = false;
            state.error = action.error;
            break;
        case SEARCH_RESET:
            state.query = "";
            state.loading = false;
            state.error = '';
            state.data = {};
            state.searched = false;
            state.category = "general";
            break;
    }
    return state;
}

export {searchReducer}