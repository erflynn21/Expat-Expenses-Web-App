import {get} from 'svelte/store';
import {monthlyBudgets, monthlyBudgetsDatabaseName, monthlyBudgetsSum} from '$lib/stores/monthlyBudgetsStore';

const openMonthlyBudgetsDatabase = () => {
    // @ts-ignore
    const userbase = window.userbase;
    return userbase.openDatabase({ databaseName: get(monthlyBudgetsDatabaseName), changeHandler: function (items) {
        monthlyBudgets.set(items);
        // sets the monthly budgets total
        let totalMonthlyBudgets = [];
        get(monthlyBudgets).forEach((monthlyBudget) => {
            totalMonthlyBudgets = [...totalMonthlyBudgets, monthlyBudget.item.amount];
        });
        monthlyBudgetsSum.set(totalMonthlyBudgets.reduce(function (a, b) {
            const sum = a + b;
            const trimmed = Number(sum.toFixed(2));
            return trimmed;
        }, 0));
    }})
    .catch((e) => console.log(e));
}

const addMonthlyBudget = (monthlyBudget) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.insertItem({ databaseName: get(monthlyBudgetsDatabaseName), item: monthlyBudget });
    } catch (e) {
        return e;
    }
};

const updateMonthlyBudget = (monthlyBudget, monthlyBudgetId) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.updateItem({ databaseName: get(monthlyBudgetsDatabaseName), item: monthlyBudget, itemId: monthlyBudgetId });
    } catch (e) {
        return e;
    }
};

const deleteMonthlyBudget = (monthlyBudgetId) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.deleteItem({ databaseName: get(monthlyBudgetsDatabaseName), itemId: monthlyBudgetId });
    } catch (e) {
        return e;
    }
};

export {openMonthlyBudgetsDatabase, addMonthlyBudget, updateMonthlyBudget, deleteMonthlyBudget}