/** 
 * @param {string} fileName 
 * @param {string?} className 
 */
export function createBookCoverHTML(fileName, className) {
    className ??= "";
    return `
        <div class="book-cover ${className}">
            <img class="book-cover__img" src="covers/${fileName}" alt="book cover"/>
        </div>
    `
}