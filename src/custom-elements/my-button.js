import { logCustomElementState } from "../logging";
import CustomElementBase from "./base-custom-element";
import { elementSizeToIconDp, elementThemeToIconColor } from "../variables";

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

    static observedAttributes = ['value', 'icon', 'size', 'theme'];

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    valueAttrChanged = (oldVal, newVal) => { this.paragraphNode.textContent = newVal; this.updateClassName(); }

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    iconAttrChanged = (oldVal, newVal) => this.updateIconSrc();

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    sizeAttrChanged = (oldVal, newVal) => this.updateIconSrc();

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    themeAttrChanged = (oldVal, newVal) => this.updateIconSrc();

    //#endregion

    updateClassName() {
        if (this.paragraphNode.textContent && !this.imgNode.hidden) {
            this.classList.add(`${MyButton.elementName}_full`);
        } else {
            this.classList.remove(`${MyButton.elementName}_full`);
        }
    }

    updateIconSrc() {
        const iconName = this.getAttribute('icon');
        const color = elementThemeToIconColor[this.getAttribute('theme') ?? 'default'] ?? elementThemeToIconColor.default;
        const size = elementSizeToIconDp[this.getAttribute('size') ?? 'default'] ?? elementSizeToIconDp.default;

        const src = `/${iconName}/${iconName}_${color}_${size}dp.svg`;
        logCustomElementState(MyButton.elementName, `Changed icon src from ${this.imgNode.src} to ${src}`);

        this.imgNode.src = src;
        this.imgNode.hidden = !iconName;
    }
}