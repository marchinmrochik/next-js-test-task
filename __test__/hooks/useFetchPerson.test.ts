import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';
import axios from 'axios';
import { useFetchPerson } from '@/hooks/useFetchPerson';
import {mockPeople, mockPerson} from "@/__test__/mockData";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useFetchPerson hook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch person successfully', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockPerson });

        const { result, waitForNextUpdate } = renderHook(() => useFetchPerson(1));

        expect(result.current.isLoading).toBe(true);
        await waitForNextUpdate();

        expect(result.current.selectedPerson).toEqual(mockPerson);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    test('should handle error', async () => {
        const errorMessage = 'Error fetching person';
        mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

        const { result, waitForNextUpdate } = renderHook(() => useFetchPerson(1));

        expect(result.current.isLoading).toBe(true);
        await waitForNextUpdate();

        expect(result.current.selectedPerson).toBeNull();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(errorMessage);
    });

    test('should initialize with default state', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useFetchPerson(1));

        expect(result.current.isLoading).toBe(true);
        await waitForNextUpdate();

        expect(result.current.selectedPerson).toBeNull();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).not.toBe(null);
    });

    test('should fetch person for new id', async () => {
        const [testData1, testData2] = mockPeople;
        mockedAxios.get.mockResolvedValueOnce({ data: testData1 });

        const { result, waitForNextUpdate, rerender } = renderHook(
            ({ id }) => useFetchPerson(id),
            {
                initialProps: { id: testData1.id }
            }
        );

        await waitForNextUpdate();
        expect(result.current.selectedPerson).toEqual(testData1);

        mockedAxios.get.mockResolvedValueOnce({ data: testData2 });
        act(() => {
            rerender({ id: testData2.id });
        });

        expect(result.current.isLoading).toBe(true);
        await waitForNextUpdate();

        expect(result.current.selectedPerson).toEqual(testData2);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

});
