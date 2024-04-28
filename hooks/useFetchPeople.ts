import { useState, useEffect } from 'react';
import axios from 'axios';
import { Person } from '@/types/person';
import { API_PEOPLE } from '@/utils/constants';

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Person[];
}

const usePeopleData = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); // Локальное состояние для ошибки

    useEffect(() => {
        fetchData(API_PEOPLE);
    }, []);

    const fetchData = async (url: string) => {
        if (isLoading || !url) return;
        setIsLoading(true);
        setError(null)

        try {
            const response = await axios.get<ApiResponse>(url);
            setPeople(prevPeople => [...prevPeople, ...response.data.results]);
            setNextPage(response.data.next);
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

    const loadNextPage = async () => {
        if (nextPage) {
            await fetchData(nextPage);
        }
    };

    return { people, isLoading, error, loadNextPage };
};

export default usePeopleData;
