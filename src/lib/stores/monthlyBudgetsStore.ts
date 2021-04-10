import {writable, get} from 'svelte/store';
import {selectedYear, selectedMonth} from '$lib/stores/datesStore';

let monthlyBudgets = writable([]);
let monthlyBudgetsSum = writable(0);
let monthlyBudgetsDatabaseName = writable(null);
monthlyBudgetsDatabaseName.set(`${get(selectedYear)}-${get(selectedMonth)}-monthlyBudgets`);

export {monthlyBudgets, monthlyBudgetsSum, monthlyBudgetsDatabaseName}