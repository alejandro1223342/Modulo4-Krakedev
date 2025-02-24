const express = require("express");
const bodyParser = require("body-parser")
//Importar la función Client edel módulo pg
const { Client } = require("pg")

const client = new Client({
    user:"postgres",
    host:"192.168.1.45",
    database: "postgres",
    password: "root",
    port: 5432
});

const app = express();
const puerto = 3001;
app.listen(puerto, () => {

    console.log("Servidor listo en el puerto " + puerto)
});

app.use(bodyParser.json());

app.use("/contactos", (request, response, next) => {
    console.log("ingresa a middleware");
    console.log("headers", request.headers);
    console.log("body", request.body);

    next();
});


//contacto: id, nombre, apellido, celular

//Metodo get
app.get("/contactos", (request, response) => {
    const contactos = [
        
    ];
    console.log("ingresa a get")

    client.connect();
    client.query("SELECT * FROM contactos")
    .then(responseQuery => {
        console.log(responseQuery.rows);
        response.send(responseQuery.rows);
        client.end();
    })
    .catch(error => {
        console.error("Error en la consulta:", error);
        client.end();
    });

});

app.post("/contactos", (request, response) => {
    const { nombre, apellido, celular } = request.body;
    client.connect();
    client.query(
        "INSERT INTO contactos (nombre, apellido, celular) VALUES ($1, $2, $3)",
        [nombre, apellido, celular],
        (err) => {
            if (err) {
                console.error("Error al insertar:", err);
                response.status(500).send("Error al insertar");
            } else {
                response.send("Contacto agregado");
            }
        }
    );
});

app.put("/contactos/:id", (request, response) => {
    const id = request.params.id;
    const { nombre, apellido, celular } = request.body;
    client.connect();
    client.query(
        "UPDATE contactos SET nombre = $1, apellido = $2, celular = $3 WHERE id = $4",
        [nombre, apellido, celular, id],
        (err) => {
            if (err) {
                console.error("Error al actualizar:", err);
                response.status(500).send("Error al actualizar");
            } else {
                response.send("Contacto actualizado");
            }
        }
    );
});

// Eliminar un contacto
app.delete("/contactos/:id", (request, response) => {
    const id = request.params.id;
    client.connect();
    client.query("DELETE FROM contactos WHERE id = $1", [id], (err) => {
        if (err) {
            console.error("Error al eliminar:", err);
            response.status(500).send("Error al eliminar");
        } else {
            response.send("Contacto eliminado");
        }
    });
});

