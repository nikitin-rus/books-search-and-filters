const books = [
    {
        title: "Ведьмак. Последнее желание. Меч предназначения",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "Neoclassic",
        categories: ["Художественная литература", "Фантастика. Фэнтези", "Фэнтези"],
        series: "КИНО!!",
        fileName: "2777109-2.webp",
    },
    {
        title: "Ведьмак: Последнее желание",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "АСТ",
        categories: ["Художественная литература", "Фантастика. Фэнтези", "Фэнтези"],
        series: "Сапковский с иллюстрациями",
        fileName: "2577371-2.webp",
    },
    {
        title: "Ведьмак. Неофициальная кулинарная книга",
        author: "Ольга Лиманец",
        format: "Твердый переплёт",
        publisher: "Эксмо",
        categories: ["Кулинария", "Поваренные книги. Сборники рецептов"],
        series: "Кулинария. Книги по культовым вселенным. От игр до сериалов",
        fileName: "2942516-14.webp",
    },
    {
        title: "Предназначение Ведьмака",
        author: "Джозеф Дилейни",
        format: "Твердый переплёт",
        publisher: "Эксмо",
        categories: ["Детские книги", "Детская художественная литература", "Фантастика и фэнтези для детей"],
        series: "Ученик Ведьмака. Мировой фэнтези-бестселлер для подростков",
        fileName: "2766535.webp",
    },
    {
        title: "Ведьмак из Большой Москвы: повести и рассказы",
        author: "Владимир Васильев",
        format: "Твердый переплёт",
        publisher: "Феникс",
        categories: ["Художественная литература", "Фантастика. Фэнтези", "Фэнтези"],
        series: "Капитаны русской фантастики",
        fileName: "3001444-1.webp",
    },
    {
        title: "Ведьмак. Владычица озера",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "Neoclassic",
        categories: ["Художественная литература", "Фантастика. Фэнтези", "Фэнтези"],
        series: "Легендарные фантастические сериалы",
        fileName: "2783970-1.webp",
    },
    {
        title: "Ведьмак: библиотечное издание",
        author: "Пол Тобин",
        format: "Твердый переплёт",
        publisher: "Белый Единорог",
        categories: ["Комиксы"],
        series: "Ведьмак",
        fileName: "2704484.webp",
    },
    {
        title: "Ведьмак. Крещение огнем. Башня ласточки",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "Neoclassic",
        categories: ["Художественная литература", "Фантастика. Фэнтези", "Фэнтези"],
        series: "КИНО!!",
        fileName: "2798427-2.webp",
    },
    {
        title: "Ведьмак: из плоти и пламени",
        author: "Александра Мотыка",
        format: "Мягкий переплёт",
        publisher: "Белый Единорог",
        categories: ["Комиксы"],
        series: "Ведьмак",
        fileName: "2746421.webp",
    },
    {
        title: "Ведьмак: Сезон гроз. Дорога без возврата",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "Neoclassic",
        categories: ["Комиксы"],
        series: "КИНО!!",
        fileName: "2828490-2.webp",
    },
    {
        title: "Ведьмак: Крещение огнем",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "АСТ",
        categories: ["Художественная литература", "Фантастика. Фэнтези", "Фэнтези"],
        series: "Сапковский с иллюстрациями",
        fileName: "2574413-1.webp",
    },
    {
        title: "Ведьмак. Меч Предназначения. (Иллюстрации Дениса Гордеева)",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "АСТ",
        categories: ["Художественная литература", "Фантастика. Фэнтези", "Фэнтези"],
        series: "Сапковский с иллюстрациями",
        fileName: "2491421-2.webp",
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
 * @param {string} title 
 * @returns {object[]} array of matched books
 */
export function getBooksMatching(title) {
    if (!title.length) return [];

    const ans = [];
    books.forEach(book => {
        if (book.title.toLowerCase().includes(title.toLowerCase())) {
            ans.push(book);
        }
    });
    return ans;
}

/**
 * @returns {string[]} array of popular titles
 */
export function getPopularTitles() {
    return ["Ведьмак"];
}