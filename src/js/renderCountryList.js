export default renderCountryList = countries => {
  const countryList = document.querySelector(".country-list");

  const markup = countries
        .map(country => {
        
            const {
                name: { official },
                flags: { svg },
            } = country;
          
            return (countryList.innerHTML =
              `<li class="country-list-item">
                <img class= "country-list__flag" src="${svg}" alt="Icon of ${official}'s flag." width="30px" height="30px">
                <h2 class= "country-list__heading">${official}</h2>
              </li>`);
        })
        .join("");
    countryList.innerHTML = markup;
};  