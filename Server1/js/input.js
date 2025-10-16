const INPUT = "input";
const TEXT = "text";
const LABEL = "label";
const DIV = "div";
const TEXT_AREA = "textarea";
const SELECT = "SELECT";
const INSERT = "INSERT";
const POST = "POST";
const GET = "GET";

const endPointRoot = "PLACEHOLDER";

class SQLInput {

    static getQueries = [SELECT];

    static postQueries = [INSERT];

    static sendSQLFromInput(inputID, responseID) {
        return function () {
            const query = document.getElementById(inputID).value;
            console.log("query: " + query);
            console.log("inputID: " + inputID);

            if (SQLInput.getQueries.includes(query.split(" ")[0].toUpperCase())) {
                SQLInput.sendSelect(query, responseID);
            } else if (SQLInput.postQueries.includes(query.split(" ")[0].toUpperCase())) {
                SQLInput.sendInsert(query, responseID);
            } else {
                document.getElementById(responseID).innerHTML = INVALID_QUERY;
            }

        }
    }

    static sendInsert(insertQuery, responseID){

        // FOR TESTING
        document.getElementById(responseID).innerHTML = "INSERT QUERY: " + insertQuery;
        return;

        const xhttp = new XMLHttpRequest();
        xhttp.open(POST, endpoint,  true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        const sendObj = {query: insertQuery};
        xhttp.send(JSON.stringify(sendObj));
        xhttp.onreadystatechange = function () {
            if (this.readState == 4 && this.status == 200){
                document.getElementById(responseID).innerHTML = this.responseText;
            }
        }
    }

    static sendSelect(selectQuery, responseID){

        document.getElementById(responseID).innerHTML = "SELECT QUERY: " + selectQuery;
        return;

        const queryParam = "?selectquery=";
        xhttp.open(GET, endpoint + queryParam + selectQuery, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readState == 4 && this.status == 200){
                document.getElementById(responseID).innerHTML = this.responseText;
            }
        }
    }


    constructor(inputId, responseID, labelText, buttonText) {
        this.div = document.createElement(DIV);

        this.input = document.createElement(TEXT_AREA);
        // this.input.type = TEXT;
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

    getInput() {
        return this.div;
    }




}