import CustomElementBase from "./base-custom-element";

export default class MyButton extends CustomElementBase {
    static elementName = "my-button";

    constructor() {
        super(MyButton.elementName, `
            <p class=${MyButton.elementName}__text></p>
            <img class="${MyButton.elementName}__img" alt="btn-icon">
        `);

        this.paragraphNode = this.querySelector('p');
        this.imgNode = this.querySelector('img');
        this.imgNode.hidden = true;

        this.imgNode.onload = (e) => { this.updateClassName(); };
        this.imgNode.onerror = (e) => { this.updateClassName(); };
    }

    //#region attributeChanged callbacks

    static observedAttributes = ['value', 'src'];

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    valueAttrChanged = (oldVal, newVal) => { this.paragraphNode.textContent = newVal; this.updateClassName(); }

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    srcAttrChanged = (oldVal, newVal) => {
        // Triggers img load/error events
        this.imgNode.src = newVal;
        this.imgNode.hidden = !newVal;
    }

    //#endregion

    updateClassName() {
        if (this.paragraphNode.textContent && !this.imgNode.hidden) {
            this.classList.add(`${MyButton.elementName}_full`);
        } else {
            this.classList.remove(`${MyButton.elementName}_full`);
        }
    }
}