import React from 'react';
import PersonCard from "@/components/personCard";
import {Person} from "@/types/person";

interface PeopleListProps {
    people: Person[];
}
const PeopleList = ({people}:PeopleListProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
             data-testid={`people-list`}>
            {people.map(person => (
                <PersonCard key={person.id + person.name} person={person}/>
            ))}
        </div>
    );
};

export default PeopleList;
