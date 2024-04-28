import axios from 'axios';
import { collectUniqueUrlsByFilmId } from '@/utils/collectUniqueUrlsByFilmId';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('collectUniqueUrlsByFilmId', () => {
    beforeEach(() => {
        mockedAxios.get.mockReset();
    });

    it('collects and processes starship data correctly', async () => {
        const data = [
            { filmId: 1, url: 'http://example.com/starship/1' },
            { filmId: 1, url: 'http://example.com/starship/2' },
            { filmId: 2, url: 'http://example.com/starship/3' },
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: { id: 1, name: 'Starship 1', model: 'Model 1' }});
        mockedAxios.get.mockResolvedValueOnce({ data: { id: 2, name: 'Starship 2', model: 'Model 2' }});
        mockedAxios.get.mockResolvedValueOnce({ data: { id: 3, name: 'Starship 3', model: 'Model 3' }});

        const result = await collectUniqueUrlsByFilmId(data);

        expect(result).toEqual({
            1: { id: 1, name: 'Starship 1', model: 'Model 1', films: [1] },
            2: { id: 2, name: 'Starship 2', model: 'Model 2', films: [1] },
            3: { id: 3, name: 'Starship 3', model: 'Model 3', films: [2] },
        });
    });

    it('handles API request failures gracefully', async () => {
        const data = [{ filmId: 1, url: 'http://example.com/starship/1' }];

        mockedAxios.get.mockRejectedValueOnce(new Error('Request failed'));

        const result = await collectUniqueUrlsByFilmId(data);

        expect(result).toEqual({});
    });
});
