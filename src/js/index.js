import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
import renderCountryList from './renderCountryList';
import renderCountryInfo from './renderCountryInfo';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const countrySearch = document.querySelector('input#search-box');
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");


// function to manage typing changes and call fetch function to api
const handleInputChange = e => {
  let input = e.target.value.trim();
  const response = fetchCountries(input);
  };

// event listener with lodash denounce for more limited API calls
countrySearch.addEventListener('input', debounce(handleInputChange, DEBOUNCE_DELAY, {
      'leading': false,
      'trailing': true
}));