const SQL_INPUT_ID = "sqlInputID";

class Index{
    constructor(){
        this.sqlInput = new SQLInput(SQL_INPUT_ID, SQL_LABEL, SQL_BUTTON);
        document.body.appendChild(this.sqlInput.getInput());
    }

}

new Index();