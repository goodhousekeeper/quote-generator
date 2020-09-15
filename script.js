
/*
Get a quote via forismatic API - https://forismatic.com/en/api/
*/

function getQuote() {
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    fetch(proxyURL + apiURL)
        .then(function(response) {
           return response.json();
        })
        .then(function(quote) {
            const quoteText = quote.quoteText;
            const quoteAuthor = quote.quoteAuthor;
         })        
        .catch(function(error) {
            console.info("Something goes wrong...", error, ". Retry");
            getQuote();
        });
}

getQuote();