import CustomElementBase from "./base-custom-element";
import checkIconPath from "/check/check_black_18dp.svg";

export default class FiltersCard extends CustomElementBase {
    static elementName = "filters-card";
    static selectionChangedEvent = new Event("selection-changed");

    constructor() {
        super(FiltersCard.elementName);

        const checkboxesHTML = Array.from(this.children).reduce((prev, cur) =>
            prev + FiltersCard.createCheckboxHTML(cur.textContent), "");

        this.innerHTML = `
            <p class="${FiltersCard.elementName}__title"></p>
            <div class="${FiltersCard.elementName}__checkboxes">${checkboxesHTML}</div>
        `;

        this.titleNode = this.querySelector(`.${FiltersCard.elementName}__title`);
        this.checkboxes = this.querySelector(`.${FiltersCard.elementName}__checkboxes`);
    }

    initComponent() {
        super.initComponent();

        this.checkboxes.addEventListener('change', (e) => this.checkboxesCheckEventHandler(e));
    }

    //#region attributeChanged callbacks

    static observedAttributes = ['title'];

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    titleAttrChanged = (oldVal, newVal) => this.titleNode.textContent = newVal;

    //#endregion

    //#region event handlers

    checkboxesCheckEventHandler = (e) => this.dispatchEvent(FiltersCard.selectionChangedEvent);

    //#endregion

    /** @param {string} value */
    addCheckbox = (value, count) => this.checkboxes.insertAdjacentHTML("beforeend", FiltersCard.createCheckboxHTML(value, count));

    /** @param {object.<string, number>} valuesToCount */
    updateCheckboxes = (valuesToCount) => {
        this.checkboxes.innerHTML = ""; 
        for (const [value, count] of Object.entries(valuesToCount)) {
            this.addCheckbox(value, count);
        }
    };

    /** @param {string} value */
    static createCheckboxHTML(value, count) {
        return `
        <label class="${FiltersCard.elementName}__checkbox checkbox">
            <input class="checkbox__browser-checkbox" type="checkbox">
            <div class="checkbox__items-left">
                <span class="checkbox__custom-checkbox">
                    <img class="checkbox__img" src="${checkIconPath}" alt="check icon"/>
                </span>
                <span class="checkbox__text">${value}</span>
            </div>
            <span class="checkbox__count">${count}</span>
        </label>
        `;
    }
}