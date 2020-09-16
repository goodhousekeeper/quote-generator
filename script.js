
/*
Get a quote via forismatic API - https://forismatic.com/en/api/
*/

const quoteContainer = document.getElementById("quote-container");
const quoteMark = document.getElementById("quote-mark");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const maxQuoteLength = 120;
const longQuoteClass = "long-quote";
const longQuoteMarkClass = "long-quote-mark";

function quoteLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function quoteLoaded() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

function getQuote() {
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    quoteLoading();
    fetch(proxyURL + apiURL)
        .then(function(response) {
           return response.json();
        })
        .then(function(data) {
            quoteText.innerText = data.quoteText;
            quoteAuthor.innerText = data.quoteAuthor === "" ? "Unknown" : data.quoteAuthor;
            if (data.quoteText.length > maxQuoteLength) {
                quoteMark.classList.add(longQuoteMarkClass);
                quoteText.classList.add(longQuoteClass);
            } else {
                quoteMark.classList.remove(longQuoteMarkClass);
                quoteText.classList.remove(longQuoteClass);
            }
            quoteLoaded();
         })        
        .catch(function(error) {
            console.info("Something goes wrong...", error, ". Retry");
            //getQuote();
        });
}

newQuoteBtn.addEventListener("click", getQuote);


//newQuoteBtn.click();
