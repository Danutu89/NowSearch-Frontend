import {IMAGES_RESET, IMAGES_SELECT} from '$constants/index';
import {images as imagesState} from '../stores/index';

const intialState = {
    data: {},
    selected: false,
}

const imagesReducer = (action) => {
    const state = imagesState || intialState; 
    switch (action.type){
        case IMAGES_RESET:
            state.data = {};
            state.selected = false;
            break;
        case IMAGES_SELECT:
            state.data = action.image;
            state.selected = true;
            break;
    }
    return state;
}

export {imagesReducer}