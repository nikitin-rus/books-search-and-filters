import checkIconPath from "/check/check_black_18dp.svg";

/** 
 * @param {string} value 
 * @param {number} count 
 */
export function createCheckboxHTML(value, count) {
    return `
        <label class="checkbox">
            <input class="checkbox__browser-checkbox" type="checkbox">
            <div class="checkbox__items-left">
                <span class="checkbox__custom-checkbox">
                    <img class="checkbox__img" src="${checkIconPath}" alt="check icon"/>
                </span>
                <span class="checkbox__text">${value}</span>
            </div>
            <span class="checkbox__count">${count}</span>
        </label>
    `;
}