// import { removeExtraWhitespaces } from "../helpers";
import { logCustomElementState } from "../logging";

// TODO: Сделать отписку от всех ивентов при удалении элемента из DOM
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
        logCustomElementState(this, `Attribute ${attrName} has changed from ${oldVal} to ${newVal}`);

        this[attrName + 'AttrChanged'](oldVal, newVal);
    }
}