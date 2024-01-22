/** 
 * @param {string} popupHTML 
 * @param {string?} className 
 */
export default function createPopupOverlayHTML(popupHTML, className) {
    className ??= "";
    return `
        <div class="popup-overlay">
            ${popupHTML}
        </div>
    `;
}