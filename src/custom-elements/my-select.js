import { setAttributes } from "../helpers";
import MySelectOption from "./my-select-option";

// TODO: Рефакторинг
export default class MySelect extends HTMLElement {
    className = 'select';

    connectedCallback() {
        const options = this.querySelectorAll('select-option');
        const selectedCnt = this.querySelectorAll('select-option[selected=true]').length;

        if (selectedCnt > 1) throw new Error("Cannot choose more than one option.");
        else if (selectedCnt == 0) options[0].setAttribute("selected", true);

        this.btn = document.createElement("my-button");
        this.lst = document.createElement("list");

        this.classList.add(`${this.className}`);
        this.btn.classList.add(`${this.className}__btn`, 'button');
        this.lst.classList.add(`${this.className}__lst`);
        options.forEach(o => o.classList.add(`${this.className}__option`));

        setAttributes(this.btn, {
            body: this.querySelector("[selected]").textContent,
            src: "icons/chevron-down.svg",
            theme: 'inverse'
        });

        this.append(this.btn, this.lst);
        this.lst.append(...options);

        this.close();

        this.addEventListener('click', (e) => this.clickCallback(e));
    }

    open = () => this.setAttribute('show', true);
    close = () => this.setAttribute('show', false);
    isClosed = () => this.getAttribute('show') === 'false';

    clickCallback(e) {
        if (this.btn.isEqualNode(e.target)) {
            this.isClosed() ? this.open() : this.close();
        }

        if (e.target instanceof MySelectOption) {
            this.close();
            this.btn.setAttribute("body", e.target.textContent);
        }
    }
}