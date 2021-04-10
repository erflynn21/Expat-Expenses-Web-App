import {writable, get} from 'svelte/store';
import { selectedYear } from './datesStore';

let allIncomes = writable([]);
let incomes = writable([]);
let incomesSum = writable(0);
let incomesDatabaseName = writable(null);
incomesDatabaseName.set(`${get(selectedYear)}-incomes`);

export {allIncomes, incomes, incomesSum, incomesDatabaseName}