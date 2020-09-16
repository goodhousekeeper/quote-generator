
/*
Get a quote via forismatic API - https://forismatic.com/en/api/
*/

const quoteContainer = document.getElementById("quote-container");
const quoteMark = document.getElementById("quote-mark");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const languageSwitch = document.getElementById("myonoffswitch");
const loader = document.getElementById("loader");
const maxQuoteLength = 120;
const longQuoteClass = "long-quote";
const longQuoteMarkClass = "long-quote-mark";
let apiLanguageSelector = "en";

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

function changeLanguage() {
    if (languageSwitch.checked) {
        /* English enabled */
        newQuoteBtn.innerText = "New Quote";
        apiLanguageSelector = "en";
    } else {
        /* Russian enabled */
        newQuoteBtn.innerText = "Ещё цитата";
        apiLanguageSelector = "ru";
    }
    getQuote();
}

function getQuote() {
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiURL = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=${apiLanguageSelector}&format=json`;
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

/* Set up event listeners */
newQuoteBtn.addEventListener("click", getQuote);
languageSwitch.addEventListener("change", changeLanguage)

/* Get first quote */
newQuoteBtn.click();
