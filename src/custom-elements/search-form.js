import { setAttributes } from "../helpers";
import { getTitlesMatching, getPopularTitles } from "../service-imitation";
import { ensureContentIsText } from "../validators";
import CustomElementBase from "./base-custom-element";

export default class SearchForm extends CustomElementBase {
    className = 'search-form';

    inputNode = document.createElement('input');
    myBtnClearNode = document.createElement('my-button');
    myBtnSearchNode = document.createElement('my-button');

    initComponent() {
        super.initComponent();

        ensureContentIsText(this);

        this.classList.add(this.className);
        this.inputNode.classList.add(`${this.className}__input`);
        this.myBtnClearNode.classList.add(`${this.className}__btn--clear`,);
        this.myBtnSearchNode.classList.add(`${this.className}__btn--search`);
        // this.results.classList.add(`${this.className}__results`);

        if (!this.getAttribute('value') && this.textContent) {
            this.setAttribute('value', this.textContent);
        }
        this.textContent = "";

        setAttributes(this.myBtnClearNode, {
            size: 'small',
            src: `icons/clear.svg`,
        });

        setAttributes(this.myBtnSearchNode, {
            src: `icons/search.svg`,
            theme: 'inverse',
        });

        // this.results.setAttribute('size', 'small');

        this.append(this.inputNode, this.myBtnClearNode, this.myBtnSearchNode);
    }

    //#region attributeChanged callbacks

    static observedAttributes = ['value', 'placeholder', 'size'];

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    valueAttrChanged(oldVal, newVal) {
        this.inputNode.value = newVal ? newVal : "";
    }

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    placeholderAttrChanged(oldVal, newVal) {
        this.inputNode.placeholder = newVal ? newVal : "";
    }

    /**
     * @param {String | null} oldVal 
     * @param {String | null} newVal 
     */
    sizeAttrChanged(oldVal, newVal) {
        if (newVal === "default" || newVal === "small") {
            this.inputNode.setAttribute('size', newVal);
            this.myBtnSearchNode.setAttribute('size', newVal);
        } else {
            this.inputNode.setAttribute('size', 'default');
            this.myBtnSearchNode.setAttribute('size', "default");
        }
    }

    //#endregion

    // inputCallback() {
    //     const value = this.myInput.getAttribute('value');

    //     if (value.length < 4 && !this.results.isDefault) {
    //         this.results.setDefault();
    //         return;
    //     }

    //     if (value.length < 4) return;

    //     setTimeout(() => {
    //         if (this.myInput.value != value) return;

    //         this.results.clear()
    //             .addSection('Книги', [value, ...getTitlesMatcing(value)]);
    //     }, 500);
    // }

    // clickCallback(e) {
    //     if (this.btnClear.isEqualNode(e.target)) {
    //         this.myInput.value = "";

    //         this.results
    //             .clear()
    //             .addSection("Популярные запросы", getPopularTitles())
    //             .hide();
    //     }
    // }

    // focusinCallback(e) {
    //     if (this.myInput.isEqualNode(e.target)) this.results.show();
    // }

    // focusoutCallback(e) {
    //     if (this.myInput.isEqualNode(e.target)) {

    //         // Fixed: input blur event goes before click on results_row
    //         setTimeout(() => this.results.hide(), 1);
    //     }
    // }

    // keydownCallback(e) {
    //     if (e.keyCode == 27) this.querySelector('input').blur();
    // }
}