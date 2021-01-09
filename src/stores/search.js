import {writable} from 'svelte/store';

const store = writable({
    loading: true,
    data: {},
    error: "",
    searched: false,
    query: "",
    category: "general",
});

export default store;