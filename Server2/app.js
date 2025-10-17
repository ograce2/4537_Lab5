const http = require("http");
const url = require("url");
const querystring = require("querystring");
const Database = require("./module/database.js").default;

const PORT = 8080;
const GET = "GET";
const POST = "POST";

class Server {
    /**
     * Starts the HTTP server
     */
    static startServer() {
        const server = http.createServer((req, res) => {
            if (req.method === POST) {
                Server.handlePostRequest(req, res);
            }

            if (req.method === GET) {
                Server.handleGetRequest(req, res);
            }
        })

        server.listen(PORT);
        console.log(`Server is running and listening on ${PORT}`);
    }

    /**
     * Handles POST requests to the server
     * @param {http.IncomingMessage} req request object
     * @param {http.ServerResponse} res response object
     */
    static handlePostRequest(req, res) {
        let body = "";
        req.on("data", function (chunk) {
            if (chunk != null) {
                body += chunk.toString();
            }
        });

        req.on("end", async () => {
            try {
                const parsed = querystring.parse(body);
                let response = await Database.insertQuery(parsed.insert);

                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                });
                res.end(JSON.stringify(response));
            } catch (error) {
                console.error("Database error (Post):", error);
                res.writeHead(500, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                });
                res.end(error.sqlMessage);
            }
        });
    }

    /**
     * Handles GET requests to the server
     * @param {http.IncomingMessage} req request object
     * @param {http.ServerResponse} res response object
     */
    static async handleGetRequest(req, res) {
        try {
            let q = url.parse(req.url, true);
            const selectQuery = q.query["selectquery"];
            const result = await Database.returnQuery(selectQuery);

            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            });
            res.end(JSON.stringify(result));
        } catch (error) {
            console.error("Database error (Get): ", error);
            res.writeHead(500, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            });
            res.end(error.sqlMessage);
        }
    }
}

Server.startServer();