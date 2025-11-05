// tamapi.js
const http = require("node:http");
const fs = require("node:fs");
const puerto = 3000;

// Leer el JSON de tamagotchis
var archivo_json = JSON.parse(fs.readFileSync("./PRUEBA_02/json/tamagotchis.json").toString());

const server = http.createServer((request, response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    switch (request.method) {
        case "GET":
            if (request.url == "/") {
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify(archivo_json));
                return 0;
            }

            // Si pides una imagen (por ejemplo, /img/PLACEHOLDER.png)
            fs.readFile("./PRUEBA_02" + request.url, (err, file) => {
                if (err) {
                    response.statusCode = 404;
                    response.setHeader("Content-Type", "application/json");
                    const objeto_error = {
                        "mensaje": "No tengo ese archivo o ruta"
                    };
                    response.end(JSON.stringify(objeto_error));
                    return 0;
                }

                response.statusCode = 200;
                response.end(file);
            });
            break;

        case "OPTIONS":
            response.writeHead(204);
            response.end();
            break;
    }

});

server.listen(puerto, () => {
    console.log("Servidor Tamagotchi escuchando en http://localhost:" + puerto);
});
