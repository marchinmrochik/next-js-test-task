'use client'

import {useCallback, useEffect, useState} from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Connection,
    Edge,
    EdgeChange,
    NodeChange
} from 'reactflow';
import {usePersonData} from "@/hooks/usePersonData";
import {useGraphData} from "@/hooks/useGraphData";
import {Person} from "@/types/person";

interface PersonInfoProps {
    selectedPerson: Person;
}

export default function PersonInfo({selectedPerson}: PersonInfoProps) {
    const {filmsNode, starshipsNode} = usePersonData(selectedPerson);
    const {nodes, edges} = useGraphData(filmsNode, starshipsNode, selectedPerson);
    const [nodesFlow, setNodesFlow] = useState(nodes);
    const [edgesFlow, setEdgesFlow] = useState(edges);

    useEffect(() => {
        setNodesFlow(nodes)
        setEdgesFlow(edges)
    }, [nodes, edges]);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodesFlow(
            (nds) => applyNodeChanges(changes, nds)),
        [nodesFlow]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdgesFlow(
            (eds) => applyEdgeChanges(changes, eds)),
        [edgesFlow]
    );
    const onConnect = useCallback(
        (connection: Edge | Connection) => setEdgesFlow(
            (eds) => addEdge(connection, eds)),
        [edgesFlow]
    );

    return (
        <div className="w-screen h-[90vh]">
            <ReactFlow
                nodes={nodesFlow}
                edges={edgesFlow}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                attributionPosition="top-right"
                fitView
            >
                <Background/>
            </ReactFlow>
        </div>
    );
};

