import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';
import axios from 'axios';
import usePeopleData from '@/hooks/useFetchPeople';
import {mockPeople} from "@/__test__/mockData";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('usePeopleData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch data and update state on successful response', async () => {
        const responseData = {
            count: 2,
            next: 'https://api.example.com/people/?page=2',
            previous: null,
            results: [...mockPeople],
        };

        mockedAxios.get.mockResolvedValueOnce({ data: responseData });

        const { result, waitForNextUpdate } = renderHook(() => usePeopleData());

        expect(result.current.isLoading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.isLoading).toBe(false);
        expect(result.current.people).toEqual(responseData.results);
        expect(result.current.loadNextPage).toBeDefined();
        expect(result.current.error).toBeNull();
    });

    test('should handle error and not update state on failed response', async () => {
        const errorMessage = 'Network Error';
        mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

        const { result, waitForNextUpdate } = renderHook(() => usePeopleData());

        expect(result.current.isLoading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.isLoading).toBe(false);
        expect(result.current.people).toEqual([]);
        expect(result.current.error).toBe(errorMessage)
    });

    test('should load next page successfully', async () => {
        const responseData = {
            count: 2,
            next: 'https://api.example.com/people/?page=2',
            previous: null,
            results: [...mockPeople],
        };

        mockedAxios.get.mockResolvedValueOnce({ data: responseData });

        const { result, waitForNextUpdate } = renderHook(() => usePeopleData());

        await waitForNextUpdate();

        mockedAxios.get.mockResolvedValueOnce({
            data:
                { count: 1, next: null, previous: null, results: [] }
        });

        act(() => {
            result.current.loadNextPage();
        });

        expect(result.current.isLoading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.isLoading).toBe(false);
        expect(result.current.people).toEqual([...mockPeople, ...[]]);
        expect(result.current.error).toBeNull();
    });
});
