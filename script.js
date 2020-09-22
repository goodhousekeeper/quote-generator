/*
Get a quote via API - https://forismatic.com/en/api/
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
const errorMessage = document.getElementById("error-message");
const errorCounterMax = 10;

let errorCounter = 0;
let apiLanguageSelector = "en";

function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoader() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

function changeLanguage() {
    if (languageSwitch.checked) {
        /* English enabled */
        apiLanguageSelector = "en";
        quoteContainer.classList.add("en-lang");
        quoteContainer.classList.remove("ru-lang");
    } else {
        /* Russian enabled */
        apiLanguageSelector = "ru";
        quoteContainer.classList.remove("en-lang");
        quoteContainer.classList.add("ru-lang");        
    }
}

function getQuote() {
    const proxyURL = "https://wg-cors-anywhere.herokuapp.com/";
    const apiURL = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=${apiLanguageSelector}&format=json`;
    showLoader();
    fetch(proxyURL + apiURL)
        .then(function(response) {
           return response.json();
        })
        .then(function(data) {
            /** @namespace data.quoteText **/
            /** @namespace data.quoteAuthor **/
            quoteText.innerText = data.quoteText;
            quoteAuthor.innerText = data.quoteAuthor;
            if (data.quoteAuthor === "") {
                quoteAuthor.classList.add("unknown");
            } else {
                quoteAuthor.classList.remove("unknown");
            }
            if (data.quoteText.length > maxQuoteLength) {
                quoteMark.classList.add(longQuoteMarkClass);
                quoteText.classList.add(longQuoteClass);
            } else {
                quoteMark.classList.remove(longQuoteMarkClass);
                quoteText.classList.remove(longQuoteClass);
            }
            errorCounter = 0;
            errorMessage.hidden = true;
            hideLoader();
         })        
        .catch(function() {
            errorCounter +=1;
            if (errorCounter > errorCounterMax) {
                errorCounter = 0;
                errorMessage.hidden = false;
                hideLoader();
            } else {
                getQuote();
            }
        });
}

/* Set up event listeners */
newQuoteBtn.addEventListener("click", getQuote);
languageSwitch.addEventListener("change", changeLanguage)

/* Get first quote */
newQuoteBtn.click();
