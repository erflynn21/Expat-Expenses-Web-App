import {writable} from 'svelte/store';

const initialized = writable(false);
const userStore = writable(undefined);
const allDatabases = writable(null);

export {initialized, userStore, allDatabases}