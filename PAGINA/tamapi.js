const http = require("node:http");
const fs = require("node:fs");
const puerto = 3000;

var base_tamagotchis = JSON.parse(fs.readFileSync("./PRUEBA_02/json/tamagotchis.json").toString());
var coleccion = JSON.parse(fs.readFileSync("./PRUEBA_02/json/mis_tamagotchis.json").toString());

var id_actual = 0;
for (let i = 0; i < coleccion.coleccion.length; i++) {
    if (coleccion.coleccion[i].id > id_actual) {
        id_actual = coleccion.coleccion[i].id;
    }
}
id_actual++;

const server = http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    switch (request.method) {
        case "GET":
            if (request.url === "/base") {
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify(base_tamagotchis));
                return;
            }

            if (request.url === "/coleccion") {
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify(coleccion));
                return;
            }

            fs.readFile("./PRUEBA_02" + request.url, (err, file) => {
                if (err) {
                    response.statusCode = 404;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({ mensaje: "Archivo o ruta no encontrada" }));
                    return;
                }
                response.statusCode = 200;
                response.end(file);
            });
            break;

        case "POST":
            let cuerpo = "";
            request.on("data", parte => cuerpo += parte);
            request.on("end", () => {
                const nuevoTamagotchi = JSON.parse(cuerpo);
                const objeto_guardar = {
                    id: id_actual,
                    nombre: nuevoTamagotchi.nombre,
                    especie: nuevoTamagotchi.especie,
                    generacion: nuevoTamagotchi.generacion,
                    año: nuevoTamagotchi.año,
                    edicion: nuevoTamagotchi.edicion,
                    imagen: nuevoTamagotchi.imagen || "img/PLACEHOLDER.png"
                };
                coleccion.coleccion.push(objeto_guardar);
                fs.writeFile("./PRUEBA_02/json/mis_tamagotchis.json", JSON.stringify(coleccion, null, 2), err => {
                    if (err) {
                        console.error(err);
                        response.statusCode = 500;
                        response.end(JSON.stringify({ mensaje: "Error al guardar el Tamagotchi" }));
                    } else {
                        id_actual++;
                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify({ mensaje: "Tamagotchi agregado a tu colección" }));
                    }
                });
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
