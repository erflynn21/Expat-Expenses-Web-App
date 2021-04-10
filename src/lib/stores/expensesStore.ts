import {writable, get} from 'svelte/store';
import { selectedYear } from './datesStore';

let allExpenses = writable([]);
let expenses = writable([]);
let expensesSum = writable(0);
let expensesDatabaseName = writable(null);
expensesDatabaseName.set(`${get(selectedYear)}-expenses`);

export {allExpenses, expenses, expensesSum, expensesDatabaseName}