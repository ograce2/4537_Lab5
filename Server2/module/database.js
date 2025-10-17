import mysql from "mysql";

const DROP = "DROP ";
const UPDATE = "UPDATE ";
const ERROR_MSG = "Invalid query! Only use SELECT or INSERT";

class Database {
    // Holds the connection to the database
    static CONNECTION = null;

    /**
     * Validates a query to ensure it does not contain DROP or UPDATE statements
     * @param {string} query the SQL query to validate
     * @returns {boolean} true if valid, false otherwise
     */
    static validateQuery(query) {
        if (query === undefined || query.toUpperCase().includes(DROP) || query.toUpperCase().includes(UPDATE)) {
            return false;
        }
        return true;
    }

    /**
     * Creates a connection to the database
     */
    static createConnection() {
        const connection = mysql.createConnection({
            host: "sql3.freesqldatabase.com",
            database: "sql3803373",
            user: "sql3803373",
            password: "QuUrCREAeE",
            port: 3306
        });

        connection.connect((error) => {
            if (error) {
                console.error(error);
                throw error;
            }
        });

        Database.CONNECTION = connection;
    }

    /**
     * Executes a query and returns the result
     * 
     * @param {string} query the SQL query to execute
     * @returns {Promise} result of the query
     */
    static returnQuery(query) {
        if (Database.CONNECTION === null) {
            Database.createConnection();
        }

        const connection = Database.CONNECTION;

        if (!this.validateQuery(query)) {
            return ERROR_MSG;
        }

        return new Promise((resolve, reject) => {
            if (!query) {
                return resolve(ERROR_MSG);
            }

            connection.query(query, (error, result) => {
                if (error)
                    return reject(error);

                resolve(result);
            });
        });
    }

    /**
     * Inserts a new record into the database
     * @param {string} query the SQL query to execute
     * @returns {Promise} result of the query
     */
    static insertQuery(query) {
        if (Database.CONNECTION === null) {
            Database.createConnection();
        }

        if (!this.validateQuery(query)) {
            return ERROR_MSG;
        }

        const connection = Database.CONNECTION;

        return new Promise((resolve, reject) => {
            if (!query) {
                return resolve(ERROR_MSG);
            }

            connection.query(query, (error, result) => {
                if (error)
                    return reject(error);

                resolve("Data successfully inserted!");
            });
        });
    }
}

export default Database;