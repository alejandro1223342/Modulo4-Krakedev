const IP="192.168.1.45";
const PORT=3001;
const URL = "http://"+IP+":"+PORT+"/"

export const getAllContacts = () => {
     console.log("getAllContacts")
    fetch(
        URL+"contactos"
    ).then(
        (response)=>{return response.json()}
    ).then(
        (body)=>{
            console.log(body);
        }
    )

}