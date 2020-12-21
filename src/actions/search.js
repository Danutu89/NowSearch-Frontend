import {SEARCH, SEARCHED, SEARCH_FAILED} from '$constants/index';
 
const search = (query, name) => {
    return {
        type: SEARCH,
        name,
        query,
    }
}

const searched = (data, name) => {
    return {
        type: SEARCHED,
        name,
        data,
    }
}

const searchFailed = (error, name) => {
    return {
        type: SEARCH_FAILED,
        name,
        error,
    }
}



export {search, searched, searchFailed}