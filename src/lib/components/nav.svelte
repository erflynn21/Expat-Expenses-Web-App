<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let sidebarOpen;
  let current: string = "overview";
</script>

{#if sidebarOpen === true}
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <div
    class="fixed inset-0 flex z-40 lg:hidden"
    role="dialog"
    aria-modal="true"
  >
    <!--
      Off-canvas menu overlay, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-75"
      aria-hidden="true"
      on:click={() => dispatch("close")}
    />

    <!--
      Off-canvas menu, show/hide based on off-canvas menu state.

      Entering: "transition ease-in-out duration-300 transform"
        From: "-translate-x-full"
        To: "translate-x-0"
      Leaving: "transition ease-in-out duration-300 transform"
        From: "translate-x-0"
        To: "-translate-x-full"
    -->

    <div
      class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-green-700"
    >
      <!--
        Close button, show/hide based on off-canvas menu state.

        Entering: "ease-in-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-300"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="absolute top-0 right-0 -mr-12 pt-2">
        <button
          class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          on:click={() => dispatch("close")}
        >
          <span class="sr-only">Close sidebar</span>
          <!-- Heroicon name: outline/x -->
          <svg
            class="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="flex-shrink-0 flex items-center px-4">
        <img
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/easywire-logo-green-300-mark-white-text.svg"
          alt="Easywire logo"
        />
      </div>
      <nav
        class="mt-5 flex-shrink-0 h-full divide-y divide-green-800 overflow-y-auto"
        aria-label="Sidebar"
      >
        <div class="px-2 space-y-1">
          <!-- Current: "bg-green-800 text-white", Default: "text-green-100 hover:text-white hover:bg-green-600" -->
          <a
            href="/"
            class="bg-green-800 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            aria-current="page"
          >
            <!-- Heroicon name: outline/home -->
            <svg
              class="mr-4 h-6 w-6 text-green-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </a>

          <a
            href="/"
            class="text-green-100 hover:text-white hover:bg-green-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
          >
            <!-- Heroicon name: outline/clock -->
            <svg
              class="mr-4 h-6 w-6 text-green-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            History
          </a>

          <a
            href="/"
            class="text-green-100 hover:text-white hover:bg-green-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
          >
            <!-- Heroicon name: outline/scale -->
            <svg
              class="mr-4 h-6 w-6 text-green-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
            Balances
          </a>

          <a
            href="/"
            class="text-green-100 hover:text-white hover:bg-green-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
          >
            <!-- Heroicon name: outline/credit-card -->
            <svg
              class="mr-4 h-6 w-6 text-green-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Cards
          </a>

          <a
            href="/"
            class="text-green-100 hover:text-white hover:bg-green-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
          >
            <!-- Heroicon name: outline/user-group -->
            <svg
              class="mr-4 h-6 w-6 text-green-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Recipients
          </a>

          <a
            href="/"
            class="text-green-100 hover:text-white hover:bg-green-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
          >
            <!-- Heroicon name: outline/document-report -->
            <svg
              class="mr-4 h-6 w-6 text-green-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Reports
          </a>
        </div>
        <div class="mt-6 pt-6">
          <div class="px-2 space-y-1">
            <a
              href="/"
              class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-green-100 hover:text-white hover:bg-green-600"
            >
              <!-- Heroicon name: outline/cog -->
              <svg
                class="mr-4 h-6 w-6 text-green-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </a>

            <a
              href="/"
              class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-green-100 hover:text-white hover:bg-green-600"
            >
              <!-- Heroicon name: outline/question-mark-circle -->
              <svg
                class="mr-4 h-6 w-6 text-green-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Help
            </a>

            <a
              href="/"
              class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-green-100 hover:text-white hover:bg-green-600"
            >
              <!-- Heroicon name: outline/shield-check -->
              <svg
                class="mr-4 h-6 w-6 text-green-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Privacy
            </a>
          </div>
        </div>
      </nav>
    </div>

    <div class="flex-shrink-0 w-14" aria-hidden="true">
      <!-- Dummy element to force sidebar to shrink to fit close icon -->
    </div>
  </div>
{/if}

<!-- Static sidebar for desktop -->
<div class="hidden lg:flex lg:flex-shrink-0">
  <div class="flex flex-col w-64">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex flex-col flex-grow bg-green-700 pt-5 pb-4 overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4">
        <img class="h-8 w-auto" src="icon.webp" alt="Expat Expenses Logo" />
        <span>Expat Expenses</span>
      </div>
      <nav
        class="mt-5 flex-1 flex flex-col divide-y divide-green-800 overflow-y-auto"
        aria-label="Sidebar"
      >
        <div class="px-2 space-y-1">
          <!-- Current: "bg-green-800 text-white", Default: "text-green-100 hover:text-white hover:bg-green-600" -->
          <a
            href="/"
            on:click={() => (current = "overview")}
            class="{current === 'overview'
              ? 'bg-green-800 text-white'
              : 'text-green-100 hover:text-white hover:bg-green-600'} group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
          >
            <svg
              class="mr-4 text-green-200 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              /><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
            Overivew
          </a>

          <a
            href="/budget"
            on:click={() => (current = "budget")}
            class="{current === 'budget'
              ? 'bg-green-800 text-white'
              : 'text-green-100 hover:text-white hover:bg-green-600'} group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
          >
            <svg
              class="mr-4 text-green-200 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Budget
          </a>

          <a
            href="/transactions"
            on:click={() => (current = "transactions")}
            class="{current === 'transactions'
              ? 'bg-green-800 text-white'
              : 'text-green-100 hover:text-white hover:bg-green-600'} group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
          >
            <svg
              class="mr-4 text-green-200 w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Transactions
          </a>
        </div>
        <!-- <div class="mt-6 pt-6">
          <div class="px-2 space-y-1">
            <a
              href="/settings"
              on:click={() => current = 'settings'}
              class="{current === 'settings'
                    ? 'bg-green-800 text-white'
                    : 'text-green-100 hover:text-white hover:bg-green-600'} group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
            >
              <svg
                class="mr-4 h-6 w-6 text-green-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </a>
            <a href="/" class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-green-100 hover:text-white hover:bg-green-600">
                  <svg class="mr-4 h-6 w-6 text-green-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Privacy
                </a>
          </div>
        </div> -->
      </nav>
    </div>
  </div>
</div>
