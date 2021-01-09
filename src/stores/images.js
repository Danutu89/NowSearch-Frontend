import {writable} from 'svelte/store';

const store = writable({
    selected: false,
    data: {}
});

export default store;