import { ensureContentIsText } from "./../validators";
import CustomElementBase from "./base-custom-element";

export default class MyButton extends CustomElementBase {
    static defaultClassName = 'my-button';

    className = MyButton.defaultClassName;
    hasIcon = false;
    hasText = false;

    // Child elements
    myIconNode = document.createElement('my-icon');
    paragraphNode = document.createElement('p');
    contentUpdatedEvent = new Event("content-updated");

    initComponent() {
        super.initComponent();

        ensureContentIsText(this);

        this.classList.add(this.className);
        this.paragraphNode.classList.add(`${this.className}__text`);
        this.myIconNode.classList.add(`${this.className}__icon`);

        if (!this.getAttribute('value') && this.textContent) {
            this.setAttribute('value', this.textContent);
        }

        this.textContent = "";

        this.append(this.paragraphNode, this.myIconNode);

        this.addEventListener('content-updated', (e) => this.contentUpdatedEventHandler(e));
        this.myIconNode.addEventListener('icon-updated', (e) => this.iconUpdatedEventHandler(e));
    }

    iconUpdatedEventHandler(e) {
        this.hasIcon = this.myIconNode.isIconLoaded;

        this.dispatchEvent(this.contentUpdatedEvent);
    }

    contentUpdatedEventHandler(e) {
        console.log("Has icon: ", this.hasIcon);
        console.log("Has text: ", this.hasText);

        this.myIconNode.hidden = !this.hasIcon;
        this.paragraphNode.hidden = !this.hasText;

        const oldClassName = this.className;
        let newClassName = MyButton.defaultClassName;

        if (this.hasIcon && this.hasText) {
            newClassName = `${MyButton.defaultClassName}--full`;
        } else if (this.hasIcon && !this.hasText) {
            newClassName = `${MyButton.defaultClassName}--icon`;
        } else if (!this.hasIcon && this.hasText) {
            newClassName = `${MyButton.defaultClassName}--text`;
        }

        this.className = newClassName;
        this.classList.replace(oldClassName, newClassName);
    }

    //#region attributeChanged callbacks

    static observedAttributes = ['size', 'value', 'src'];

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    sizeAttrChanged(oldVal, newVal) {
        this.myIconNode.setAttribute('size', newVal);
    }

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    valueAttrChanged(oldVal, newVal) {
        this.paragraphNode.textContent = newVal ? newVal : "";

        if (this.paragraphNode.textContent) {
            this.hasText = true;
        } else {
            this.hasText = false;
        }

        this.dispatchEvent(this.contentUpdatedEvent);
    }

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    srcAttrChanged(oldVal, newVal) {
        this.myIconNode.setAttribute('src', newVal);
    }

    //#endregion
}