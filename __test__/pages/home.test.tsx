import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Page from '@/app/page';
import {mockPeople} from "@/__test__/mockData";

describe('Home Component', () => {
    it('renders Star Wars Characters header', () => {
        render(<Page />);
        const headerElement = screen.getByText(/Star Wars Characters/i);

        expect(headerElement).toBeInTheDocument();
    });

    it('displays people list when data is loaded', async () => {
        jest.mock('../../hooks/useFetchPeople', () => {
            return jest.fn(() => ({
                people: mockPeople,
                isLoading: false,
                loadNextPage: jest.fn(),
                error: null
            }));
        });

        render(<Page />);

        await waitFor(() => {
            const PeopleListElement = screen.getByTestId(`people-list`);
            expect(PeopleListElement).toBeInTheDocument();

            const loadingElement = screen.queryByText(/Loading.../i);
            expect(loadingElement).not.toBeInTheDocument();
        });
    });

    it('displays loading message when isLoading is true', () => {
        jest.mock('../../hooks/useFetchPeople', () => {
            return jest.fn(() => ({
                people: [],
                isLoading: true,
                loadNextPage: jest.fn(),
            }));
        });

        render(<Page />);

        const loadingElement = screen.queryByText(/Loading.../i);
        expect(loadingElement).toBeInTheDocument();
    });
});
