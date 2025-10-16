const SQL_INPUT_ID = "sqlInputID";
const SQL_RESPONSE_ID = "sqlResponseID";
const H2 = "h2";
const P = "p";
const PRE_WRAP = "pre-wrap";

const DEFAULT_INSERT = "INSERT INTO Patient (name, dateOfBirth) VALUES ('Sarah Brown', '1901-01-01'), ('John Smith', '1941-01-01'), ('Jack Ma', '1961-01-30'), ('Elon Musk', '1999-01-01');"

class Index{
    constructor(){
        this.sqlInput = new SQLInput(SQL_INPUT_ID, SQL_RESPONSE_ID, SQL_LABEL, SQL_BUTTON);
        document.body.appendChild(this.sqlInput.getInput());

        // this.defaultRowsDisplay = document.createElement(DIV);
        // this.defaultRowsHeader = document.createElement(P);
        // this.defaultRowsHeader.innerHTML = DEFAULT_ROWS_HEADER;
        // this.defaultRowsDisplay.appendChild(this.defaultRowsHeader);
        // this.defaultRows = document.createElement(P);
        // this.defaultRows.style.whiteSpace = PRE_WRAP;
        // this.defaultRows.innerHTML = DEFAULT_ROWS;
        // this.defaultRowsDisplay.appendChild(this.defaultRows);
        // document.body.appendChild(this.defaultRowsDisplay);

        // this.defaultBtn = new Button(function(){console.log("send default data")}, SEND_DEFAULT_DATA);
        // document.body.appendChild(this.defaultBtn.getButton());

        this.defaultSQL = new DefaultSQL(DEFAULT_ROWS_HEADER, DEFAULT_ROWS, DEFAULT_INSERT, SEND_DEFAULT_DATA, SQL_RESPONSE_ID);
        document.body.appendChild(this.defaultSQL.getDefaultSQL())

        this.responseDisplay = document.createElement(DIV);
        this.responseDisplay.innerHTML = "NO RESPONSE YET";
        this.responseDisplay.id = SQL_RESPONSE_ID;
        document.body.appendChild(this.responseDisplay);
    }

}

new Index();