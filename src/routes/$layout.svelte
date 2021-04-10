<script lang="ts">
  import "../global.css";
  import {userStore} from '../lib/stores/userStore';
	import {browser} from '$app/env';
  import Auth from "$lib/components/auth.svelte";
  import Nav from "$lib/components/nav.svelte";
  import {signOut} from "$lib/ts/auth";
  import { openDatabases } from "$lib/ts/openDatabases";
  let profileDropdownOpen = false;

	if (browser) {
    // @ts-ignore
	  const userbase = window.userbase;
		userbase.init({appId: '9c589a73-c7d7-435e-9657-336c0347609f'}).then(({user}) => {
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
        .catch((e) => console.log(e));
	}

  const logOut = () => {
    profileDropdownOpen = false;
    signOut();
  }
</script>

{#if $userStore === undefined}
  <Auth />
{:else}
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <Nav />

    <div class="flex-1 overflow-auto focus:outline-none" tabindex="0">
      <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
        <div class="bg-white shadow">
          <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div
              class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
            >
              <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add money
                </button>
                <button
                  type="button"
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Send money
                </button>
              </div>
              <div class="ml-3 relative">
                <div>
                  <button
                    type="button"
                    class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    on:click={() =>
                      (profileDropdownOpen = !profileDropdownOpen)}
                  >
                    <span
                      class="hidden ml-3 text-gray-700 text-sm font-medium lg:block"
                      ><span class="sr-only"
                        >Open user menu for
                      </span>{$userStore.username}</span
                    >
                    <svg
                      class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
                -->
                {#if profileDropdownOpen === true}
                  <div
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="/settings"
                      on:click={() => profileDropdownOpen = false}
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem">Settings</a
                    >
                    <a
                      href="/"
                      on:click|preventDefault={logOut}
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem">Logout</a
                    >
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>

        <slot />
      </main>
    </div>
  </div>
{/if}
