export type PlayerSession = {
    [x: string]: any;
    currentRoom: string;
    inventory: string[];
    hp: number;
    hasRevived: boolean;
    deathRoom?: string;
    // room 2
    pickedUpKey1: boolean;
    pickedUpKey2: boolean;
    pickedUpKey3: boolean;
    answeredRiddle: boolean;
    // room 3
    collectedCode: boolean;
    roomSearched: boolean;
    correctAnswer: boolean;
    spokenToSkeleton3: boolean;
    spokenToSkeleton1: boolean;
    // room 4
    paintingPuzzleState: number;
    paintingsTalkedTo: number;
    //room5
    witchRightChoise: boolean;
    pickedUpPotion: boolean;
    playertrys: number;
    gameOverKamer5: number;
    talkPotion: boolean;
    talkWitch: boolean;
    PotRightChoise: boolean;

};
