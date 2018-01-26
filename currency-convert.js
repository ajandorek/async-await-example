const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const res = await axios.get(`https://api.fixer.io/latest?base=${from}`);
    const rate = res.data.rates[to];

    if (rate) {
      return rate
    } else {
      throw new Error();
    }
  } catch(e) {
    throw new Error(`Unable to get exchnage rate for ${to} and ${from}`)
  }
  
}

const getCountries = async (currencyCode) => {
  try {
    const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return res.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
  });
};

const convertCurrencyAwait = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);

  const exchangedAmount = amount * rate;

  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
}
convertCurrencyAwait('USD', 'EUR', 100).then((rate) => {
  console.log(rate);
}).catch((e) => {
  console.log(e.message);
});