const http = require("http");
const url = require("url");
const querystring = require("querystring");
const Database = require("./module/database.js").default;

const PORT = 8080;

class Server {
    static startServer() {
        const server = http.createServer(async (req, res) => {
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            });

            if (req.method === "POST") {
                try {
                    // let body = "";
                    // req.on("data", (chunk) => {
                    //     if (chunk != null) {
                    //         body += chunk.toString();
                    //     }
                    // });

                    // req.on("end", async () => {
                    //     const q = url.parse(body, true)
                    //     let response = await Database.insertQuery(q.query.insert);
                    //     res.end(response);
                    // })

                    Server.handlePostRequest(req, res);

                } catch (error) {
                    console.error("DB error:", error);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: String(error) }));
                }
            }

            if (req.method === "GET") {
                let q = url.parse(req.url, true);
                const selectQuery = q.query["selectquery"];
                console.log("Test (startServer) Select Query: ", selectQuery);

                try {
                    const result = await Database.returnQuery(selectQuery);
                    console.log("Test (startServer): result - ", result);
                    res.end(JSON.stringify(result));
                } catch (error) {
                    console.error("DB error:", eroor);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: String(error) }));
                }
            }
        })

        server.listen(PORT);
        console.log(`Server is running and listening on ${PORT}`);
    }

    static async handlePostRequest(req, res) {
        let body = "";
        req.on("data", function(chunk) {
            if (chunk != null) {
                body += chunk.toString();
            }
        });
    
        req.on("end", async () => {
            // const q = url.parse(body, true);
            const parsed = querystring.parse(body);
            // console.log(q.path);
            let response = await Database.insertQuery(parsed.insert);
            res.end(JSON.stringify(response));
        })
    }
}

Server.startServer();