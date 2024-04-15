import {useEffect, useState} from "react";
import axios from "axios";
import {Person} from "@/types/person";
import {API_PEOPLE} from "@/utils/constants";

export const useFetchPerson = (id: number) => {
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`${API_PEOPLE}/${id}/`);
                setSelectedPerson(response.data);
            } catch (error) {
                console.error("Error fetching person:", error);
            }
        };

        fetchPerson();
    }, [id]);

    return selectedPerson;
};
