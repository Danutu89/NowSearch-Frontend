import {IMAGES_RESET, IMAGES_SELECT} from '$constants/index';
 
const imageReset = (name) => {
    return {
        type: IMAGES_RESET,
        name,

    }
}

const imagesSelect = (image, name) => {
    return {
        type: IMAGES_SELECT,
        image,
        name,
    }
}

export {imageReset, imagesSelect}