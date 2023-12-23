import MyIcon from "./src/custom-elements/my-icon";
import MyButton from "./src/custom-elements/my-button";
import MySelect from "./src/custom-elements/my-select";
import MySelectOption from "./src/custom-elements/my-select-option";
import SearchForm from "./src/custom-elements/search-form";
import SearchFormResults from "./src/custom-elements/search-form-results";

const elements = {
    "my-icon": MyIcon,
    "my-button": MyButton,
    "my-select": MySelect,
    "my-select-option": MySelectOption,
    "search-form": SearchForm,
    "search-form-results": SearchFormResults,
}

for (const key in elements) {
    if (Object.hasOwnProperty.call(elements, key)) {
        const constructor = elements[key];
        customElements.define(key, constructor);
    }
}
