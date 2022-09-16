import { useState, useEffect } from "react";

const usePersistedState = (key, value) => {

    const [state, setState] = useState(value);

    useEffect(() => {
        const data = sessionStorage.getItem(key);
        if (data) {
            setState(JSON.parse(data));
        }
    }, [key]);

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export default usePersistedState;