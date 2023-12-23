import { getPopularTitles } from "../service-imitation";

// TODO: Рефакторинг
export default class SearchFormResults extends HTMLElement {
    isDefault = false;

    static _className = 'search-results';

    get _className() {
        return SearchFormResults._className;
    }; 

    connectedCallback() {
        this.classList.add(this._className);

        this.setDefault().hide();
    }

    setDefault() {
        this.isDefault = true;
        return this
            .clear()
            .addSection("Популярные запросы", getPopularTitles());
    }

    clear() {
        this.isDefault = false;
        this.innerHTML = "";
        return this;
    }

    addSection(title, rowsBodies) {
        this.isDefault = false;
        this.appendChild(SearchFormResults.createSection(title, rowsBodies));
        return this;
    }

    show() {
        this.hidden = false;
        return this;
    }

    hide() {
        this.hidden = true;
        return this;
    }

    static createSection(title, rowsBodies) {
        const section = document.createElement('div');
        const h = document.createElement('p');
        const list = document.createElement('ul');

        section.classList.add(`${this._className}__section`);
        h.classList.add(`${this._className}__heading`);
        list.classList.add(`${this._className}__list`);

        h.textContent = title;

        rowsBodies.forEach(body => {
            list.appendChild(SearchFormResults.createRow(body));
        });

        section.appendChild(h);
        section.appendChild(list);

        return section;
    }

    static createRow(body) {
        const row = document.createElement('li');
        const p = document.createElement('p');

        row.classList.add(`${this._className}__row`);
        p.classList.add(`${this._className}__body`);

        p.textContent = body;

        p.setAttribute('style', 'body2');

        row.appendChild(p);

        return row;
    }
}