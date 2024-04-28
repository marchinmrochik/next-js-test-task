import {renderHook} from '@testing-library/react';
import {useGraphData} from '@/hooks/useGraphData';
import {
    mockEdges, mockEdgesWithStarshipNull,
    mockFilmsNode,
    mockNodes,
    mockNodesWithStarshipNull,
    mockPerson,
    mockStarshipsNode
} from "@/__test__/mockData";

describe('useGraphData', () => {
    it('returns correct graph data when starshipsNode is provided', () => {
        const {result} = renderHook(() =>
            useGraphData(mockFilmsNode, mockStarshipsNode, mockPerson)
        );

        const {nodes, edges} = result.current;

        expect(nodes).toEqual(mockNodes)
        expect(edges).toEqual(mockEdges)
    });

    it('returns empty graph data when selectedPerson is not provided', () => {
        const {result} = renderHook(() =>
            useGraphData(mockFilmsNode, mockStarshipsNode, null)
        );

        const {nodes, edges} = result.current;

        expect(nodes.length).toBe(0);
        expect(edges.length).toBe(0);
    });

    it('returns correct graph data when starshipsNode is null', () => {
        const {result} = renderHook(() =>
            useGraphData(mockFilmsNode, null, mockPerson)
        );

        const {nodes, edges} = result.current;

        expect(nodes).toEqual(mockNodesWithStarshipNull)
        expect(edges).toEqual(mockEdgesWithStarshipNull)
    });
});
