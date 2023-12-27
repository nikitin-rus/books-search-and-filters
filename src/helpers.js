/**
 * Set multiple attributes on element
 * @param {Element} element 
 * @param {Object.<string, string>} namesToValues 
 */
export function setAttributes(element, namesToValues) {
    for (const [key, value] of Object.entries(namesToValues)) {
        element.setAttribute(key, value);
    }
}

// /**
//  * @param {String} str 
//  * @returns {String} str without extra whitespaces like '\n', '\r', '\t', ' '.
//  */
// export function removeExtraWhitespaces(str) {
//     return str.replace(/[\s]+/g, " ");
// }