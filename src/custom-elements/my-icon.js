import { ensureContentIsEmpty } from "../validators";
import CustomElementBase from "./base-custom-element";

export default class MyIcon extends CustomElementBase {
    className = 'my-icon';
    isIconLoaded = false;
    iconUpdatedEvent = new Event("icon-updated");

    initComponent() {
        super.initComponent();

        ensureContentIsEmpty(this);

        this.classList.add(`${this.className}`);
    }

    //#region attributeChanged callbacks

    static observedAttributes = ['src'];

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    srcAttrChanged(oldVal, newVal) {
        if (oldVal) {
            this.removeChild(this.querySelector('svg'));

            this.isIconLoaded = false;
            this.dispatchEvent(this.iconUpdatedEvent);
        }

        if (newVal) {
            MyIcon.validateIconSrc(newVal);

            MyIcon.fetchIcon(newVal).then((svgMarkupText) => {
                this.insertAdjacentHTML('beforeend', svgMarkupText);

                this.isIconLoaded = true;
                this.dispatchEvent(this.iconUpdatedEvent);
            });
        }
    }

    //#endregion

    static checkIconSrc(src) {
        // At least one latin letter before .svg
        const pathRegExp = /[a-zA-Z]+\.svg/;
        return pathRegExp.test(src);
    }

    static validateIconSrc(src) {
        if (!MyIcon.checkIconSrc(src)) {
            throw new Error(`Icon src "${src}" is not valid. Use only latin letters for icon names. Template: <iconName>.svg`);
        }
    }

    static async fetchIcon(src) {
        const response = await fetch(src);

        if (!response.ok) throw new Error(`HTTP Error. Status: ${response.status}`);

        return await response.text();;
    }
}
