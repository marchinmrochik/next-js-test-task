import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import PersonCard from './personCard';
import { Person } from '@/types/person';

const person: Person = {
    "id": 10,
    "name": "Obi-Wan Kenobi",
    "height": "182",
    "mass": "77",
    "hair_color": "auburn, white",
    "skin_color": "fair",
    "eye_color": "blue-gray",
    "birth_year": "57BBY",
    "gender": "male",
    "homeworld": 20,
    "films": [1],
    "species": [1],
    "vehicles": [38],
    "starships": [48,],
    "created": "2014-12-10T16:16:29.192000Z",
    "edited": "2014-12-20T21:17:50.325000Z",
    "url": "https://sw-api.starnavi.io/people/10/"
};

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn(),
}));

describe('PersonCard component', () => {

    it('renders person details correctly', () => {
        render(<PersonCard person={person} />);

        const nameElement = screen.getByText(person.name);
        expect(nameElement).toBeInTheDocument();

        const heightElement = screen.getByText(`Height: ${person.height}`);
        expect(heightElement).toBeInTheDocument();

        const massElement = screen.getByText(`Mass: ${person.mass}`);
        expect(massElement).toBeInTheDocument();

        const hairColorElement = screen.getByText(`Hair Color: ${person.hair_color}`);
        expect(hairColorElement).toBeInTheDocument();

        const skinColorElement = screen.getByText(`Skin Color: ${person.skin_color}`);
        expect(skinColorElement).toBeInTheDocument();

        const eyeColorElement = screen.getByText(`Eye Color: ${person.eye_color}`);
        expect(eyeColorElement).toBeInTheDocument();

        const birthYearElement = screen.getByText(`Birth Year: ${person.birth_year}`);
        expect(birthYearElement).toBeInTheDocument();

        const genderElement = screen.getByText(`Gender: ${person.gender}`);
        expect(genderElement).toBeInTheDocument();
    });
});
