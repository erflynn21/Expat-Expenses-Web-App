import { startDate } from '$lib/stores/datesStore';
import {get} from 'svelte/store';
import {baseCurrency} from '$lib/stores/currenciesStore';

const convert = async (item) => {
    item.originalAmount = item.amount;
    item.originalCurrency = item.currency;
    let date = get(startDate);
    let url = `https://api.exchangeratesapi.io/${date}?base=${get(baseCurrency)}&symbols=${item.originalCurrency}`;
    let response = await fetch(url);
    let data = await response.json();
    let rates = JSON.stringify(data.rates);
    let exchangeRate = Number(rates.replace(/[^\d.-]/g, ''));
    item.amount = Number(
        (item.originalAmount / exchangeRate).toFixed(2)
    );
    item.currency = get(baseCurrency);
};

export {convert}