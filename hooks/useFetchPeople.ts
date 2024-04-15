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

    useEffect(() => {
        fetchData(API_PEOPLE);
    }, []);

    const fetchData = async (url: string) => {
        if (isLoading || !url) return; // Предотвращаем множественные запросы и обрабатываем конец пагинации
        setIsLoading(true);

        try {
            const response = await axios.get<ApiResponse>(url);
            setPeople(prevPeople => [...prevPeople, ...response.data.results]);
            setNextPage(response.data.next);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadNextPage = () => {
        if (nextPage) {
            fetchData(nextPage);
        }
    };

    return { people, isLoading, loadNextPage };
};

export default usePeopleData;
