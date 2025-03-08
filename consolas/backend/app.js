// 1. Importar expres despúes de instalar su dependecia
const express = require('express');
// 2. Setear express
const app = express();
// 3. Declarar Puerto que usaremos
const port = 3000;
// 4. Importar body-parsers después de instalar su dependencia
const bodyParser = require('body-parser');
// 5. Setear body-parser en el middleware para leer el body de una solicitud HTTP
app.use(bodyParser.json());
//6. Usar PostgreSQL
const sql = require('../data/datasource/Postgres')


app.get("/api/consolas", async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM consolas");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/consolas/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await sql.query("SELECT * FROM consolas WHERE con_id = $1", [id]);
        if (result.rows.length) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: "Consola no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva laptop en PostgreSQL
app.post("/api/consolas", async (req, res) => {
    const { con_nombre, con_almacenamiento, con_cantidad } = req.body;
    console.log(req.body);
    try {
        const result = await sql.query(
            "INSERT INTO consolas (con_nombre,con_almacenamiento,con_cantidad) VALUES ($1, $2, $3) RETURNING *",
            [con_nombre, con_almacenamiento, con_cantidad]
        );
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});

// Actualizar una laptop en PostgreSQL
app.put("/api/consolas/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { con_nombre, con_almacenamiento, con_cantidad } = req.body;
    try {
        const result = await sql.query(
            "UPDATE consolas SET con_nombre = $1, con_almacenamiento = $2, con_cantidad = $3 WHERE con_id = $4 RETURNING *",
            [con_nombre, con_almacenamiento, con_cantidad, id]
        );
        if (result.rows.length) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: "Consola no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una laptop en PostgreSQL
app.delete("/api/consolas/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await sql.query("DELETE FROM consolas WHERE con_id = $1 RETURNING *", [id]);
        if (result.rows.length) {
            res.json({ message: "Consola eliminada correctamente" });
        } else {
            res.status(404).json({ message: "Consola no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Listener
app.listen(port, () => {
    console.log(`Servicio iniciado en el puerto ${port}`);
});