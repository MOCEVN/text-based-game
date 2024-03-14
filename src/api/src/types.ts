export type PlayerSession = {
    currentRoom: string;
    inventory: string[];
    // room 2
    pickedUpKey1: boolean;
    pickedUpKey2: boolean;
    pickedUpKey3: boolean;
    answeredRiddle: boolean;
    // room 4
    paintingPuzzleState: number;
    paintingsTalkedTo: number;
    //room5
    witchRightChoise: boolean;
    pickedUpPotion: boolean;
    collectedCode: boolean;
    playertrys: number;
};
