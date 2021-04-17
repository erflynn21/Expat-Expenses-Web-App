import {get} from 'svelte/store';
import {currencies, baseCurrency, currencyOptions, baseCurrencySymbol, allCurrencies} from '$lib/stores/currenciesStore';
import {currencyDict} from '$lib/stores/dictionariesStore';
import { userbase } from '$lib/stores/userbaseStore';

const databaseName = 'currencies';

const openCurrenciesDatabase = () => {
    userbase.openDatabase({ databaseName, changeHandler: function (items) {
        currencies.set(items);
        setCurrencies();
    }})
    .catch((e) => console.log(e))
}

const setCurrencies = () => {
    if (get(currencies).length > 0) {
        baseCurrency.set(get(currencies)[0].item.newBaseCurrency);
        currencyOptions.set(get(currencies)[0].item.newCurrencyOptions);
        baseCurrencySymbol.set(currencyDict[get(baseCurrency)]);

        let everyCurrency = [];
        everyCurrency = [...everyCurrency, get(baseCurrency)];
        // @ts-ignore
        get(currencyOptions).forEach(currencyOption => {
            everyCurrency = [...everyCurrency, currencyOption];
        });
        allCurrencies.set(everyCurrency);
    } else {
        return;
    }
}

const addCurrencies = (currencies) => {
    try {
        return userbase.insertItem({ databaseName, item: currencies }).then(() => {
            setCurrencies();
        });    
    } catch (e) {
        return e
    }
    
};

const updateCurrencies = async (updatedCurrencies, updatedCurrenciesId) => {
    try {
        return userbase.updateItem({ databaseName, item: updatedCurrencies, itemId: updatedCurrenciesId }).then(() => {
            setCurrencies();
        });
    } catch (e) {
        return e;
    }
};

export {openCurrenciesDatabase, addCurrencies, updateCurrencies}