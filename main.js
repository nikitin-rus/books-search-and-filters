// TODO: Изменить define: добавлять название элементов по статическому свойсву из конструктора

import MyButton from "./src/custom-elements/my-button";
import MySelect from "./src/custom-elements/my-select";
import MySelectOption from "./src/custom-elements/my-select-option";
import SearchForm from "./src/custom-elements/search-form";

const elements = {
    "my-button": MyButton,
    "my-select": MySelect,
    "my-select-option": MySelectOption,
    "search-form": SearchForm,
}

// const constructors = [MyButton, MySelect, MySelectOption, SearchForm, SearchFormResults];

for (const key in elements) {
    if (Object.hasOwnProperty.call(elements, key)) {
        const constructor = elements[key];
        customElements.define(key, constructor);
    }
}
