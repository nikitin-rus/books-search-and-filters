import { logCustomElementState } from "../logging";
import CustomElementBase from "./base-custom-element";

export default class MyPagination extends CustomElementBase {
    static elementName = "my-pagination";

    constructor() {
        super(MyPagination.elementName);

        let buttonsHTML = "";
        for (let n = 2; n <= 4; n++) {
            buttonsHTML += MyPagination.createMyButtonHTML(n,
                `${MyPagination.elementName}__my-button_movable`);
        }

        this.innerHTML = `
            <my-button class="${MyPagination.elementName}__my-button 
                ${MyPagination.elementName}__my-button_navigate
                ${MyPagination.elementName}__my-button_navigate-left" icon="expand_more">
            </my-button>
            <div class="${MyPagination.elementName}__my-buttons">       
                ${MyPagination.createMyButtonHTML(1, `${MyPagination.elementName}__my-button_edge-left`)}
                ${MyPagination.createEllipsisHTML(`${MyPagination.elementName}__ellipsis_left`)} 
                
                <span class="${MyPagination.elementName}__movable-buttons">${buttonsHTML}</span>
                
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

        this.querySelectorAll(`.${MyPagination.elementName}__my-button_change-page`).forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changePageEventHandler(e);
            });
        });

        this.querySelectorAll(`.${MyPagination.elementName}__my-button_navigate`).forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.navigateEventHandler(e);
            })
        });

        this.querySelector(`.${MyPagination.elementName}__my-button_edge-left`)
            .addEventListener('click', (e) => {
                this.toFirstPageEventHandler(e);
            });

        this.querySelector(`.${MyPagination.elementName}__my-button_edge-right`)
            .addEventListener('click', (e) => {
                this.toLastPageEventHandler(e);
            });
    }

    //#region event handlers

    /** @param {MouseEvent} e */
    navigateEventHandler = (e) => {
        const chosen = +this.getAttribute("chosen");
        let value = chosen;

        if (chosen !== 1 &&
            e.target.classList.contains(`${MyPagination.elementName}__my-button_navigate-left`)) {
            value -= 1;
        } else if (chosen !== +this.getAttribute("pages") &&
            e.target.classList.contains(`${MyPagination.elementName}__my-button_navigate-right`)) {
            value += 1;
        }

        this.setAttribute("chosen", value);

        this.dispatchEvent(new CustomEvent("choose", {
            detail: { value: value },
        }));
    }

    /** @param {MouseEvent} e */
    changePageEventHandler = (e) => {
        const value = +e.target.getAttribute('value');

        this.setAttribute('chosen', value);

        this.dispatchEvent(new CustomEvent("choose", {
            detail: { value: value },
        }));
    }

    /** @param {MouseEvent} e */
    toFirstPageEventHandler = (e) => {
        const btns = this.querySelectorAll(`.${MyPagination.elementName}__my-button_movable`);

        for (let i = 0; i < btns.length; i++) {
            btns[i].setAttribute('value', i + 2);
        }
    }

    /** @param {MouseEvent} e */
    toLastPageEventHandler = (e) => {
        const value = +e.target.getAttribute('value');
        const btns = this.querySelectorAll(`.${MyPagination.elementName}__my-button_movable`);

        let count = 1;
        for (let i = btns.length - 1; i >= 0; i--) {
            btns[i].setAttribute('value', value - count);
            count++;
        }
    }

    /** @param {CustomEvent} e */
    choseEventHandler = (e) => logCustomElementState(MyPagination.elementName, `Dispathed '${e.type}' event`);

    //#endregion

    //#region attributeChanged callbacks

    static observedAttributes = ['pages', 'chosen'];

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    pagesAttrChanged = (oldVal, newVal) => {
        const btns = this.querySelectorAll(`.${MyPagination.elementName}__my-button_change-page`);
        const cnt = +newVal;

        btns.forEach(btn => btn.removeAttribute("is-hidden"));

        this.setAttribute("chosen", "1");

        this.setAttribute('type', cnt <= 5 ? 'small' : 'full');

        if (cnt >= 0 && cnt < 5) {
            for (let i = btns.length - 1; i > cnt - 1; i--) {
                btns[i].setAttribute("is-hidden", true);
            }
        }

        for (let i = 0; i < btns.length - 1; i++) {
            btns[i].setAttribute('value', i + 1);
        }
        btns[4].setAttribute('value', cnt);
    }

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    chosenAttrChanged = (oldVal, newVal) => {
        const btns = this.querySelectorAll(`.${MyPagination.elementName}__my-button_change-page`);
        const container = this.querySelector(`.${MyPagination.elementName}__movable-buttons`);

        const oldChosen = +oldVal;
        const newChosen = +newVal;
        const pages = +this.getAttribute('pages');

        btns.forEach(btn => {
            const value = +btn.getAttribute('value');
            if (value === oldChosen) btn.removeAttribute('theme');
            if (value === newChosen) btn.setAttribute('theme', 'inverse');
        });

        this.setAttribute('state',
            (1 <= newChosen && newChosen <= 3) ? 'start' :
                (pages - 2 <= newChosen && newChosen <= pages) ? 'end' :
                    'middle');

        if (newChosen !== 2 && newChosen !== pages - 1) {
            const left = btns[1];
            const right = btns[3];

            if (+left.getAttribute('value') === newChosen) {
                container.insertBefore(right, left);
                right.setAttribute('value', newChosen - 1)
            } else if (+right.getAttribute('value') === newChosen) {
                container.appendChild(left);
                left.setAttribute('value', newChosen + 1);
            }
        }
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