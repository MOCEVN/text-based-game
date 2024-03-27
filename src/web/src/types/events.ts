import { GameServiceEvent } from "../services/gameService";

export type miniGameEndState = {
    win: boolean;
};

export type miniGameEnd = GameServiceEvent<miniGameEndState>;