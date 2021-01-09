import {searched, searchFailed, imageReset} from '$actions/index';
import {SEARCH} from '$constants/index';
import {dispatch} from '$utils/index';

const search = async ({query, name, category}) => {
    const body = new FormData();
    body.append("q", query);
    body.append("language", "en");

    switch (category) {
        case 'general':
            body.append("category_videos", "on");
            body.append("category_it", "on");
            body.append("category_general", "on");
            break;
        case 'videos':
            body.append("category_videos", "on");
            break;
        case 'images':
            body.append("category_images", "on");
            break;
    }
    

    try {
        const data = await fetch(`api/search`, {
            method: "POST",
            body: body,
            
        }).then(res => res.json()).then(res=>res);

        dispatch(() => searched(data, name));
    } catch (error) {
        disparch(() => searchFailed(error.message, name));
    }
}

export function searchInterceptor(action) {
    switch (action.type){
        case SEARCH:
            search(action);
            dispatch(()=>imageReset('images'));
            break;
    }
}