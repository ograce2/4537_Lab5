const INPUT = "input";
const TEXT = "text";
const LABEL = "label";
const DIV = "div";
const TEXT_AREA = "textarea";
const SELECT = "SELECT";
const INSERT = "INSERT";
const POST = "POST";
const GET = "GET";
const SELECT_QUERY_PARAM = "?selectquery=";
const NEWLINE = "\n";

const endPointRoot = "http://localhost:8080/";

/**
 * The SQL Input class provides methods and HTML elements for users to select and insert
 * elements into a databas
 */
class SQLInput {
    // Queries that can be sent via GET
    static getQueries = [SELECT];

    // Queries that can be sent via POST
    static postQueries = [INSERT];

    /**
     * Generates a function to send SQL from the input area to the server
     * @param {string} inputID - The ID of the input area
     * @param {string} responseID - The ID of the response area
     * @returns {Function} A function that sends the SQL query from the input area to the server
     */
    static sendSQLFromInput(inputID, responseID) {
        return function () {
            const query = document.getElementById(inputID).value;

            if (SQLInput.getQueries.includes(query.split(" ")[0].toUpperCase())) {
                SQLInput.sendSelect(query, responseID);
            } else if (SQLInput.postQueries.includes(query.split(" ")[0].toUpperCase())) {
                SQLInput.sendInsert(query, responseID);
            } else {
                document.getElementById(responseID).innerHTML = INVALID_QUERY;
            }

            // If the query contains DROP or UPDATE, show the gif
            // remove the gif if the query is valid
            if (query.toUpperCase().includes("DROP") || query.toUpperCase().includes("UPDATE")) {
                const img = document.createElement("img");
                img.src = "../Server1/no-no-no.gif";
                img.alt = "No no no";
                img.width = 500;
                img.height = 500;
                document.getElementById(responseID).appendChild(img);
            }
        }
    }

    /**
     * Parses the response from the server
     * @param {string} response 
     * @returns {string} The parsed response
     */
    static parseResponse(response) {
        let responseString = "";
        const responseObj = JSON.parse(response);

        responseObj.forEach(element => {
            responseString += JSON.stringify(element);
            responseString += NEWLINE;
        });

        return responseString;
    }

    /**
     * Sends an SQL INSERT query to the server
     * @param {string} insertQuery The SQL INSERT query to send
     * @param {string} responseID The ID of the response area
     */
    static sendInsert(insertQuery, responseID) {
        const xhttp = new XMLHttpRequest();
        xhttp.open(POST, endPointRoot, true);

        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.send(`insert=${insertQuery}`);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById(responseID).innerHTML = this.responseText;
            } else {
                document.getElementById(responseID).innerHTML = this.responseText;
            }
        }
    }

    /**
     * Sends an SQL SELECT query to the server
     * @param {string} selectQuery The SQL SELECT query to send
     * @param {string} responseID The ID of the response area
     */
    static sendSelect(selectQuery, responseID) {
        const xhttp = new XMLHttpRequest();

        const queryParam = SELECT_QUERY_PARAM;
        xhttp.open(GET, endPointRoot + queryParam + selectQuery, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById(responseID).innerHTML = SQLInput.parseResponse(this.responseText);
            } else {
                document.getElementById(responseID).innerHTML = this.responseText;
            }
        }
    }

    /**
     * Creates an instance of SQLInput.
     * @param {string} inputId - The ID for the SQL input area.
     * @param {string} responseID - The ID for the SQL response area.
     * @param {string} labelText - The text for the label.
     * @param {string} buttonText - The text for the button.
     */
    constructor(inputId, responseID, labelText, buttonText) {
        this.div = document.createElement(DIV);

        this.input = document.createElement(TEXT_AREA);
        this.input.name = inputId;
        this.input.id = inputId;

        this.label = document.createElement(LABEL);
        this.label.innerHTML = labelText;
        this.label.for = inputId;

        this.btn = new Button(SQLInput.sendSQLFromInput(inputId, responseID), buttonText);

        this.div.appendChild(this.label);
        this.div.appendChild(this.input);
        this.div.appendChild(this.btn.getButton());
    }

    /**
     * Returns the SQL input area element
     * @returns {HTMLElement} the SQL input area element
     */
    getInput() {
        return this.div;
    }
}