import { getBooksMatching } from "./src/service-imitation";
import { Counter } from "./src/counter";
import { createBookCardHTML } from "./src/components/book-card";

const mySelectNode = document.querySelector('.main-page__my-select');
const bookCardsContainer = document.querySelector('.main-page__cards');
const filtersCardsContainer = document.querySelector('.main-page__filters');
const filtersCardsNodes = Array.from(filtersCardsContainer.querySelectorAll('.main-page__filters-card'));
const clearFiltersButtonNode = document.querySelector('.main-page__my-button');
const searchFormNode = document.querySelector('.main-page__search-form');

window.onload = (e) => {
    document.querySelector('.main-page')
        .setAttribute('state', 'start');
}

let covers = [];

function updateBookCards(covers) {
    bookCardsContainer.innerHTML = "";

    covers.forEach(cover => {
        if (cover.displayed) {
            bookCardsContainer.insertAdjacentHTML('beforeend', createBookCardHTML(cover.props));
        }
    });
}

searchFormNode.addEventListener('search', (e) => {
    const books = getBooksMatching(e.target.querySelector('input').value);

    covers = books.map(book => { return { props: book, displayed: true } });

    filtersCardsNodes.forEach(filtersCardNode => {
        const propertyName = filtersCardNode.getAttribute('property');
        const counter = Counter.create(covers.map(cover => cover.props[propertyName]));
        filtersCardNode.updateCheckboxes(counter);
    });

    sortByYear(covers);
    updateBookCards(covers);

    document.querySelector('.main-page')
        .setAttribute('state', books.length ?
            'results' : 'error');
});

// TODO: Придумать, как избежать перезагрузку уже отображенных элементов.
mySelectNode.addEventListener('selection-changed', (e) => {
    const selectedOptionIndex = e.target.getAttribute("selected");
    const value = e.target.options[selectedOptionIndex].getAttribute("value");

    switch (value) {
        case "year":
            sortByYear(covers);
            break;
        case "series":
            sortBySeries(covers);
            break;
        default:
            return;
    }

    updateBookCards(covers);
});

const sortByYear = (covers) => covers.sort((a, b) => a.props.yearPublished - b.props.yearPublished);
const sortBySeries = (covers) => covers.sort((a, b) => a.props.series.localeCompare(b.props.series));

document.querySelectorAll(".filters-card").forEach(card => {
    card.addEventListener("selection-changed", (e) => {

        // 1. Создать объект поле - массив выбранных значений

        let conditions = {};
        document.querySelectorAll('.filters-card').forEach(card => {
            const propertyName = card.getAttribute("property");
            const textNodes = card.querySelectorAll('.checkbox__browser-checkbox:checked + .checkbox__items-left .checkbox__text');
            const values = Array.from(textNodes).map(textNode => textNode.textContent);
            conditions[propertyName] = values;
            console.log(conditions);
        });

        // 2. Отображать только те книги, которые отвечают всем условиям

        covers.forEach(cover => {
            for (const prop in cover.props) {
                if (!conditions[prop]) continue; // Если свойство не фильтруется
                if (!conditions[prop].length) continue; // Если для свойства нет условий (ничего не выбрано в соот. карточке фильтров)
                if (!conditions[prop].includes(cover.props[prop])) {
                    cover.displayed = false;
                    return; // Выход из внешнего цикла
                }
            }
            cover.displayed = true;
        });

        updateBookCards(covers);
    });
});

clearFiltersButtonNode.addEventListener('click', (e) => {
    const checkedCheckboxes = Array.from(filtersCardsContainer.querySelectorAll('.checkbox__browser-checkbox:checked'));
    checkedCheckboxes.forEach(checkbox => checkbox.checked = false);
    covers.forEach(cover => {
        cover.displayed = true;
    });

    updateBookCards(covers);
});

document.querySelector('.my-pagination').addEventListener('chose', (e) => {
    choseEventHandler(e);
});

/** @param {CustomEvent} e */
function choseEventHandler(e) {
    console.log(e.detail);
}