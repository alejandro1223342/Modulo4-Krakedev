const IP = '4320-2800-430-b385-35e-dd37-e696-ab4d-7275.ngrok-free.app';
//const PORT = ''; // No necesitas el puerto en la URL de ngrok
const PATH = 'api/consolas';
const URL = `https://${IP}/${PATH}`;


export const getAllConsolas = async () => {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
}

export const saveConsolasRest = async ({ con_nombre, con_almacenamiento, con_cantidad }, fnShowMessage) => {
    const config = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            con_nombre : con_nombre, 
            con_almacenamiento : con_almacenamiento, 
            con_cantidad : con_cantidad
        
        })

    };
    console.log(URL)
    const response = await fetch(URL, config);
    const result = await response.json();
    fnShowMessage();
    return result;
}

export const updateConsolasRest = async ({ id, con_nombre, con_almacenamiento, con_cantidad }, fnShowMessage) => {
    const PARAM = `/${id}`;
    const config = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            con_nombre : con_nombre, 
            con_almacenamiento : con_almacenamiento, 
            con_cantidad : con_cantidad
        })
    };
    const response = await fetch(URL + PARAM, config);
    const result = await response.json();
    fnShowMessage();

    return result;
}


export const deleteConsolasRest = async (id) => {
    const PARAM = `/${id}`;
    const config = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    }
    const response = await fetch(URL + PARAM, config);
    const result = await response.json();
    
    return result;
}