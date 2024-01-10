import CustomElementBase from "./base-custom-element";

export default class MySelect extends CustomElementBase {
    static elementName = "my-select";
    static selectionChangedEvent = new Event("selection-changed");

    options = [];

    constructor() {
        super(MySelect.elementName);

        const options = Array.from(this.children);

        const optionsHTML = options.reduce((prev, cur) =>
            prev + `<div class="${MySelect.elementName}__option" value="${cur.getAttribute("value")}">
                ${cur.textContent}
            </div>`, "");

        this.innerHTML = `
            <my-button class="${MySelect.elementName}__button" icon="expand_more"></my-button>
            <div class="${MySelect.elementName}__options">${optionsHTML}</div>
        `;

        this.buttonNode = this.querySelector(`.${MySelect.elementName}__button`);
        this.optionsNode = this.querySelector(`.${MySelect.elementName}__options`);
        this.options = Array.from(this.querySelectorAll(`.${MySelect.elementName}__option`));
    }

    initComponent() {
        super.initComponent();

        this.setAttribute('selected', this.selectedOptionIndex >= 0 ? this.selectedOptionIndex : 0);

        document.addEventListener('click', (e) => this.documentClickEventHandler(e));
        this.optionsNode.addEventListener('click', (e) => this.optionsClickEventHandler(e));
        this.buttonNode.addEventListener('click', (e) => this.buttonClickEventHandler(e));
    }

    //#region attributeChanged callbacks

    static observedAttributes = ['selected'];

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    selectedAttrChanged(oldVal, newVal) {
        this.buttonNode.setAttribute('value', this.options[newVal].textContent);
        this.dispatchEvent(MySelect.selectionChangedEvent);
    };

    //#endregion

    //#region event handlers

    /** @param {MouseEvent} e */
    optionsClickEventHandler(e) {
        if (e.target.classList.contains(`${MySelect.elementName}__option`)) {
            this.setAttribute('selected', this.options.indexOf(e.target));
            this.classList.remove(`${MySelect.elementName}_expanded`);
        };
    };

    /** @param {MouseEvent} e */
    buttonClickEventHandler(e) {
        this.classList.toggle(`${MySelect.elementName}_expanded`);
        e.stopPropagation();
    }

    /** @param {MouseEvent} e */
    documentClickEventHandler = (e) => this.classList.remove(`${MySelect.elementName}_expanded`);

    //#endregion
}