import axios from 'axios';
import {StarshipMap} from "@/types/starship";

interface DataProps {
    filmId: number,
    url: string
}
export async function collectUniqueUrlsByFilmId(data: DataProps[]) {
    const filmIdToStarshipsMap =  new Map<number, string[]>();

    data.forEach(item => {
        const filmId = item.filmId;
        const starshipUrl = item.url;

        if (filmIdToStarshipsMap.has(filmId)) {
            const starshipsForFilm = filmIdToStarshipsMap.get(filmId);
            if (!starshipsForFilm!.includes(starshipUrl)) {
                starshipsForFilm!.push(starshipUrl);
            }
        } else {
            filmIdToStarshipsMap.set(filmId, [starshipUrl]);
        }
    });

    const result: StarshipMap = {};

    for (const [filmId, starshipUrls] of filmIdToStarshipsMap.entries()) {
        const responses = await Promise.all(
            starshipUrls.map(async (url: string) => {
                try {
                    const response = await axios.get(url);
                    const starshipData = response.data;
                    const starshipId = starshipData.id;

                    if (!result[starshipId]) {
                        result[starshipId] = {
                            id: starshipId,
                            name: starshipData.name,
                            ...starshipData,
                            films: [filmId],
                        };
                    } else {
                        result[starshipId].films.push(filmId);
                    }
                } catch (error) {
                    let errorMessage: string;
                    if (typeof error === 'string') {
                        errorMessage = error;
                    } else if (error instanceof Error) {
                        errorMessage = error.message;
                    } else {
                        errorMessage = 'An unknown error occurred';
                    }
                    return errorMessage
                }
            })
        );
    }

    return result;
}
