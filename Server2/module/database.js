import mysql from "mysql";

const DROP = "DROP ";
const UPDATE = "UPDATE ";

class Database {
    static CONNECTION = null;

    static validateQuery(query) {
        if (query === undefined || query.toUpperCase().includes(DROP) || query.toUpperCase().includes(UPDATE)) {
            return false;
        }
        return true;
    }

    static createConnection() {
        const connection = mysql.createConnection({
            host: "localhost",
            database: "lab6-database",
            user: "root",
            password: ""
        });

        connection.connect((error) => {
            if (error)
                throw error;

            console.log("Test(createConnection): Connected!")
        })

        Database.CONNECTION = connection;

        // connection.connect(function(error) {
        //     if (error)
        //         throw error;

        //     console.log("Test (returnQuery): Connected!");

        //     let sql = "SELECT * FROM patient";

        //     connection.query(sql, function(error, result) {
        //         if (error)
        //             throw error; 

        //         // console.log(`Test (returnQuery): ${result.name}, ${result.dateOfBirth}`);
        //         console.log(JSON.stringify(result));
        //     });
        // });
    }

    static returnQuery(query) {
        if (Database.CONNECTION === null) {
            Database.createConnection();
        }

        const connection = Database.CONNECTION;

        console.log(query);

        if (!this.validateQuery(query)) {
            return "INVALID QUERY";
        }

        return new Promise((resolve, reject) => {
            if (!query) {
                return resolve("No query!"); // TODO: resolve or reject? idk yet
            }

            connection.query(query, (error, result) => {
                if (error)
                    return reject(error);

                console.log(`Test (returnQuery): ${JSON.stringify(result)}`);

                resolve(result);
            });
        });
    }

    static insertQuery(query) {
        if (Database.CONNECTION === null) {
            Database.createConnection();
        }

        console.log("Test(insert): query - ", query);

        if (!this.validateQuery(query)) {
            return "INVALID QUERY";
        }

        const connection = Database.CONNECTION;

        return new Promise((resolve, reject) => {
            if (!query) {
                return resolve("No query!"); // TODO: resolve or reject? idk yet
            }

            connection.query(query, (error, result) => {
                if (error)
                    return reject(error);

                console.log(`Test (insertQuery): Data successfully inserted!`);
                console.log(`Test (insertQuery): ${result.insertId}!`);
                resolve(`Data successfully inserted!`);
            });
        });
    }
}

export default Database;