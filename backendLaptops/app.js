const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const puerto = 3001;

//Importar la función Client edel módulo pg
const { Pool } = require("pg"); // Usar Pool en lugar de Client

const pool = new Pool({
    user: "postgres",
    host: "192.168.1.45",
    database: "postgres",
    password: "root",
    port: 5432
});

app.use(bodyParser.json());

app.listen(puerto, () => {
    console.log("Servidor listo en el puerto " + puerto)
});

app.use("/laptops", (request, response, next) => {
    console.log("ingresa a middleware");
    console.log("headers", request.headers);
    console.log("body", request.body);

    next();
});

app.get("/laptops", (request, response) => {
    console.log("Ingresa a GET");
    pool.query("SELECT * FROM laptops")
        .then(result => {
            response.json(result.rows);
        })
        .catch(error => {
            console.error("Error en la consulta:", error);
            response.status(500).send("Error en la consulta");
        });
});


app.post("/laptops", (request, response) => {
    const { marca, procesador, memoria, disco } = request.body;

    pool.query(
        "INSERT INTO laptops (marca, procesador, memoria, disco) VALUES ($1, $2, $3, $4)",
        [marca, procesador, memoria, disco]
    )
    .then(() => {
        response.send("Laptop agregada");
    })
    .catch(error => {
        console.error("Error al insertar:", error);
        response.status(500).send("Error al insertar");
    });
});


app.put("/laptops/:id", (request, response) => {
    const id = request.params.id;
    const {  marca, procesador, memoria, disco } = request.body;

    pool.query(
        "UPDATE laptops SET marca=$1, procesador=$2, memoria=$3, disco=$4 WHERE id=$5",
        [marca, procesador, memoria, disco, id],
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



app.delete("/laptops/:id", (request, response) => {
    const id = request.params.id;

    pool.query("DELETE FROM laptops WHERE id=$1", [id])
    .then(() => {
        response.send(`Laptop con ID ${id} eliminada`);
    })
    .catch(error => {
        console.error("Error al eliminar:", error);
        response.status(500).send("Error al eliminar");
    });
});