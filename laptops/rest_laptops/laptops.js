const IP="192.168.1.45";
const PORT=3001;
const URL = "http://"+IP+":"+PORT+"/"

export const getAllLaptops = (fnRefreshList) => {
     console.log("getAllLaptops")
    fetch(
        URL+"laptops"
    ).then(
        (response)=>{return response.json()}
    ).then(
        (body)=>{
            fnRefreshList(body);
        }
    )

}

export const saveLaptopRest = (laptops,fnShowMessage) =>{
    const config={
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            marca: laptops.marca, 
            procesador: laptops.procesador, 
            memoria: laptops.memoria,
            disco: laptops.disco 
                
        })
    }

    fetch(
        URL+"laptops",config
    ).then(response=> response.json)
    .then((body) => {
        fnShowMessage("se ha creado la laptop");
        console.log(body)
    });
}

export const updateLaptopRest = (laptops,fnShowMessage) =>{
    const config={
        method: "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:laptops.id,
            marca: laptops.marca, 
            procesador: laptops.procesador, 
            memoria: laptops.memoria,
            disco: laptops.disco 
                
        })
    }

    fetch(
        URL+"laptops/"+laptops.id,config
    ).then(response=> response.json)
    .then((body) => {
        fnShowMessage("laptop Actualizada");
        console.log(body)
    });
}

export const deleteLaptopRest = (laptops,fnShowMessage) =>{
    const config={
        method: "DELETE",
    }

    fetch(
        URL+"laptops/"+laptops.id,config
    ).then(response=> response.json)
    .then((body) => {
        fnShowMessage("Se ha eliminado la laptop");
        console.log(body)
    });
}
