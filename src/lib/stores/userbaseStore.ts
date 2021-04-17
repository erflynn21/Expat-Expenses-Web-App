import { browser } from "$app/env";

let userbase = null

if (browser) {
    // @ts-ignore
    userbase = window.userbase;
}

export {userbase}