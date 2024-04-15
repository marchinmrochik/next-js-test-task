import { useFilms } from "@/context/films";
import { collectUniqueUrlsByFilmId } from "@/utils/collectUniqueUrlsByFilmId";
import { useMemo, useState } from 'react';
import {Person} from "@/types/person";
import {StarshipMap} from "@/types/starship";
import {API_STARSHIPS} from "@/utils/constants";

export const usePersonData = (selectedPerson: Person) => {
    const { films } = useFilms();
    const [starshipsNode, setStarshipsNode] = useState<StarshipMap | null>(null);

    const filmsNode = useMemo(() => {
        if (!selectedPerson) {
            return [];
        }

        const filmsForPerson = selectedPerson.films.map(filmId => films[filmId - 1]);
        const starshipsForFilms = filmsForPerson.flatMap(film =>
            film.starships
                .filter(starship => selectedPerson.starships.includes(starship))
                .map(starship => ({
                    filmId: film.id,
                    url: `${API_STARSHIPS + starship}/`
                }))
        );

        const fetchStarshipsNode = async () => {
            const result: StarshipMap = await collectUniqueUrlsByFilmId(starshipsForFilms);
            return result;
        };

        fetchStarshipsNode().then(ships => {
            setStarshipsNode(ships)
        });

        return filmsForPerson;
    }, [films]);

    return { filmsNode, starshipsNode };
};
