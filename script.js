
/*
Get a quote via forismatic API - https://forismatic.com/en/api/
*/

const quoteContainer = document.getElementById("quote-container");
const quoteMark = document.getElementById("quote-mark");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const maxQuoteLength = 120;
const longQuoteClass = "long-quote";
const longQuoteMarkClass = "long-quote-mark";

function getQuote() {
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
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
            
         })        
        .catch(function(error) {
            console.info("Something goes wrong...", error, ". Retry");
            getQuote();
        });
}

getQuote();