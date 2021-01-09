import {SEARCH, SEARCHED, SEARCH_FAILED, SEARCH_RESET} from '$constants/index';
 
const search = (query, name, category) => {
    return {
        type: SEARCH,
        name,
        query,
        category,
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

const searchReset = (name) => {
    return {
        type: SEARCH_RESET,
        name,
    }
}

export {search, searched, searchFailed, searchReset}