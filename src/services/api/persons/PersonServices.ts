import { IPerson } from "../../../model/Persons/person";
import { API } from "../config";




const getAll = async ():Promise<IPerson[] | Error> => {
    try{
        const {data} = await API.get("/person")

        if(data) return data;
        return new Error("Erro de listar os usuarios")
    }catch(error){
        console.error(error)
        return new Error((error as {message: string}).message || "Erro de listar os usuarios")
    }
    

}

const createPerson = async (name: string, salary: string, approved: boolean, sexy: string):Promise<IPerson[] | Error > => {
    const body = {
        name: name,
        salary: salary,
        approved: approved,
        sexy: sexy,
    }
    try {
        const {data} = await API.post("/person", body);
        if(data) return data;
        return new Error("Erro de cadastrar os usuarios");
    } catch (error) {
        console.error(error)
        return new Error((error as {message: string}).message || "Erro de cadastrar os usuarios")
    }
}


export const PersonService = {
    getAll,
    createPerson,
}