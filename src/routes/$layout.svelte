<script lang="ts">
  import "../global.css";
  import { loading, userStore } from "../lib/stores/userStore";
  import { browser } from "$app/env";
  import Auth from "$lib/components/auth.svelte";
  import Nav from "$lib/components/nav.svelte";
  import { openDatabases } from "$lib/ts/openDatabases";
  import Loading from "$lib/components/loading.svelte";
  import TopBar from "$lib/components/topBar.svelte";

  if (browser) {
    // @ts-ignore
    const userbase = window.userbase;
    userbase
      .init({ appId: "9c589a73-c7d7-435e-9657-336c0347609f" })
      .then(({ user }) => {
        if (user === undefined) {
          return;
        }

        if (user) {
          openDatabases();
          userStore.set(user);
        }

        if (user.profile === undefined) {
          return;
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        loading.set(false);
      });
  }
</script>

{#if $loading === true}
  <Loading />
{:else if $userStore === undefined}
  <Auth />
{:else}
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <Nav />
    <div class="flex-1 overflow-auto focus:outline-none" tabindex="0">
      <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
        <TopBar />
        <slot />
      </main>
    </div>
  </div>
{/if}
