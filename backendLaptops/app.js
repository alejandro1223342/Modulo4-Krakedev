const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const puerto = 3001;

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
    const laptops = [
        { id: 1, marca: "Lenovo", procesador: "Inter core i5", memoria: "16GB",disco:"1TB" },
        { id: 2, marca: "Lenovo", procesador: "Inter core i5", memoria: "16GB",disco:"1TB" },
        { id: 3, marca: "Lenovo", procesador: "Inter core i5", memoria: "16GB",disco:"1TB" }

    ];
    console.log("ingresa a get")

    response.send(laptops);
});


app.post("/laptops", (request, response) => {
    request.body.id=4;
    response.send(request.body);
});

app.put("/laptops/:idParam", (request, response) => {
    const id=request.params.idParam;
    console.log("id",id);
    response.send(request.body);
});

app.delete("/laptops/:id", (request, response) => {
    const id=request.params.id;
    console.log("id",id)
    response.send()
});