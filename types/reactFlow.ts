import {CSSProperties} from "react";

export type NodeType = {
    id: string,
    type?: string,
    data: {
        label: string
    },
    position: {
        x: number,
        y: number
    },
    style?: CSSProperties
}

export type EdgeType = {
    id: string,
    source: string,
    target: string,
}
