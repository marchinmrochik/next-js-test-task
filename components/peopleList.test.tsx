import React from 'react';
import { render } from '@testing-library/react';
import PeopleList from './peopleList';
import { Person } from '@/types/person';

const people: Person[] = [
    {
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
    },
    {
        "id": 12,
        "name": "Wilhuff Tarkin",
        "height": "180",
        "mass": "unknown",
        "hair_color": "auburn, grey",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "64BBY",
        "gender": "male",
        "homeworld": 21,
        "films": [1],
        "species": [1],
        "vehicles": [],
        "starships": [],
        "created": "2014-12-10T16:26:56.138000Z",
        "edited": "2014-12-20T21:17:50.330000Z",
        "url": "https://sw-api.starnavi.io/people/12/"
    },
    {
        "id": 14,
        "name": "Han Solo",
        "height": "180",
        "mass": "80",
        "hair_color": "brown",
        "skin_color": "fair",
        "eye_color": "brown",
        "birth_year": "29BBY",
        "gender": "male",
        "homeworld": 22,
        "films": [1],
        "species": [1],
        "vehicles": [],
        "starships": [10],
        "created": "2014-12-10T16:49:14.582000Z",
        "edited": "2014-12-20T21:17:50.334000Z",
        "url": "https://sw-api.starnavi.io/people/14/"
    }
];

jest.mock('./personCard', () => ({
    __esModule: true,
    default: jest.fn(() => <div data-testid="person-card-mock" />),
}));

describe('PeopleList component', () => {
    it('renders correctly with a list of people', () => {
        const { getAllByTestId } = render(<PeopleList people={people} />);

        const personCards = getAllByTestId('person-card-mock');
        expect(personCards).toHaveLength(people.length);
    });

    it('renders no PersonCard components when people array is empty', () => {
        const { queryByTestId } = render(<PeopleList people={[]} />);

        const personCard = queryByTestId('person-card-mock');
        expect(personCard).toBeNull();
    });
});
