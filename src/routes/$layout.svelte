<script lang="ts">
  import "../global.css";
  import { loading, userStore } from "../lib/stores/userStore";
  import { browser } from "$app/env";
  import Auth from "$lib/components/auth.svelte";
  import Nav from "$lib/components/nav.svelte";
  import { openDatabases } from "$lib/ts/openDatabases";
  import Loading from "$lib/components/loading.svelte";
  import TopBar from "$lib/components/topBar.svelte";

  let sidebarOpen: boolean = false;

  if (browser) {
    // @ts-ignore
    const userbase = window.userbase;
    userbase
      .init({ appId: import.meta.env.VITE_USERBASE_API_KEY })
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
    <Nav {sidebarOpen} on:close={() => (sidebarOpen = false)} />
    <div class="flex-1 overflow-auto focus:outline-none" tabindex="0">
      <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
        <TopBar on:open={() => (sidebarOpen = true)} />
        <slot />
      </main>
    </div>
  </div>
{/if}
