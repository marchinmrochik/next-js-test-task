import { useMemo } from "react";
import { Film } from "@/types/film";
import { StarshipMap } from "@/types/starship";
import { Person } from "@/types/person";
import { EdgeType, NodeType } from "@/types/reactFlow";
import {
    NODE_START_X,
    NODE_START_Y,
    NODE_VERTICAL_SPACING,
    STARSHIP_START_X, STARSHIP_START_Y,
    STARSHIP_X_INCREMENT, STARSHIP_Y_INCREMENT
} from "@/utils/constants";

export const useGraphData = (filmsNode: Film[], starshipsNode: StarshipMap | null, selectedPerson: Person) => {
    const getGraphData = () => {
        if (!selectedPerson) {
            return { nodes: [], edges: [] };
        }

        const updatedNodes: NodeType[] = [];
        const updatedEdges: EdgeType[] = [];

        updatedNodes.push({
            id: 'hero',
            type: 'input',
            data: { label: `${selectedPerson.name || ''}` },
            position: { x: NODE_START_X, y: NODE_START_Y },
            style: {
                background: 'red'
            },
        });

        filmsNode.forEach((film, key) => {
            const filmNodeId = `film-${film.id}`;
            updatedNodes.push({
                id: filmNodeId,
                data: { label: `${film.title || ''}` },
                position: {
                    x: NODE_START_X,
                    y: NODE_START_Y + NODE_VERTICAL_SPACING + key * NODE_VERTICAL_SPACING
                },
                style: {
                    background: 'orange'
                },
            });
            updatedEdges.push({
                id: `edge-hero-${filmNodeId}`,
                source: 'hero',
                target: filmNodeId,
            });

            if (starshipsNode) {
                film.starships.forEach((starshipId, id) => {
                    const starship = starshipsNode[starshipId];
                    if (starship) {
                        const starshipNodeId = `starship-${starship.id}`;
                        updatedNodes.push({
                            id: starshipNodeId,
                            data: { label: `${starship.model || ''}` },
                            position: {
                                x: STARSHIP_START_X + id * STARSHIP_X_INCREMENT,
                                y: STARSHIP_START_Y + id * STARSHIP_Y_INCREMENT
                            },
                            style: {
                                background: 'yellow'
                            },
                        });
                        updatedEdges.push({ id: `edge-${filmNodeId}-${starshipNodeId}`, source: filmNodeId, target: starshipNodeId });
                    }
                });
            }
        });

        return { nodes: updatedNodes, edges: updatedEdges };
    };

    return useMemo(getGraphData, [starshipsNode]);
};
