import {writable} from 'svelte/store';

const store = writable({
    loading: true,
    data: {},
    error: "",
    searched: false,
    query: "",
    category: "general",
    page: 1,
});

export default store;