export type GameState = {
    roomAlias: string;
    roomTitle: string;
    roomImages: string[];
    audio: string[];
    text: string[];
    actions: ActionReference[];
    objects: GameObjectReference[];
    hp?: number;
    inventory?: string[];
};

export type GameObjectReference = {
    alias: string;
    name: string;
};

export type ActionReference = {
    alias: string;
    label: string;
    needsObject: boolean;
};

export type PerformActionRequest = {
    action: string;
    objects?: string[];
};

export type score = {
    name: string;
    time: number;
    hp: number;
}