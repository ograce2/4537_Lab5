// const DIV = "div";
// const P = "p";
// const PRE_WRAP = "pre-wrap";

class DefaultSQL{


    constructor(header, rows, insertStatement, buttonText, responseID){
        this.defaultRowsDisplay = document.createElement(DIV);
        this.defaultRowsHeader = document.createElement(P);
        this.defaultRowsHeader.innerHTML = header;

        this.defaultRows = document.createElement(P);
        this.defaultRows.style.whiteSpace = PRE_WRAP;
        this.defaultRows.innerHTML = rows;   

        this.defaultBtn = new Button(function() {SQLInput.sendInsert(insertStatement, responseID)}, buttonText);
        
        this.defaultRowsDisplay.appendChild(this.defaultRowsHeader);
        this.defaultRowsDisplay.appendChild(this.defaultRows);
        this.defaultRowsDisplay.appendChild(this.defaultBtn.getButton());
    }

    getDefaultSQL(){
        return this.defaultRowsDisplay;
    }
}