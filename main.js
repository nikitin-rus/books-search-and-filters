import FiltersCard from "./src/custom-elements/filters-card";
import MyButton from "./src/custom-elements/my-button";
import MySelect from "./src/custom-elements/my-select";
import SearchForm from "./src/custom-elements/search-form";
import { logCustomElementState } from "./src/logging";
import { getBooksMatching } from "./src/service-imitation";
import { Counter } from "./src/counter";

const constructors = [MyButton, MySelect, SearchForm, FiltersCard];

for (const ctor of constructors) {
    customElements.define(ctor.elementName, ctor);
    customElements.whenDefined(ctor.elementName).then(ctor => logCustomElementState(ctor.elementName, "Defined"));
}

const searchFormNode = document.querySelector('.search-controls__search-form');
const categoryFiltersNode = document.querySelector('.filters-cards__card_category');
const genreFiltersNode = document.querySelector('.filters-cards__card_genre');
const authorFiltersNode = document.querySelector('.filters-cards__card_author');
const formatFiltersNode = document.querySelector('.filters-cards__card_format');
const publisherFiltersNode = document.querySelector('.filters-cards__card_publisher');

searchFormNode.addEventListener('search', (e) => {
    const books = getBooksMatching(e.target.querySelector('input').value);

    const categoryCounter = Counter.create(books.map(book => book.category));
    const genreCounter = Counter.create(books.map(book => book.genre));
    const authorCounter = Counter.create(books.map(book => book.author));
    const formatCounter = Counter.create(books.map(book => book.format));
    const publisherCounter = Counter.create(books.map(book => book.publisher));

    categoryFiltersNode.updateCheckboxes(categoryCounter);
    genreFiltersNode.updateCheckboxes(genreCounter);
    authorFiltersNode.updateCheckboxes(authorCounter);
    formatFiltersNode.updateCheckboxes(formatCounter);
    publisherFiltersNode.updateCheckboxes(publisherCounter);
});