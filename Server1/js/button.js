const BUTTON = "button";

/**
 * The Button class creates a button element with a click action and text
 * to display on the label.
 */
class Button {

    /**
     * Creates a new instance of a button.
     */
    constructor(action, text) {
        this.btn = document.createElement(BUTTON);
        this.btn.onclick = action;
        this.btn.innerHTML = text;
    }

    /**
     * Returns the button HTML element associated with this button.
     * @returns {HTMLElement} the default SQL display element
     */
    getButton() {
        return this.btn;
    }
}