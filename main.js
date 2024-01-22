import { Counter } from "./src/counter";
import { createBookCardHTML } from "./src/components/book-card";
import Service from "./src/service-imitation";
import createPopupOverlayHTML from "./src/components/popup/popup-overlay";
import createBookInfoPopupHTML from "./src/components/popup/book-info-popup";

let myFilters = {};
let myGetBooksFunction;
let mySortFunction = sortByYear;

//#region Functions

/** @param {object[]} books */
function updateBookCards(books) {
    let cardsHTML = "";
    books.forEach(book => {
        cardsHTML += createBookCardHTML(book);
    });

    document.querySelector('.main-page__cards').innerHTML = cardsHTML;
}

/** @param {string} popupHTML */
function displayPopup(popupHTML) {
    document.body
        .insertAdjacentHTML(`beforeend`, createPopupOverlayHTML(popupHTML));
}

/** 
 * @param {object} a 
 * @param {object} b 
 */
function sortByYear(a, b) { return a.yearPublished - b.yearPublished; };

/** 
 * @param {object} a 
 * @param {object} b 
 */
function sortBySeries(a, b) { return a.series.localeCompare(b.series); };

//#endregion

//#region Event listeners

window.addEventListener('load', (e) => loadEventHandler(e));

document.querySelector('.main-page__search-form')
    .addEventListener('search', (e) => searchEventHandler(e));

document.querySelector('.main-page__my-select')
    .addEventListener('selection-changed', (e) => selectEventHandler(e));

document.querySelector('.main-page__pagination')
    .addEventListener('choose', (e) => chooseEventHandler(e));

document.querySelector('.main-page__filters')
    .addEventListener('selection-changed', (e) => filtersEventHandler(e));

document.querySelector('.main-page__my-button')
    .addEventListener('click', (e) => clearEventHandler(e));

document.querySelector('.main-page__cards')
    .addEventListener('click', (e) => cardsClickEventHandler(e));

//#endregion

//#region Event handlers

/** @param {Event} */
function loadEventHandler(e) {
    document.querySelector('.main-page')
        .setAttribute('state', 'start');
}

/** @param {Event} e */
function searchEventHandler(e) {
    const input = e.target.querySelector('input').value;

    const { pages, filters, getBooks } = Service.getData(input, 8, mySortFunction, myFilters);
    myGetBooksFunction = getBooks;

    const books = getBooks(1);

    updateBookCards(books);

    for (const prop in filters) {
        document.querySelector(`.filters-card[property=${prop}]`)
            .updateCheckboxes(Counter.create(filters[prop]));
    }

    document.querySelector('.main-page__pagination')
        .setAttribute('pages', pages);

    document.querySelector('.main-page')
        .setAttribute('state', books.length ?
            'results' : 'error');
}

/** @param {Event} e */
function selectEventHandler(e) {
    const index = e.target.getAttribute('selected');
    const value = e.target.options[index].getAttribute('value');
    const input = document.querySelector('.main-page__search-form')
        .getAttribute('value');

    switch (value) {
        case 'year':
            mySortFunction = sortByYear;
            break;
        case 'series':
            mySortFunction = sortBySeries;
            break;
        default:
            return;
    }

    const { getBooks } = Service.getData(input, 8, mySortFunction, myFilters);
    myGetBooksFunction = getBooks;

    updateBookCards(getBooks(1));
}

/** @param {CustomEvent} e */
function chooseEventHandler(e) {
    const books = myGetBooksFunction(e.detail.value);
    updateBookCards(books);
}

/** @param {Event} e */
function filtersEventHandler(e) {
    const cards = document.querySelectorAll('.main-page__filters-card');

    // Объект: ключ - название свойства книги, 
    // значение - выбранные значения свойства 
    // в соответствующей карточке фильтров
    const filters = {};
    cards.forEach(card => {
        const selector = '.checkbox__browser-checkbox:checked + .checkbox__items-left .checkbox__text';
        const values = Array.from(card.querySelectorAll(selector))
            .map(textNode => {
                return textNode.textContent;
            });

        const prop = card.getAttribute('property');
        filters[prop] = values;
    });

    const value = document.querySelector('.main-page__search-form')
        .getAttribute('value');

    const { pages, getBooks } = Service.getData(value, 8, mySortFunction, filters);

    myFilters = filters
    myGetBooksFunction = getBooks;

    updateBookCards(getBooks(1));

    document.querySelector('.main-page__pagination')
        .setAttribute('pages', pages);
}

/** @param {MouseEvent} e */
function clearEventHandler(e) {
    const selector = '.main-page__filters-card .checkbox__browser-checkbox:checked';
    const value = document.querySelector('.main-page__search-form')
        .getAttribute('value');

    Array.from(document.querySelectorAll(selector))
        .forEach(checkbox => {
            checkbox.checked = false;
        });

    myFilters = {};
    const { pages, getBooks } = Service.getData(value, 8, mySortFunction, myFilters);

    myGetBooksFunction = getBooks;

    document.querySelector('.main-page__pagination')
        .setAttribute('pages', pages);

    updateBookCards(getBooks(1));
}

/** @param {MouseEvent} e */
function cardsClickEventHandler(e) {
    const cards = document.querySelectorAll('.book-card');
    const pagination = document.querySelector('.my-pagination');

    const index = Array.from(cards).indexOf(e.target);
    const page = +pagination.getAttribute('chosen');

    const books = myGetBooksFunction(page);
    const popupHTML = createBookInfoPopupHTML(books[index]);

    displayPopup(popupHTML);

    const btn = document.querySelector('.book-info-popup__close-btn');

    btn.addEventListener('click', (e) => cardBtnCloseClick(e));
}

/** @param {MouseEvent} e */
function cardBtnCloseClick(e) {
    const popup = document.body.querySelector('.popup-overlay');
    document.body.removeChild(popup);
}

//#endregion