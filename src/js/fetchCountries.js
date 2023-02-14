import { Notify } from "notiflix";
import renderCountryList from "./renderCountryList";
import renderCountryInfo from "./renderCountryInfo";

//Get Dom Elements
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

// Handle API call 
export default function fetchCountries(name) {
// REST Countries API    
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`  
    fetch(url)
        .then(response => {
            if (name === '') {
            countryInfo.innerHTML = "";
            countryList.innerHTML = ""
            }
            if (!response.ok) {
                manageErrors(response);
            }
            return response.json();
        })  
           
        .then(countries => {
          const totalCountries = countries.length
//Search too big... Huge object returned notiflix library response clear html          
          if (totalCountries > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
            countryInfo.innerHTML = "";
            countryList.innerHTML = "";
            return;
          }
// Search response between 2 and 7 First render html for list of countries with flags. Then clear html from country info in case of deletions          
            if (totalCountries >= 2 && totalCountries <= 10) {
                renderCountryList(countries);
                countryInfo.innerHTML = "";
                return
            }
// One match found render html of country info and clear html from countrty search            
          if (totalCountries == 1) {
            renderCountryInfo(countries);
            countryList.innerHTML = "";
            return
          }
        })
    
      .catch(error => console.log("ERROR" + error));
};



//manage errors on FETCH
function manageErrors(response) { 
    if (!response.ok) { 
        if (response.status == 404) {
              Notify.failure('Oops, there is no country with that name')   
              throw Error(response.statusText); 
            }
        return;
     }
    return response;
}

//countries.name == input.value