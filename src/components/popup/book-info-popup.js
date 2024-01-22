/** 
 * @param {object} book
 * @param {string?} className 
 */
export default function createBookInfoPopupHTML(book, className) {
    className ??= "";
    return `
        <div class="book-info-popup ${className}">
            <div class="book-info-popup__main-info">
                <h5 class="book-info-popup__title">
                    ${book.title}
                </h5>
                <h6 class="book-info-popup__author">
                    ${book.author}
                </h6>
            </div>
            <div class="book-info-popup__additional-info">
                ${createBookInfoRow("Издательство", book.publisher)}
                ${createBookInfoRow("Серия", book.series)}
                ${createBookInfoRow("Год издания", book.yearPublished)}
                ${createBookInfoRow("Тип обложки", book.format)}
            </div>
            <my-button 
                class="book-info-popup__close-btn" 
                value="Закрыть"
                theme="inverse">
            </my-button>
        </div>
    `;
}

function createBookInfoRow(key, value, className) {
    className ??= "";
    return `
        <div class="book-info-popup__info-row ${className}">
            <div class="book-info-popup__info-column">
                <h6>${key}</h6>
            </div>
            <div class="book-info-popup__info-column">
                <h6>${value}</h6>
            </div>
        </div>
    `;
}