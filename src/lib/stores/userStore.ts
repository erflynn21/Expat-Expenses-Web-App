import {writable} from 'svelte/store';

const loading = writable(true);
const userStore = writable(undefined);
const allDatabases = writable(null);

export {loading, userStore, allDatabases}