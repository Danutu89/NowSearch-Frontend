import {SEARCH, SEARCHED, SEARCH_FAILED, SEARCH_RESET, SEARCH_MORE, SEARCHED_MORE, SEARCH_MORE_FAILED} from '$constants/index';
 
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

const searchMore = (page, name) => {
    return {
        type: SEARCH_MORE,
        page,
        name,
    }
}

const searchedMore = (data, name) => {
    return {
        type: SEARCHED_MORE,
        data,
        name,
    }
}

const searchMoreFailed = (error, name) => {
    return {
        type: SEARCH_MORE_FAILED,
        error,
        name,
    }
}

export {search, searched, searchFailed, searchReset, searchMore, searchedMore, searchMoreFailed}