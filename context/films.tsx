'use client'

import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Film} from "@/types/film";
import {API_FILMS} from "@/utils/constants";

interface FilmsProviderProps {
    children: React.ReactNode
}

interface FilmsProviderValue {
    films: Film[] | []
}

const FilmsContext = createContext<FilmsProviderValue>({ films: []});

export const FilmsProvider = ({ children }: FilmsProviderProps ) => {
    const [films, setFilms] = useState<Film[] | []>([]);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await axios.get(API_FILMS);
                const fetchedFilms = response.data.results;
                setFilms(fetchedFilms);

                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('cachedFilms', JSON.stringify(fetchedFilms));
                }
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };

        if (typeof localStorage !== 'undefined') {
            const cachedFilms = localStorage.getItem('cachedFilms');
            if (cachedFilms) {
                setFilms(JSON.parse(cachedFilms));
            } else {
                fetchFilms();
            }
        } else {
            fetchFilms();
        }
    }, []);

    return (
        <FilmsContext.Provider value={{ films }}>
            {children}
        </FilmsContext.Provider>
    );
};

export const useFilms = () => {
    const filmsContext = useContext(FilmsContext);

    if (!filmsContext) {
        throw new Error('useFilms must be used within a FilmsProvider');
    }

    return filmsContext;
};
