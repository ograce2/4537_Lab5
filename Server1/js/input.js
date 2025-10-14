const INPUT = "input";
const TEXT = "text";
const LABEL = "label";
const DIV = "div";
const SELECT = "SELECT";
const INSERT = "INSERT";

class SQLInput{

    static getQueries = [SELECT];

    static postQueries = [INSERT];

    static sendSQLFromInput(inputID){
        return function(){
        const query = document.getElementById(inputID).value;

        if (SQLInput.getQueries.includes(query.split(" ")[0].toUpperCase())){
            console.log("call GET");
        } else if(SQLInput.getQueries.includes(query.split(" ")[0].toUpperCase())){
            console.log("call POST")
        } else{
            console.log("invalid query");
        }

    }
    }


    constructor(inputId, labelText, buttonText) {
        this.div = document.createElement(DIV);

        this.input = document.createElement(INPUT);
        this.input.type = TEXT;
        this.input.name = inputId;
        this.input.id = inputId;
        
        this.label = document.createElement(LABEL);
        this.label.innerHTML = labelText;
        this.label.for = inputId;

        this.btn = new Button(SQLInput.sendSQLFromInput(inputId), buttonText);

        this.div.appendChild(this.label);
        this.div.appendChild(this.input);
        this.div.appendChild(this.btn.getButton());
    }

    getInput(){
        return this.div;
    }


    

}