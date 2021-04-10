import {get} from 'svelte/store';
import { allExpenses, expensesDatabaseName, expenses, expensesSum } from '$lib/stores/expensesStore';
import { selectedMonth, selectedYear } from '$lib/stores/datesStore';

const openExpensesDatabase = async () => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.openDatabase({
            databaseName: get(expensesDatabaseName), changeHandler: function (items) {
                allExpenses.set(items);
                setExpenses(items);
            }
        });
    } catch (e) {
        return console.log(e);
    }
}

const setExpenses = (items) => {
    // sets the expenses based on date and timestamp
    let expensesForMonth = [];
    items.forEach(item => {
        const date = item.item.date;
        const year = Number(date.slice(0,4));
        const month = Number(date.slice(5, 7));
        if (year === get(selectedYear) && month === get(selectedMonth)) {
            expensesForMonth =[...expensesForMonth, item];
        }
    })
    let a = expensesForMonth;
    a.sort(function (a, b) {
        return (
            // @ts-ignore
            new Date(b.item.date) - new Date(a.item.date) ||
            // @ts-ignore
            new Date(b.createdBy.timestamp) -
            // @ts-ignore
            new Date(a.createdBy.timestamp)
        );
    });
    expenses.set(a);

    // sets the expenses sum
    let totalExpenses = [];
    get(expenses).forEach((expense) => {
        totalExpenses = [...totalExpenses, expense.item.amount];
    });
    expensesSum.set(totalExpenses.reduce(function (a_2, b_1) {
        const sum = a_2 + b_1;
        const trimmed = Number(sum.toFixed(2));
        return trimmed;
    }, 0));
}

const addExpense = (expense) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.insertItem({ databaseName: get(expensesDatabaseName), item: expense });
    } catch (e) {
        return e;
    }
    
};

const updateExpense = (expense, expenseId) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.updateItem({ databaseName: get(expensesDatabaseName), item: expense, itemId: expenseId });
    } catch (e) {
        return e;
    }
     
};

const deleteExpense = (expenseId) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.deleteItem({ databaseName: get(expensesDatabaseName), itemId: expenseId });
    } catch (e) {
        return e;
    }
}

export {openExpensesDatabase, addExpense, updateExpense, deleteExpense}