import { removeExtraWhitespaces } from "../helpers";
import { logCustomElementState } from "../logging";

export default class CustomElementBase extends HTMLElement {
    isComponentCreated = false;

    constructor(elementName, innerHTML) {
        super();

        this.classList.add(elementName);
        this.innerHTML = innerHTML;
    }

    initComponent() {
        logCustomElementState(this, "Initialization started");
    }

    connectedCallback() {
        logCustomElementState(this, "Connected to DOM");

        if (this.isComponentCreated == false) {
            this.initComponent();
            this.isComponentCreated = true;
        }
    }

    /**
     * @param {String} attrName 
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
        oldVal = oldVal ? removeExtraWhitespaces(oldVal) : oldVal;
        newVal = newVal ? removeExtraWhitespaces(newVal) : newVal;

        logCustomElementState(this, `Attribute ${attrName} has changed from ${oldVal} to ${newVal}`);

        this[attrName + 'AttrChanged'](oldVal, newVal);
    }
}