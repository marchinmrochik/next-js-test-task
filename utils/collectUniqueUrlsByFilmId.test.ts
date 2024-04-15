import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { collectUniqueUrlsByFilmId } from './collectUniqueUrlsByFilmId'; // Замените на путь к вашему файлу

const mockAxios = new MockAdapter(axios);

describe('collectUniqueUrlsByFilmId', () => {
    beforeEach(() => {
        mockAxios.reset();
    });

    it('collects and processes starship data correctly', async () => {
        const data = [
            { filmId: 1, url: 'http://example.com/starship/1' },
            { filmId: 1, url: 'http://example.com/starship/2' },
            { filmId: 2, url: 'http://example.com/starship/3' },
        ];

        mockAxios
            .onGet('http://example.com/starship/1')
            .reply(200, { id: 1, name: 'Starship 1', model: 'Model 1' });
        mockAxios
            .onGet('http://example.com/starship/2')
            .reply(200, { id: 2, name: 'Starship 2', model: 'Model 2' });
        mockAxios
            .onGet('http://example.com/starship/3')
            .reply(200, { id: 3, name: 'Starship 3', model: 'Model 3' });

        const result = await collectUniqueUrlsByFilmId(data);

        expect(result).toEqual({
            1: { id: 1, name: 'Starship 1', model: 'Model 1', films: [1] },
            2: { id: 2, name: 'Starship 2', model: 'Model 2', films: [1] },
            3: { id: 3, name: 'Starship 3', model: 'Model 3', films: [2] },
        });
    });

    it('handles API request failures gracefully', async () => {
        const data = [{ filmId: 1, url: 'http://example.com/starship/1' }];

        mockAxios.onGet('http://example.com/starship/1').reply(404);

        const result = await collectUniqueUrlsByFilmId(data);

        expect(result).toEqual({});
    });
});
