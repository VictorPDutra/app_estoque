import { useState, useEffect } from "react";

export const useValidate = (local, name) => {
    const [localData, setLocalData] = useState([]);
    const [comparedData, setComparedData] = useState();

    useEffect(() => {
        const dataLocalStorage = getFromLocalStorage(local) || [];
        setLocalData(dataLocalStorage);
    }, []);

    useEffect(() => {
        const compared = localData.some((data) => data.name === name);
        setComparedData(compared);
    })

    console.log(comparedData);
}