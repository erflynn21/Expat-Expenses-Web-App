<script lang="ts">
  import { userStore } from "$lib/stores/userStore";
  import { signOut } from "$lib/ts/auth";
  import AddExpense from "./addExpense.svelte";

  let profileDropdownOpen: boolean = false;
  let addModal: boolean = false;

  const logOut = () => {
    profileDropdownOpen = false;
    signOut();
  };
</script>

<div class="bg-white shadow">
  <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
    <div
      class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
    >
      <div class="mt-6 flex space-x-3 md:mt-0">
        <button
          type="button"
          on:click={() => (addModal = true)}
          class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Expense
        </button>
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Income
        </button>
      </div>

      <div class="relative inline-block text-left">
        <div>
          <button
            type="button"
            on:click={() => (profileDropdownOpen = !profileDropdownOpen)}
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500"
            id="options-menu"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Options
            <!-- Heroicon name: solid/chevron-down -->
            <svg
              class="-mr-1 ml-2 h-5 w-5"
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
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div class="px-4 py-3" role="none">
              <p class="text-sm" role="none">Signed in as</p>
              <p class="text-sm font-medium text-gray-900 truncate" role="none">
                {$userStore.username}
              </p>
            </div>
            <div class="py-1" role="none">
              <a
                href="/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem">Settings</a
              >
              <!-- <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem">Support</a
                    > -->
              <!-- <a
                      href="/"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem">Sign Out</a
                    > -->
            </div>
            <div class="py-1" role="none">
              <a
                href="/"
                on:click|preventDefault={logOut}
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem">Sign Out</a
              >
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

{#if addModal === true}
  <AddExpense on:close={() => (addModal = false)} />
{/if}
