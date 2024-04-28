import {render, screen} from '@testing-library/react';
import PersonCard from '@/components/personCard';
import {mockPerson} from "@/__test__/mockData";

describe
('PersonCard', () => {
    it('renders person data correctly', () => {
        render(<PersonCard person={mockPerson}/>);

        const nameElement = screen.getByText(mockPerson.name);
        expect(nameElement).toBeInTheDocument();

        expect(screen.getByText(`Height: ${mockPerson.height}`)).toBeInTheDocument();
        expect(screen.getByText(`Mass: ${mockPerson.mass}`)).toBeInTheDocument();
        expect(screen.getByText(`Hair Color: ${mockPerson.hair_color}`)).toBeInTheDocument();
        expect(screen.getByText(`Skin Color: ${mockPerson.skin_color}`)).toBeInTheDocument();
        expect(screen.getByText(`Eye Color: ${mockPerson.eye_color}`)).toBeInTheDocument();
        expect(screen.getByText(`Birth Year: ${mockPerson.birth_year}`)).toBeInTheDocument();
        expect(screen.getByText(`Gender: ${mockPerson.gender}`)).toBeInTheDocument();
    });

    it('links to the correct person details page', () => {
        render(<PersonCard person={mockPerson}/>);

        const linkElement = screen.getByRole('link');

        expect(linkElement).toHaveAttribute('href', `/person/${mockPerson.id}`);
    });
});
