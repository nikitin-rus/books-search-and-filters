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
const filtersCardsNodes = document.querySelectorAll('.sidebar__filters-cards .filters-card');

searchFormNode.addEventListener('search', (e) => {
    bookCoversNode.innerHTML = "";

    const books = getBooksMatching(e.target.querySelector('input').value);

    Array.from(filtersCardsNodes).forEach(filtersCardNode => {
        const propertyName = filtersCardNode.getAttribute('property');
        const counter = Counter.create(books.map(book => book[propertyName]));

        filtersCardNode.updateCheckboxes(counter);
    });

    books.forEach(book => bookCoversNode.insertAdjacentHTML('beforeend', createBookCoverHTML(book.fileName)));
});