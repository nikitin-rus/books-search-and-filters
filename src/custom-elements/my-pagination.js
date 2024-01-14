import { logCustomElementState } from "../logging";
import CustomElementBase from "./base-custom-element";
import SearchForm from "./search-form";

export default class MyPagination extends CustomElementBase {
    static elementName = "my-pagination";

    constructor() {
        super(MyPagination.elementName);

        let buttonsHTML = "";
        for (let n = 2; n <= 4; n++) {
            buttonsHTML += MyPagination.createMyButtonHTML(n);
        }

        this.innerHTML = `
            <my-button class="${MyPagination.elementName}__my-button 
                ${MyPagination.elementName}__my-button_navigate
                ${MyPagination.elementName}__my-button_navigate-left" icon="expand_more">
            </my-button>
            <div class="${MyPagination.elementName}__my-buttons">       
                ${MyPagination.createMyButtonHTML(1, `${MyPagination.elementName}__my-button_edge-left`)}
                ${MyPagination.createEllipsisHTML(`${MyPagination.elementName}__ellipsis_left`)} 
                
                ${buttonsHTML}
                
                ${MyPagination.createEllipsisHTML(`${MyPagination.elementName}__ellipsis_right`)}
                ${MyPagination.createMyButtonHTML(5, `${MyPagination.elementName}__my-button_edge-right`)}
            </div>
            <my-button class="${MyPagination.elementName}__my-button
                ${MyPagination.elementName}__my-button_navigate 
                ${MyPagination.elementName}__my-button_navigate-right" icon="expand_more">
            </my-button>
        `;
    }

    initComponent() {
        super.initComponent();

        this.addEventListener('chose', (e) => {
            this.choseEventHandler(e);
        });

        const btns = this.querySelectorAll(`.${MyPagination.elementName}__my-button_change-page`);
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changePageEventHandler(e);
            });
        });
    }

    //#region event handlers

    static choseEvent = new CustomEvent("chose");

    /** @param {MouseEvent} e */
    changePageEventHandler = (e) => {
        const index = +e.target.getAttribute('value') - 1;
        this.setAttribute('chosen', index);
    }

    /** @param {CustomEvent} e */
    choseEventHandler = (e) => {
        logCustomElementState(MyPagination.elementName, `Dispathed '${MyPagination.choseEvent.type}' event`);
    }

    //#endregion

    //#region attributeChanged callbacks

    static observedAttributes = ['pages', 'chosen'];

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    pagesAttrChanged = (oldVal, newVal) => {
        this.setAttribute("chosen", "0");

        // const cnt = +newVal;
        // let type = '';
        // if (cnt == 0) type = 'empty';
        // else if (cnt <= 5) type = 'small';
        // else type = 'full';

        // this.setAttribute('type', type);

        // const btn = this.querySelector(`.${MyPagination.elementName}__my-button_change-page:last-child`);
        // btn.setAttribute('value', newVal);
    }

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    chosenAttrChanged = (oldVal, newVal) => {
        const btns = this.querySelectorAll(`.${MyPagination.elementName}__my-button_change-page`);

        if (oldVal) {
            btns[oldVal].removeAttribute('theme');
        }
        btns[newVal].setAttribute('theme', 'inverse');

        this.dispatchEvent(new CustomEvent("chose", {
            detail: { value: +newVal + 1 }
        }));
    }

    //#endregion

    /** 
     * @param {number} value 
     * @param {string} className
     */
    static createMyButtonHTML(value, className = "") {
        return `
            <my-button class="${MyPagination.elementName}__my-button
                ${MyPagination.elementName}__my-button_change-page
                ${className}" value="${value}">
            </my-button>
        `;
    }

    /** @param {string} className */
    static createEllipsisHTML(className = "") {
        return `
            <span class="${MyPagination.elementName}__ellipsis
                ${className}">
                ...
            </span>
        `;
    }
}