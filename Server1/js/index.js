const SQL_INPUT_ID = "sqlInputID";
const SQL_RESPONSE_ID = "sqlResponseID";
const H2 = "h2";
const P = "p";
const PRE_WRAP = "pre-wrap";

const DEFAULT_INSERT = "INSERT INTO Patients (name, dateOfBirth) VALUES ('Sarah Brown', '1901-01-01'), ('John Smith', '1941-01-01'), ('Jack Ma', '1961-01-30'), ('Elon Musk', '1999-01-01');"

/**
 * The Index class creates elements and functionality needed for the index.html page.
 */
class Index {
    /**
     * Creates an instance of Index, setting up the SQL input area, default SQL display, and response display.
     */
    constructor() {
        this.sqlInput = new SQLInput(SQL_INPUT_ID, SQL_RESPONSE_ID, SQL_LABEL, SQL_BUTTON);
        document.body.appendChild(this.sqlInput.getInput());

        this.defaultSQL = new DefaultSQL(DEFAULT_ROWS_HEADER, DEFAULT_ROWS, DEFAULT_INSERT, SEND_DEFAULT_DATA, SQL_RESPONSE_ID);
        document.body.appendChild(this.defaultSQL.getDefaultSQL())

        this.responseDisplay = document.createElement(DIV);
        this.responseDisplay.innerHTML = "NO RESPONSE YET";
        this.responseDisplay.id = SQL_RESPONSE_ID;
        this.responseDisplay.style.whiteSpace = PRE_WRAP;
        document.body.appendChild(this.responseDisplay);
    }

}

new Index();