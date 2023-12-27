import { logCustomElementState } from "../logging";
import { getTitlesMatching, getPopularTitles } from "../service-imitation";
import CustomElementBase from "./base-custom-element";

export default class SearchForm extends CustomElementBase {
    static elementName = "search-form";
    static searchEvent = new Event("search");

    isSearchResultsShowPopular = false;
    searchTimeout = 1000;
    lastInputTime = 0;

    constructor() {
        super(SearchForm.elementName, `
            <input class="${SearchForm.elementName}__input">
            <my-button class="${SearchForm.elementName}__button ${SearchForm.elementName}__button_close"
                size="small" icon="close"></my-button>
            <my-button class="${SearchForm.elementName}__button ${SearchForm.elementName}__button_search"
                theme="inverse" icon="search"></my-button>
            <div class="${SearchForm.elementName}__results"></div>
        `);

        this.inputNode = this.querySelector('input');
        this.buttonCloseNode = this.querySelector(`.${SearchForm.elementName}__button_close`);
        this.buttonSearchNode = this.querySelector(`.${SearchForm.elementName}__button_search`);
        this.resultsNode = this.querySelector(`.${SearchForm.elementName}__results`);
    }

    initComponent() {
        super.initComponent();

        document.addEventListener('click', (e) => this.documentClickEventHandler(e));
        this.addEventListener('input', (e) => this.inputEventHandler(e));
        this.inputNode.addEventListener('click', (e) => this.inputClickEventHandler(e));
        this.inputNode.addEventListener('keydown', (e) => this.inputKeydownEventHandler(e));
        this.buttonCloseNode.addEventListener('click', (e) => this.btnCloseClickEventHandler(e));
        this.buttonSearchNode.addEventListener('click', (e) => this.btnSearchClickEventHandler(e));
        this.resultsNode.addEventListener('click', (e) => this.resultsClickEventHandler(e));
    }

    //#region attributeChanged callbacks

    static observedAttributes = ['value', 'placeholder', 'size'];

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    valueAttrChanged = (oldVal, newVal) => this.inputNode.value = newVal;

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    placeholderAttrChanged = (oldVal, newVal) => this.inputNode.placeholder = newVal;

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    sizeAttrChanged = (oldVal, newVal) => this.buttonSearchNode.setAttribute('size', newVal);

    //#endregion

    //#region event handlers

    /** @param {MouseEvent} e */
    documentClickEventHandler = (e) => this.resultsNode.hidden = e.target != this.inputNode;

    /** @param {Event} e */
    inputEventHandler(e) {
        this.setAttribute('value', e.target.value);

        if (e.target.value.length < 4 && !this.isSearchResultsShowPopular) {
            logCustomElementState(this, `Filling search results with popular titles`);

            this.resultsNode.innerHTML = "";

            this.resultsNode.insertAdjacentHTML('beforeend',
                SearchForm.createResultsSectionHTML("Популярное", getPopularTitles()));

            this.isSearchResultsShowPopular = true;
        }

        if (e.target.value.length >= 4) {
            setTimeout(() => {
                // Если последовал ввод в input меньше, чем через секунду, не выполняем отложенный вызов
                if (Date.now() - this.lastInputTime > 1000) {
                    logCustomElementState(this, `Searching for matching titles to input '${e.target.value}' for search results block`);

                    this.resultsNode.innerHTML = "";

                    this.resultsNode.insertAdjacentHTML('beforeend',
                        SearchForm.createResultsSectionHTML("Книги", [e.target.value, ...getTitlesMatching(e.target.value)]));

                    this.isSearchResultsShowPopular = false;
                }
            }, this.searchTimeout);
        }

        this.lastInputTime = Date.now();
    }

    /** @param {MouseEvent} e */
    btnCloseClickEventHandler = (e) => this.setAttribute("value", "");

    /** @param {MouseEvent} e */
    btnSearchClickEventHandler = (e) => { this.dispatchEvent(SearchForm.searchEvent) };

    /** @param {MouseEvent} */
    inputClickEventHandler(e) {
        if (e.target.value.length < 4 && !this.isSearchResultsShowPopular) {
            logCustomElementState(this, `Filling search results with popular titles`);

            this.resultsNode.innerHTML = "";

            this.resultsNode.insertAdjacentHTML('beforeend',
                SearchForm.createResultsSectionHTML("Популярное", getPopularTitles()));

            this.isSearchResultsShowPopular = true;
        }
    }

    /** @param {KeyboardEvent} e */
    inputKeydownEventHandler = (e) => {
        if (e.code === "Escape") {
            this.inputNode.blur();
            this.resultsNode.hidden = true;
        }
    };

    /** @param {MouseEvent} e */
    resultsClickEventHandler(e) {
        if (e.target.classList.contains(`${SearchForm.elementName}__results-row`)) {
            logCustomElementState(this, `Dispatching search event with result value '${e.target.textContent}'`);

            this.setAttribute('value', e.target.textContent);

            this.dispatchEvent(SearchForm.searchEvent);
        }
    };

    //#endregion

    /** @param {string[]} values */
    static createResultsSectionHTML(title, values) {
        const rowsHTML = values.reduce((prev, cur) => prev + SearchForm.createResultsRowHTML(cur), "");

        return `
            <div class="${SearchForm.elementName}__results-section">
                <div class="${SearchForm.elementName}__results-title">${title}</div>
                <div class="${SearchForm.elementName}__resutls-rows">${rowsHTML}</div>
            </div>
        `;
    }

    /** @param {string} value */
    static createResultsRowHTML = (value) => `<div class="${SearchForm.elementName}__results-row">${value}</div>`;
}