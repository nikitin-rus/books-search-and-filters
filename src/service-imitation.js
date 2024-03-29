const filtersNames = ["author", "format", "publisher", "category", "series"];

const books = [
    {
        title: "Ведьмак. Последнее желание. Меч предназначения",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "Neoclassic",
        yearPublished: 2021,
        category: "Фантастика и фэнтези",
        series: "КИНО!!",
        fileName: "2777109-2.webp",
    },
    {
        title: "Ведьмак: Последнее желание",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "АСТ",
        yearPublished: 2022,
        category: "Фантастика и фэнтези",
        series: "Сапковский с иллюстрациями",
        fileName: "2577371-2.webp",
    },
    {
        title: "Ведьмак. Неофициальная кулинарная книга",
        author: "Ольга Лиманец",
        format: "Твердый переплёт",
        publisher: "Эксмо",
        yearPublished: 2023,
        category: "Поваренные книги. Сборники рецептов",
        series: "Кулинария. Книги по культовым вселенным. От игр до сериалов",
        fileName: "2942516-14.webp",
    },
    {
        title: "Предназначение Ведьмака",
        author: "Джозеф Дилейни",
        format: "Твердый переплёт",
        publisher: "Эксмо",
        yearPublished: 2019,
        category: "Фантастика и фэнтези для детей",
        series: "Ученик Ведьмака. Мировой фэнтези-бестселлер для подростков",
        fileName: "2766535.webp",
    },
    {
        title: "Ведьмак из Большой Москвы: повести и рассказы",
        author: "Владимир Васильев",
        format: "Твердый переплёт",
        publisher: "Феникс",
        yearPublished: 2024,
        category: "Фантастика и фэнтези",
        series: "Капитаны русской фантастики",
        fileName: "3001444-1.webp",
    },
    {
        title: "Ведьмак. Владычица озера",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "Neoclassic",
        yearPublished: 2022,
        category: "Фантастика и фэнтези",
        series: "Легендарные фантастические сериалы",
        fileName: "2783970-1.webp",
    },
    {
        title: "Ведьмак: библиотечное издание",
        author: "Пол Тобин",
        format: "Твердый переплёт",
        publisher: "Белый Единорог",
        yearPublished: 2019,
        category: "Комиксы",
        series: "Ведьмак",
        fileName: "2704484.webp",
    },
    {
        title: "Ведьмак. Крещение огнем. Башня ласточки",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "Neoclassic",
        yearPublished: 2022,
        category: "Фантастика и фэнтези",
        series: "КИНО!!",
        fileName: "2798427-2.webp",
    },
    {
        title: "Ведьмак: из плоти и пламени",
        author: "Александра Мотыка",
        format: "Мягкий переплёт",
        publisher: "Белый Единорог",
        yearPublished: 2019,
        category: "Комиксы",
        series: "Ведьмак",
        fileName: "2746421.webp",
    },
    {
        title: "Ведьмак: Сезон гроз. Дорога без возврата",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "Neoclassic",
        yearPublished: 2022,
        category: "Фантастика и фэнтези",
        series: "КИНО!!",
        fileName: "2828490-2.webp",
    },
    {
        title: "Ведьмак: Крещение огнем",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "АСТ",
        yearPublished: 2017,
        category: "Фантастика и фэнтези",
        series: "Сапковский с иллюстрациями",
        fileName: "2574413-1.webp",
    },
    {
        title: "Ведьмак. Меч Предназначения. (Иллюстрации Дениса Гордеева)",
        author: "Анджей Сапковский",
        format: "Твердый переплёт",
        publisher: "АСТ",
        yearPublished: 2022,
        category: "Фантастика и фэнтези",
        series: "Сапковский с иллюстрациями",
        fileName: "2491421-2.webp",
    }
];

export default class Service {
    /**
     * @param {string} title 
     * @returns {string[]} array of matched titles
     */
    static getTitlesMatching(title) {
        const ans = [];
        books.forEach(book => {
            if (book.title.toLowerCase().includes(title.toLowerCase())) {
                ans.push(book.title);
            }
        });
        return ans;
    }

    /**
     * @param {string} value 
     * @param {number} limit 
     * @param {Function} sortFunc
     * @param {object.<string, string[]>} filters
     */
    static getData(value, limit, sortFunc, filters = {}) {
        const searchedBooks = books.filter(book => {
            return book.title.toLowerCase().includes(value.toLowerCase());
        });

        const filteredBooks = searchedBooks.filter(book => {
            for (const filterName in filters) {
                if (!filters[filterName].length) continue;
                if (!filters[filterName].includes(book[filterName])) {
                    return false;
                };
            }
            return true;
        });

        filteredBooks.sort((a, b) => sortFunc(a, b));

        const allFilters = {};
        for (const filterName of filtersNames) {
            allFilters[filterName] = books.map(book => book[filterName]);
        }

        return {
            pages: Math.ceil(filteredBooks.length / limit),
            filters: allFilters,
            /**
             * @param {number} page 
             * @returns {object[]} books
             */
            getBooks(page) {
                return filteredBooks.slice(
                    (page - 1) * limit,
                    (page - 1) * limit + limit);
            }
        }
    }

    /** @returns {string[]} array of popular titles */
    static getPopularTitles = () => ["Ведьмак"];
}



