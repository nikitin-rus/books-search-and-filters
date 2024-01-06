import FiltersCard from "./src/custom-elements/filters-card";
import MyButton from "./src/custom-elements/my-button";
import MySelect from "./src/custom-elements/my-select";
import SearchForm from "./src/custom-elements/search-form";
import { logCustomElementState } from "./src/logging";
import { getBooksMatching } from "./src/service-imitation";
import { Counter } from "./src/counter";
import { createBookCoverHTML } from "./src/components/book-cover";

const constructors = [MyButton, MySelect, SearchForm, FiltersCard];

for (const ctor of constructors) {
    customElements.define(ctor.elementName, ctor);
    customElements.whenDefined(ctor.elementName).then(ctor => logCustomElementState(ctor.elementName, "Defined"));
}

const searchFormNode = document.querySelector('.main__search-form');
const bookCoversNode = document.querySelector('.main__book-covers');
const filtersCardsNode = document.querySelector('.sidebar__filters-cards');
const filtersCardsNodes = Array.from(filtersCardsNode.querySelectorAll('.sidebar__filters-card'));
const clearFiltersButtonNode = document.querySelector('.sidebar__my-button');

let books = [];

function updateBookCovers(books) {
    bookCoversNode.innerHTML = "";
    books.forEach(book => bookCoversNode.insertAdjacentHTML('beforeend', createBookCoverHTML(book.fileName)));
}

searchFormNode.addEventListener('search', (e) => {
    books = getBooksMatching(e.target.querySelector('input').value);

    filtersCardsNodes.forEach(filtersCardNode => {
        const propertyName = filtersCardNode.getAttribute('property');
        const counter = Counter.create(books.map(book => book[propertyName]));
        filtersCardNode.updateCheckboxes(counter);
    });
    
    updateBookCovers(books);
});

filtersCardsNode.addEventListener("selection-changed", (e) => {
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
    const checkedCheckboxes = Array.from(filtersCardsNode.querySelectorAll('.checkbox__browser-checkbox:checked'));
    checkedCheckboxes.forEach(checkbox => checkbox.checked = false);

    updateBookCovers(books);
});