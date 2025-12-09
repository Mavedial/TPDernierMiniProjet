export interface Powerstats {
    intelligence?:  number;
    strength?: number;
    speed?: number;
    durability?: number;
    power?: number;
    combat?: number;
}

export interface Appearance {
    gender?: string;
    race?: string;
    height?: string[];
    weight?: string[];
    eyeColor?: string;
    hairColor?: string;
}

export interface Biography {
    fullName?: string;
    alterEgos?: string;
    aliases?: string[];
    placeOfBirth?: string;
    firstAppearance?: string;
    publisher?: string;
    alignment?: string;
}

export interface Images {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
}

// Types explicites pour work et connections
export interface Work {
    occupation?: string;
    base?: string;
    [key: string]: unknown;
}

export interface Connections {
    groupAffiliation?: string;
    relatives?: string;
    [key: string]: unknown;
}

export interface Hero {
    _id?: string;
    id?: number;
    name?: string;
    slug?: string;

    powerstats?: Powerstats;
    appearance?: Appearance;
    biography?: Biography;
    work?: Work;
    connections?:  Connections;
    images?: Images;

    nom?: string;
    alias?: string;
    univers?: string;
    pouvoirs?: string[];
    description?: string;
    origine?: string;
    premiereApparition?: string;

    createdAt?: string;
}

// Types pour l'authentification
export interface User {
    username:  string;
    role: string;
}

export interface AuthResponse {
    token: string;
    user:  User;
    message?:  string;
}