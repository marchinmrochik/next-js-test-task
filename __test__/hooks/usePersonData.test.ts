import {renderHook, act, waitFor} from '@testing-library/react';
import {usePersonData} from '@/hooks/usePersonData';
import {mockFilms, mockFilmsNode, mockPerson, mockStarshipsNode} from "@/__test__/mockData";

jest.mock('../../context/films', () => ({
    useFilms: jest.fn(() => ({
        films: mockFilms
    }))
}));

describe('usePersonData', () => {
    it('returns filmsNode and initializes starshipsNode correctly', async () => {
        const {result} = renderHook(() => usePersonData(mockPerson));

        await waitFor(() => {
            expect(result.current.filmsNode).toEqual(mockFilmsNode);

            expect(result.current.starshipsNode).toEqual(mockStarshipsNode);
        });
    });
});
