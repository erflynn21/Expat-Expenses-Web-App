import { startDate } from '$lib/stores/datesStore';
import {get} from 'svelte/store';
import {baseCurrency} from '$lib/stores/currenciesStore';

const convert = async (item) => {
    console.log(item);
    item.originalAmount = item.amount;
    item.originalCurrency = item.currency;
    console.log(item);
    // update the date with better logic
    // let date = get(startDate);
    let url = `https://api.exchangerate.host/convert?from=${get(baseCurrency)}&to=${item.originalCurrency}&date=${item.date}`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let exchangeRate = Number(JSON.stringify(data.info.rate));
    console.log(exchangeRate);
    item.amount = Number(
        (item.originalAmount / exchangeRate).toFixed(2)
    );
    item.currency = get(baseCurrency);
    console.log(item);
    return(item);
};

export {convert}