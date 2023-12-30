import MyButton from "./src/custom-elements/my-button";
import MySelect from "./src/custom-elements/my-select";
import SearchForm from "./src/custom-elements/search-form";
import { logCustomElementState } from "./src/logging";

const constructors = [MyButton, MySelect, SearchForm];

for (const ctor of constructors) {
    customElements.define(ctor.elementName, ctor);
    customElements.whenDefined(ctor.elementName).then(ctor => logCustomElementState(ctor.elementName, "Defined"));
}