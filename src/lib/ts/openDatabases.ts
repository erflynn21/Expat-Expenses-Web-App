import { openBudgetsDatabase } from "./budgets";
import { openCurrenciesDatabase } from "./currencies";
import { openExpensesDatabase } from "./expenses";
import { openIncomesDatabase } from "./incomes";
import { openMonthlyBudgetsDatabase } from "./monthlyBudgets";
import { openMonthlyExpensesDatabase } from "./monthlyExpenses";
import { openMonthlyIncomesDatabase } from "./monthlyIncomes";
import {allDatabases} from '$lib/stores/userStore';
// import {get} from 'svelte/store'

const openDatabases = () => {
    try {
        openCurrenciesDatabase();
        openMonthlyBudgetsDatabase().then(() => {
            openBudgetsDatabase()
        });
        openExpensesDatabase().then(() => {
            openMonthlyExpensesDatabase();
        });
        openIncomesDatabase().then(() => {
            openMonthlyIncomesDatabase();
        });
        getAllDatabases();
    } catch (e) {
        return e
    }
}

const getAllDatabases = () => {
    // @ts-ignore
    const userbase = window.userbase;
    userbase.getDatabases().then((databases) => {
        allDatabases.set(databases);
        // console.log(get(allDatabases));
    }).catch((e) => console.error(e))
}

export {openDatabases}