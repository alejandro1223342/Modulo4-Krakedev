const express = require("express");
const bodyParser = require("body-parser")

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
        { id: 1, nombre: "Alejandro", apellido: "Muñoz", celular: "0989650479" },
        { id: 2, nombre: "Paula", apellido: "Muñoz", celular: "1234567891" },
        { id: 3, nombre: "Javier", apellido: "Muñoz", celular: "1234567892" }
    ];
    console.log("ingresa a get")
    response.send(contactos);
});

app.post("/contactos", (request, response) => {
    request.body.id="1";
    response.send(request.body);
});

app.put("/contactos/:idParam", (request, response) => {
    const id=request.params.idParam;
    console.log("id",id);
    response.send(request.body);
});

app.delete("/contactos/:id", (request, response) => {
    const id=request.params.id;
    console.log("id",id)
    response.send()
});

