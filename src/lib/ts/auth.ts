import { userbase } from '$lib/stores/userbaseStore';
import {loading, userStore} from '$lib/stores/userStore'

const signIn = (user) => {
    loading.set(true)
    userbase.signIn({
        username: user.username,
        password: user.password,
    })
    .then((user) => {
        userStore.set(user);
        loading.set(false);
    })
    .catch((e) => console.log(e));
}

const signOut = () => {
    loading.set(true);
    userbase.signOut().then(() => {
      userStore.set(undefined);
      loading.set(false);
    })
    .catch((e) => console.log(e));
}

export {signIn, signOut}