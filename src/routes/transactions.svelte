<script lang="ts">
  import { baseCurrencySymbol } from "$lib/stores/currenciesStore";

  import { expenses } from "$lib/stores/expensesStore";
  import { incomes } from "$lib/stores/incomesStore";
</script>

<h2
  class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8"
>
  Transactions
</h2>
<!-- expenses -->
<!-- Activity list (smallest breakpoint only) -->
<div class="shadow sm:hidden">
  <ul class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
    {#each $expenses as { item, itemId } (itemId)}
      <li>
        <a href="/" class="block px-4 py-4 bg-white hover:bg-gray-50">
          <span class="flex items-center space-x-4">
            <span class="flex-1 flex space-x-2 truncate">
              <!-- Heroicon name: solid/cash -->
              <svg
                class="flex-shrink-0 h-5 w-5 text-gray-400"
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
              <span class="flex flex-col text-gray-500 text-sm truncate">
                <span class="truncate">{item.title}</span>
                <span
                  ><span class="text-gray-900 font-medium"
                    >{$baseCurrencySymbol}{item.amount}</span
                  >
                </span>
                <time datetime="2020-07-11">{item.date}</time>
              </span>
            </span>
            <!-- Heroicon name: solid/chevron-right -->
            <svg
              class="flex-shrink-0 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </a>
      </li>
    {/each}

    <!-- More items... -->
  </ul>

  <nav
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
    aria-label="Pagination"
  >
    <div class="flex-1 flex justify-between">
      <a
        href="/"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
      >
        Previous
      </a>
      <a
        href="/"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
      >
        Next
      </a>
    </div>
  </nav>
</div>

<!-- Activity table (small breakpoint and up) -->
<div class="hidden sm:block">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col mt-2">
      <div
        class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Expense
              </th>
              <th
                class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                class="hidden px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
              >
                Category
              </th>
              <th
                class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each $expenses as { item, itemId } (itemId)}
              <tr class="bg-white">
                <td
                  class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  <div class="flex">
                    <a
                      href="/"
                      class="group inline-flex space-x-2 truncate text-sm"
                    >
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
                      <p
                        class="text-gray-500 truncate group-hover:text-gray-900"
                      >
                        {item.title}
                      </p>
                    </a>
                  </div>
                </td>
                <td
                  class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500"
                >
                  <span class="text-gray-900 font-medium"
                    >{$baseCurrencySymbol}{item.amount}
                  </span>
                  <!-- {$baseCurrency} -->
                </td>
                <td
                  class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block text-right"
                >
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-green-800 capitalize"
                  >
                    {item.category}
                  </span>
                </td>
                <td
                  class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500"
                >
                  <time datetime={item.date}>{item.date}</time>
                </td>
              </tr>
            {/each}

            <!-- More items... -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- incomes -->
<!-- Activity list (smallest breakpoint only) -->
<div class="shadow sm:hidden">
  <ul class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
    {#each $expenses as { item, itemId } (itemId)}
      <li>
        <a href="/" class="block px-4 py-4 bg-white hover:bg-gray-50">
          <span class="flex items-center space-x-4">
            <span class="flex-1 flex space-x-2 truncate">
              <!-- Heroicon name: solid/cash -->
              <svg
                class="flex-shrink-0 h-5 w-5 text-gray-400"
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
              <span class="flex flex-col text-gray-500 text-sm truncate">
                <span class="truncate">{item.title}</span>
                <span
                  ><span class="text-gray-900 font-medium"
                    >{$baseCurrencySymbol}{item.amount}</span
                  >
                </span>
                <time datetime="2020-07-11">{item.date}</time>
              </span>
            </span>
            <!-- Heroicon name: solid/chevron-right -->
            <svg
              class="flex-shrink-0 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </a>
      </li>
    {/each}

    <!-- More items... -->
  </ul>

  <nav
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
    aria-label="Pagination"
  >
    <div class="flex-1 flex justify-between">
      <a
        href="/"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
      >
        Previous
      </a>
      <a
        href="/"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
      >
        Next
      </a>
    </div>
  </nav>
</div>

<!-- Activity table (small breakpoint and up) -->
<div class="hidden sm:block mt-10">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col mt-2">
      <div
        class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Income
              </th>
              <th
                class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each $incomes as { item, itemId } (itemId)}
              <tr class="bg-white">
                <td
                  class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  <div class="flex">
                    <a
                      href="/"
                      class="group inline-flex space-x-2 truncate text-sm"
                    >
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
                      <p
                        class="text-gray-500 truncate group-hover:text-gray-900"
                      >
                        {item.title}
                      </p>
                    </a>
                  </div>
                </td>
                <td
                  class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500"
                >
                  <span class="text-gray-900 font-medium"
                    >{$baseCurrencySymbol}{item.amount}
                  </span>
                  <!-- {$baseCurrency} -->
                </td>
                <td
                  class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500"
                >
                  <time datetime={item.date}>{item.date}</time>
                </td>
              </tr>
            {/each}

            <!-- More items... -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
