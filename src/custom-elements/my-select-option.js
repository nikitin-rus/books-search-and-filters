// TODO: Рефакторинг
export default class MySelectOption extends HTMLElement { 
    className = 'select-option';

    connectedCallback() {
        const optionVal = this.textContent;
        this.textContent = '';

        const p = document.createElement('p');
        p.textContent = optionVal;

        this.classList.add(this.className);

        this.appendChild(p);
    }
} 