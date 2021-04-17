<script lang="ts">
  import { categories } from "$lib/stores/budgetsStore";
  import { allCurrencies, baseCurrency } from "$lib/stores/currenciesStore";
  import { calendarDate } from "$lib/stores/datesStore";
  import { convert } from "$lib/ts/convert";
  import { addExpense } from "$lib/ts/expenses";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  interface Expense {
    title: string;
    amount: number;
    category: string;
    date: string;
    currency: string;
    originalAmount: number;
    originalCurrency: string;
  }

  let expense: Expense = {
    title: "",
    amount: null,
    category: $categories[0],
    date: $calendarDate,
    currency: $baseCurrency,
    originalAmount: null,
    originalCurrency: null,
  };

  const add = async () => {
    if (expense.title === null || expense.amount === null) {
      console.log("missing something");
      return;
    }

    if (expense.currency !== $baseCurrency) {
      // console.log(expense);
      await convert(expense).then((item) => {
        console.log(item);
      });
    }

    // await addExpense(expense).then((e) => {
    //   if (e) {
    //     console.log(e);
    //   } else {
    //     clearForm();
    //   }
    // });
  };

  const clearForm = () => {
    expense.title = "";
    expense.amount = null;
    expense.currency = $baseCurrency;
    expense.originalCurrency = null;
    expense.originalAmount = null;
  };
</script>

<div
  class="fixed z-10 inset-0 overflow-y-auto"
  aria-labelledby="addModal"
  role="dialog"
  aria-modal="true"
>
  <div
    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  >
    <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      on:click={() => dispatch("close")}
      aria-hidden="true"
    />

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span
      class="hidden sm:inline-block sm:align-middle sm:h-screen"
      aria-hidden="true">&#8203;</span
    >

    <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
    <div
      class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
    >
      <div>
        <div class="pt-2 space-y-6 sm:pt-2 sm:space-y-5">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Add Expense
            </h3>
          </div>
          <div class="space-y-6 sm:space-y-5">
            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="date"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Date
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="date"
                  name="date"
                  id="date"
                  bind:value={expense.date}
                  placeholder={$calendarDate}
                  class="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Expense
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  bind:value={expense.title}
                  class="max-w-lg block w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="amount"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Amount
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  bind:value={expense.amount}
                  class="block max-w-lg w-full shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="currency"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Currency
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="currency"
                  name="currency"
                  bind:value={expense.currency}
                  class="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  {#each $allCurrencies as currency}
                    <option>{currency}</option>
                  {/each}
                </select>
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="category"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Category
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="category"
                  name="category"
                  bind:value={expense.category}
                  class="max-w-lg block focus:ring-green-500 focus:border-green-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  {#each $categories as category}
                    <option>{category}</option>
                  {/each}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
      >
        <button
          type="button"
          on:click={add}
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
        >
          Add Expense
        </button>
        <button
          type="button"
          on:click={() => dispatch("close")}
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
