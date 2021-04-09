import {get, writable} from 'svelte/store';

const userStore = writable(undefined);

export { userStore }