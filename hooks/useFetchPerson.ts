import {useEffect, useState} from "react";
import axios from "axios";
import {Person} from "@/types/person";
import {API_PEOPLE} from "@/utils/constants";

export const useFetchPerson = (id: number | string) => {
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); // Локальное состояние для ошибки

    useEffect(() => {
        fetchPerson(`${API_PEOPLE}/${id}/`);
    }, [id]);

    const fetchPerson = async (url: string) => {
        if (isLoading || !url) return;
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(url);
            setSelectedPerson(response.data);
        } catch (error) {
            let errorMessage: string;
            if (typeof error === 'string') {
                errorMessage = error;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = 'An unknown error occurred';
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return { selectedPerson, isLoading, error };
};
