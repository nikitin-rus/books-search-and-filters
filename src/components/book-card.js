import { createBookCoverHTML } from "./book-cover";

/** 
 * @param {object.<string, string>} bookInfo
 * @param {string} fileName
 * @param {string?} className
 */
export function createBookCardHTML(bookInfo, className) {
    className ??= "";
    return `
        <div class="book-card ${className}">
            ${createBookCoverHTML(bookInfo.fileName, "book-card__cover")}
            <div class="book-card__info">
                <p class="book-card__title">${bookInfo.title}</p>
                <p class="book-card__author">${bookInfo.author}</p>
            </div>
        </div>
    `
}