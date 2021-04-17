<script lang="ts">
  export let item;
  export let itemId;
  import { baseCurrencySymbol } from "$lib/stores/currenciesStore";
  import { deleteExpense } from "$lib/ts/expenses";
  import DeleteModal from "./deleteModal.svelte";
  let dropdownOpen: boolean = false;
  let deleteModal: boolean = false;

  const handleDelete = () => {
    deleteExpense(itemId);
    deleteModal = false;
  };
</script>

<tr class="bg-white">
  <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
    <div class="flex">
      <a href="/" class="group inline-flex space-x-2 truncate text-sm">
        <!-- Heroicon name: solid/cash -->
        <svg
          class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="text-gray-500 truncate group-hover:text-gray-900">
          {item.title}
        </p>
      </a>
    </div>
  </td>
  <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
    <span class="text-gray-900 font-medium"
      >{$baseCurrencySymbol}{item.amount}
    </span>
  </td>
  <td
    class="hidden pl-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block text-right"
  >
    <span
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-green-800 capitalize"
    >
      {item.category}
    </span>
  </td>
  <td class="pl-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
    <time datetime={item.date}>{item.date}</time>
  </td>
  <td class="px-4 text-right whitespace-nowrap text-sm text-gray-500">
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          on:click={() => (dropdownOpen = !dropdownOpen)}
        >
          <span class="sr-only">Open options</span>
          <!-- Heroicon name: solid/dots-vertical -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
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
      {#if dropdownOpen === true}
        <div
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
            <button
              type="submit"
              class="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
            >
              Edit
            </button>
            <button
              type="submit"
              class="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabindex="-1"
              id="menu-item-1"
              on:click={() => (deleteModal = true)}
            >
              Delete
            </button>
          </div>
        </div>
      {/if}
    </div>
  </td>
</tr>

{#if deleteModal === true}
  <DeleteModal on:delete={handleDelete} />
{/if}
