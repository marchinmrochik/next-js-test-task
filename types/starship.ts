export type Starship = {
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    created: string;
    crew: string;
    edited: string;
    films: number[];
    hyperdrive_rating: string;
    id: number;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    pilots: number[];
    starship_class: string;
    url: string;
}

export type StarshipMap =  {
    [key: number]: Starship;
}
