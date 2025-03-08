import { useCallback, useState } from "react"
import { getAllConsolas } from "../rest_client/consolas";

export const useConsolas = () => {
    const [data, setData] = useState([]);
    const loadConsolas = useCallback(async () => {
        try {
            const result = await getAllConsolas();
            setData(result);
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo obtener los datos.');
        }
    }, []);

    return { data, loadConsolas };
}