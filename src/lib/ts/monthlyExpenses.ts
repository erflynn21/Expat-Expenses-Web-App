import {get} from 'svelte/store';
import { expenses } from "$lib/stores/expensesStore";
import { monthlyExpenses } from "$lib/stores/monthlyExpensesStore";
import { currentDate, selectedMonth, selectedYear } from '$lib/stores/datesStore';
import { convert } from './convert';
import { baseCurrency } from '$lib/stores/currenciesStore';
import { addExpense } from './expenses';

const databaseName = 'monthlyExpenses'

const openMonthlyExpensesDatabase = () => {
    // @ts-ignore
    const userbase = window.userbase;
    userbase.openDatabase({ databaseName, changeHandler: function (items) {
        monthlyExpenses.set(items);

        checkRecurringExpenses(items);
    }})
    .catch((e) => console.log(e));
}

const checkRecurringExpenses = async (monthlyExpenses) => {
    let newExpenseFromMonthly;
    monthlyExpenses.forEach(async monthlyExpense => {
        let result = get(expenses).filter((expense) => (expense.item.title === monthlyExpense.item.title));
        if (result.length == 0 && Number(monthlyExpense.item.recurringDate) <= get(currentDate)) {
            if (get(selectedMonth) < 10) {
                newExpenseFromMonthly = {
                    title: monthlyExpense.item.title,
                    amount: monthlyExpense.item.amount,
                    category: monthlyExpense.item.category,
                    date: get(selectedYear) + '-0' + get(selectedMonth) + '-' + monthlyExpense.item.recurringDate,
                    currency: monthlyExpense.item.currency,
                    originalAmount: null,
                    originalCurrency: null,
                }
            } else {
                newExpenseFromMonthly = {
                    title: monthlyExpense.item.title,
                    amount: monthlyExpense.item.amount,
                    category: monthlyExpense.item.category,
                    date: get(selectedYear) + '-' + get(selectedMonth) + '-' + monthlyExpense.item.recurringDate,
                    currency: monthlyExpense.item.currency,
                    originalAmount: null,
                    originalCurrency: null,
                }
            }
            

            if (newExpenseFromMonthly.currency !== get(baseCurrency)) {
                await convert(newExpenseFromMonthly);
            }
            addExpense(newExpenseFromMonthly);
        } else {
            return;
        }
    });
};

const addMonthlyExpense = (monthlyExpense) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.insertItem({ databaseName, item: monthlyExpense });
    } catch (e) {
        return e;
    }
};

const updateMonthlyExpense = (monthlyExpense, monthlyExpenseId) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.updateItem({ databaseName, item: monthlyExpense, itemId: monthlyExpenseId });
    } catch (e) {
        return e;
    }
};

const deleteMonthlyExpense = (monthlyExpenseId) => {
    // @ts-ignore
    const userbase = window.userbase;
    try {
        return userbase.deleteItem({ databaseName, itemId: monthlyExpenseId });
    } catch (e) {
        return e;
    }
}

export {openMonthlyExpensesDatabase, addMonthlyExpense, updateMonthlyExpense, deleteMonthlyExpense}