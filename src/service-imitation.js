const books = [
    {
        title: "Тысячекрылый журавль",
        author: "Кавабата Ясунари",
        format: "Мягкий переплет",
        publisher: "Neoclassic",
        genre: "Классическая проза",
        category: "Художественная литература",
    },
    {
        title: "Портрет Дориана Грея",
        author: "Оскар Уайльд",
        format: "Мягкий переплет",
        publisher: "Neoclassic",
        genre: "Классическая проза",
        category: "Художественная литература",
    },
    {
        title: "Преступление и наказание",
        author: "Федор Достоевский",
        format: "Мягкий переплет",
        publisher: "Neoclassic",
        genre: "Классическая проза",
        category: "Художественная литература",
    },
    {
        title: "Little Women",
        author: "Луиза Мэй Олкотт",
        format: "Твердый переплёт",
        publisher: "АСТ",
        genre: "Классическая проза на английском",
        category: "Книги на английском языке",
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

// /**
//  * @param {string} title 
//  * @returns {object[]} array of matched books
//  */
// export function getBooksMatching(title) {
//     const ans = [];
//     books.forEach(book => {
//         if (book.title.toLowerCase().includes(title.toLowerCase())) {
//             ans.push(book);
//         }
//     });
//     return ans;
// }

/**
 * @returns {string[]} array of popular titles
 */
export function getPopularTitles() {
    return Array.from(books.values()).map(book => book.title);
}