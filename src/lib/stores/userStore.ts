import {writable} from 'svelte/store';

const userStore = writable(undefined);
const allDatabases = writable(null);

export {userStore, allDatabases}