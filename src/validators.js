// TODO: Рассмотреть функцию логгирования ошибок, их обработку, чтобы приложение не останавливалось.

/**
 * Throws an error if element has any passed nodes inside (except empty Text nodes)
 * @param {HTMLElement} element 
 */
export function ensureContentIsEmpty(element) {
    const textContent = element.textContent;
    
    if (textContent != null && textContent.trim() != "") {
        throw new Error(`Wrong content passed to ${element.tagName} element. Nothing is allowed to pass`)
    }
}

/**
 * Throws an error if element has any passed nodes inside except Text nodes
 * @param {HTMLElement} element 
 */
export function ensureContentIsText(elementNode) {
    for (const node of elementNode.childNodes) {
        if (node.nodeType != elementNode.TEXT_NODE) {
            throw new Error(`Wrong content passed to ${elementNode.tagName} element. Use only text`);
        }
    }
}