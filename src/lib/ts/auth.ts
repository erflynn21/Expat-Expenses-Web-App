import {userStore} from '$lib/stores/userStore'

const signIn = (user) => {
    // @ts-ignore
    const userbase = window.userbase;
    userbase.signIn({
        username: user.username,
        password: user.password,
    })
    .then((user) => {
        userStore.set(user);
    })
    .catch((e) => console.log(e));
}

const signOut = () => {
    // @ts-ignore
    const userbase = window.userbase;
    userbase.signOut().then(() => {
      userStore.set(undefined)
    })
    .catch((e) => console.log(e));
}

export {signIn, signOut}