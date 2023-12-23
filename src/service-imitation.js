// TODO: Переделать все методы для работы с объектом

// const books = {
//     "Ясунари Кавабата": "Тысячекрылый журавль",
//     "Ясунари Кавабата": "Танцовщица из Идзу",
//     "Ясунари Кавабата": "Стон горы",
// }

const titles = ["Тысячекрылый журавль", "Танцовщица из Идзу", "Стон горы"];

/**
 * @param {string} title 
 * @returns {string[]} array of matched titles
 */
export function getTitlesMatching(title) {
    const ans = [];
    titles.forEach(item => {
        if (item.toLowerCase().includes(title.toLowerCase())) {
            ans.push(item);
        }
    })
    return ans;
}

/**
 * @returns {string[]} array of popular titles
 */
export function getPopularTitles() {
    return titles;
}