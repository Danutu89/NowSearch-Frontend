import {main as mainStore} from '$stores/index';

export function addReducerAndInterceptors (interceptor, reducer, name, state) {
    if (!reducer || !state || !name) return;
    mainStore.update((prevState) => ({...prevState, [name]: {reducer, interceptor: interceptor ? interceptor : () => {}, state}}));
}