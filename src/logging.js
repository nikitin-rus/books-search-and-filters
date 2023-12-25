// TODO: Добавить фичу для логгирования ошибок

export function logCustomElementState(customElementNode, message) {
    console.log(`[${customElementNode.tagName} custom element] ${message}`);
}