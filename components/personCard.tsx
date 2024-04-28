import Link from 'next/link';
import { Person } from '@/types/person';

interface PersonCardProps {
    person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => {
    return (
        <div className="bg-orange-400 p-4 rounded-lg block"
             data-testid={`person-card-${person.id}`}>
            <Link href={`/person/${person.id}`}>
                <h2 className="text-xl font-bold mb-2">{person.name}</h2>
                <p>Height: {person.height}</p>
                <p>Mass: {person.mass}</p>
                <p>Hair Color: {person.hair_color}</p>
                <p>Skin Color: {person.skin_color}</p>
                <p>Eye Color: {person.eye_color}</p>
                <p>Birth Year: {person.birth_year}</p>
                <p>Gender: {person.gender}</p>
            </Link>
        </div>
    );
};

export default PersonCard;
