/** @param {string} fileName */
export function createBookCoverHTML(fileName) {
    return `
        <div class="book-cover">
            <img class="book-cover__img" src="covers/${fileName}" alt="book cover"/>
        </div>
    `
}