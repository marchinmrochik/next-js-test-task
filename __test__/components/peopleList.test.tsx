import React from 'react';
import {render, screen, within} from '@testing-library/react';
import PeopleList from '@/components/peopleList';
import { mockPeople } from '../mockData';

describe('PeopleList', () => {
    it('renders list of PersonCard components based on provided people array', () => {
        render(<PeopleList people={mockPeople} />);

        mockPeople.forEach((person) => {
            const personCardElement = screen.getByTestId(`person-card-${person.id}`);
            expect(personCardElement).toBeInTheDocument();
        });

        const personCardElements = screen.getAllByTestId(/^person-card-/);
        expect(personCardElements.length).toBe(mockPeople.length);
    });

    it('renders no PersonCard components when people array is empty', () => {
        render(<PeopleList people={[]} />);

        const personCardElements = screen.queryAllByTestId(/^person-card-/);
        expect(personCardElements.length).toBe(0);
    });
});
