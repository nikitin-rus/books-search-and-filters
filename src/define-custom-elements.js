import FiltersCard from "./custom-elements/filters-card";
import MyButton from "./custom-elements/my-button";
import MySelect from "./custom-elements/my-select";
import SearchForm from "./custom-elements/search-form";
import { logCustomElementState } from "./logging";

const constructors = [MyButton, MySelect, SearchForm, FiltersCard];

for (const ctor of constructors) {
    customElements.define(ctor.elementName, ctor);
    customElements.whenDefined(ctor.elementName).then(ctor => logCustomElementState(ctor.elementName, "Defined"));
}