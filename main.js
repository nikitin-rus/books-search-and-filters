import { getBooksMatching } from "./src/service-imitation";
import { Counter } from "./src/counter";
import { createBookCardHTML } from "./src/components/book-card";

let covers = [];

//#region Functions

/** @param {object[]} covers */
function updateBookCards(covers) {
    const cardsHTML = covers.reduce((result, cover) => {
        return cover.displayed ?
            result + createBookCardHTML(cover.props) : result
    }, "");

    document.querySelector('.main-page__cards').innerHTML = cardsHTML;
}

/** @param {object[]} covers */
function sortCoversByYear(covers) {
    covers.sort((a, b) =>
        a.props.yearPublished -
        b.props.yearPublished);
}

/** @param {object[]} covers */
function sortCoversBySeries(covers) {
    covers.sort((a, b) =>
        a.props.series.localeCompare(b.props.series));
}

//#endregion

//#region Event listeners

window.addEventListener('load', (e) => loadEventHandler(e));

document.querySelector('.main-page__search-form')
    .addEventListener('search', (e) => searchEventHandler(e));

document.querySelector('.main-page__my-select')
    .addEventListener('selection-changed', (e) => selectEventHandler(e));

document.querySelector('.main-page__pagination')
    .addEventListener('chose', (e) => choseEventHandler(e));

document.querySelector('.main-page__filters')
    .addEventListener('selection-changed', (e) => filtersEventHandler(e));

document.querySelector('.main-page__my-button')
    .addEventListener('click', (e) => clearEventHandler(e));

//#endregion

//#region Event handlers

/** @param {Event} */
function loadEventHandler(e) {
    document.querySelector('.main-page')
        .setAttribute('state', 'start');
}

/** @param {Event} e */
function searchEventHandler(e) {
    covers = getBooksMatching(e.target.querySelector('input').value)
        .map(book => {
            return {
                props: book,
                displayed: true
            }
        });

    sortCoversByYear(covers);

    updateBookCards(covers);

    document.querySelectorAll('.main-page__filters-card')
        .forEach(card => {
            const values = covers.map(cover => {
                return cover.props[card.getAttribute('property')];
            });

            card.updateCheckboxes(Counter.create(values));
        });

    document.querySelector('.main-page')
        .setAttribute('state', covers.length ?
            'results' : 'error');
}

/** @param {Event} e */
function selectEventHandler(e) {
    const index = e.target.getAttribute('selected');
    const value = e.target.options[index].getAttribute('value');

    switch (value) {
        case 'year':
            sortCoversByYear(covers);
            break;
        case 'series':
            sortCoversBySeries(covers);
            break;
        default:
            return;
    }

    updateBookCards(covers);
}

/** @param {CustomEvent} e */
function choseEventHandler(e) {
    console.log(e.detail);
}

/** @param {Event} e */
function filtersEventHandler(e) {
    const cards = document.querySelectorAll('.main-page__filters-card');

    // Объект: ключ - название свойства книги, 
    // значение - выбранные значения свойства 
    // в соответствующей карточке фильтров
    let conditions = {};
    cards.forEach(card => {
        const selector = '.checkbox__browser-checkbox:checked + .checkbox__items-left .checkbox__text';
        const values = Array.from(card.querySelectorAll(selector))
            .map(textNode => {
                return textNode.textContent;
            });

        const prop = card.getAttribute('property');
        conditions[prop] = values;
    });

    covers.forEach(cover => {
        for (const prop in cover.props) {
            // Если свойство не фильтруется
            if (!conditions[prop]) continue;

            // Если для свойства нет условий 
            // (ничего не выбрано в соот. карточке фильтров)
            if (!conditions[prop].length) continue;
            if (!conditions[prop].includes(cover.props[prop])) {
                cover.displayed = false;
                return; // Выход из внешнего цикла
            }
        }
        cover.displayed = true;
    });

    updateBookCards(covers);
}

/** @param {MouseEvent} e */
function clearEventHandler(e) {
    const selector = '.main-page__filters-card .checkbox__browser-checkbox:checked';
    Array.from(document.querySelectorAll(selector))
        .forEach(checkbox => {
            checkbox.checked = false;
        });
    
    covers.forEach(cover => {
        cover.displayed = true;
    });

    updateBookCards(covers);
}

//#endregion