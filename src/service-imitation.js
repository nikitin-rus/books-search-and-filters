const books = [
    {
        title: "Тысячекрылый журавль",
        author: "Кавабата Ясунари",
        format: "Мягкий переплет",
        publisher: "Пальмира классика",
        genre: "Классическая проза",
        categories: ["Художественная литература", "Философия и общество"],
    }
];

/**
 * @param {string} title 
 * @returns {string[]} array of matched titles
 */
export function getTitlesMatching(title) {
    const ans = [];
    books.forEach(book => {
        if (book.title.toLowerCase().includes(title.toLowerCase())) {
            ans.push(book.title);
        }
    });
    return ans;
}

/**
 * @returns {string[]} array of popular titles
 */
export function getPopularTitles() {
    return Array.from(books.values()).map(book => book.title);
}