/**
 * The DefaultSQL class creates a display of default info and a button to insert
 * that infor into the database.
 */
class DefaultSQL {
    /**
     * Creates an instance of DefaultSQL.
     * @param {string} header - The header text for the SQL display.
     * @param {string} rows - The rows of the SQL display.
     * @param {string} insertStatement - The SQL insert statement.
     * @param {string} buttonText - The text for the button.
     * @param {string} responseID - The ID for the response.
     */
    constructor(header, rows, insertStatement, buttonText, responseID) {
        this.defaultRowsDisplay = document.createElement(DIV);
        this.defaultRowsHeader = document.createElement(P);
        this.defaultRowsHeader.innerHTML = header;

        this.defaultRows = document.createElement(P);
        this.defaultRows.style.whiteSpace = PRE_WRAP;
        this.defaultRows.innerHTML = rows;

        this.defaultBtn = new Button(function () { SQLInput.sendInsert(insertStatement, responseID) }, buttonText);

        this.defaultRowsDisplay.appendChild(this.defaultRowsHeader);
        this.defaultRowsDisplay.appendChild(this.defaultRows);
        this.defaultRowsDisplay.appendChild(this.defaultBtn.getButton());
    }

    /**
     * Gets the default SQL display element
     * @returns {HTMLElement} the default SQL display element
     */
    getDefaultSQL() {
        return this.defaultRowsDisplay;
    }
}