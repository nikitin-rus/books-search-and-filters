import { getBooksMatching } from "./src/service-imitation";
import { Counter } from "./src/counter";
import { createBookCoverHTML } from "./src/components/book-cover";

const sidebar = document.querySelector('.sidebar');
const mySelectNode = document.querySelector('.main__my-select');
const bookCoversContainer = document.querySelector('.main__book-covers');
const filtersCardsContainer = document.querySelector('.sidebar__filters-cards');
const filtersCardsNodes = Array.from(filtersCardsContainer.querySelectorAll('.sidebar__filters-card'));
const clearFiltersButtonNode = document.querySelector('.sidebar__my-button');
const searchFormNode = document.querySelector('.main__search-form');
const noResultsMessage = document.querySelector('.main__no-results-message');

let books = [];

function updateBookCovers(books) {
    bookCoversContainer.innerHTML = "";
    books.forEach(book => bookCoversContainer.insertAdjacentHTML('beforeend', createBookCoverHTML(book.fileName)));
}

searchFormNode.addEventListener('search', (e) => {
    books = getBooksMatching(e.target.querySelector('input').value);

    filtersCardsNodes.forEach(filtersCardNode => {
        const propertyName = filtersCardNode.getAttribute('property');
        const counter = Counter.create(books.map(book => book[propertyName]));
        filtersCardNode.updateCheckboxes(counter);
    });

    sortByYear(books);
    updateBookCovers(books);

    const booksEmpty = !books.length;

    noResultsMessage.setAttribute('is-hidden', !booksEmpty);
    mySelectNode.setAttribute('is-hidden', booksEmpty);
    sidebar.setAttribute('is-hidden', booksEmpty);
});

// TODO: Придумать, как избежать перезагрузку уже отображенных элементов.
mySelectNode.addEventListener('selection-changed', (e) => {
    const selectedOptionIndex = e.target.getAttribute("selected");
    const value = e.target.options[selectedOptionIndex].getAttribute("value");

    switch (value) {
        case "year":
            sortByYear(books);
            break;
        case "series":
            sortBySeries(books);
            break;
        default:
            return;
    }
    updateBookCovers(books);
});

const sortByYear = (books) => books.sort((a, b) => a.yearPublished - b.yearPublished);
const sortBySeries = (books) => books.sort((a, b) => a.series.localeCompare(b.series));

filtersCardsContainer.addEventListener("selection-changed", (e) => {
    let displayedBooks = books;

    filtersCardsNodes.forEach(filtersCardNode => {
        const textNodes = filtersCardNode.querySelectorAll('.checkbox__browser-checkbox:checked + .checkbox__items-left .checkbox__text');
        const values = Array.from(textNodes).map(textNode => textNode.textContent);

        if (values.length != 0) {
            displayedBooks = displayedBooks.filter(book => values.includes(book[filtersCardNode.getAttribute("property")]));
        }
    });

    updateBookCovers(displayedBooks);
});

clearFiltersButtonNode.addEventListener('click', (e) => {
    const checkedCheckboxes = Array.from(filtersCardsContainer.querySelectorAll('.checkbox__browser-checkbox:checked'));
    checkedCheckboxes.forEach(checkbox => checkbox.checked = false);

    updateBookCovers(books);
});