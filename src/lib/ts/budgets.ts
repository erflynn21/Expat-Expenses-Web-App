import {get} from 'svelte/store';
import {budgets, budgetsSum, categories} from '$lib/stores/budgetsStore';
import {monthlyBudgets} from '$lib/stores/monthlyBudgetsStore';
import {baseCurrency} from '$lib/stores/currenciesStore';
import { convert } from './convert';
import { addMonthlyBudget } from './monthlyBudgets';

const databaseName = 'budgets'

const openBudgetsDatabase = () => {
    // @ts-ignore
    const userbase = window.userbase;
    userbase.openDatabase({ databaseName, changeHandler: function (items) {
        budgets.set(items);

        // sets the budgets sum
        let totalBudgets = [];
        get(budgets).forEach((budget) => {
            totalBudgets = [...totalBudgets, budget.item.amount];
        });
        budgetsSum.set(totalBudgets.reduce(function (a, b) {
            const sum = a + b;
            const trimmed = Number(sum.toFixed(2));
            return trimmed;
        }, 0));

        // sets the categories
        setCategories();

        // sets monthly budgets
        setMonthlyBudgets(items);
    }})
    .catch((e) => console.log(e));
    ;
}

const setCategories = () => {
    if (get(budgets).length > 0) {
        let budgetCategories = [];
        get(budgets).forEach((budget) => {
            budgetCategories = [...budgetCategories, budget.item.category];
        });
        categories.set(budgetCategories);
    }
}

const setMonthlyBudgets = async (budgets) => {
    budgets.forEach(async budget => {
        let monthlyBudget = get(monthlyBudgets).filter((monthlybudget) => monthlybudget.item.category === budget.item.category);
        if (monthlyBudget.length == 0) {
            let newMonthlyBudget = {
                amount: budget.item.amount,
                category: budget.item.category,
                currency: budget.item.currency,
            }

            if (newMonthlyBudget.currency !== get(baseCurrency)) {
                await convert(newMonthlyBudget);
            }
            await addMonthlyBudget(newMonthlyBudget);
        } else {
            return;
        }
    });
}

const addBudget = (budget) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.insertItem({ databaseName, item: budget });
    } catch (e) {
        return e;
    }
};

const updateBudget = (budget, budgetId) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.updateItem({ databaseName, item: budget, itemId: budgetId });
    } catch (e) {
        return e;
    }
};

const deleteBudget = (budgetId) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.deleteItem({ databaseName, itemId: budgetId });
    } catch (e) {
        return e;
    }
}

export {openBudgetsDatabase, addBudget, updateBudget, deleteBudget}