import { GameState, PerformActionRequest, score } from "@shared/types";
import { getJsonApi, postJsonApi } from "../helpers";

export async function getState(): Promise<GameState> {
    return getJsonApi<GameState>("state");
}

export async function performAction(
    actionAlias: string,
    objectAliases?: string[]
): Promise<GameState | undefined> {
    try {
        return postJsonApi<GameState, PerformActionRequest>("action", {
            action: actionAlias,
            objects: objectAliases,
        });
    } catch {
        return undefined;
    }
}

export async function sendHighScore(userName:string): Promise<boolean | undefined> {
    try {
        return postJsonApi<boolean,{"userName": string}>("highscore",{"userName": userName});
    } catch {
        return undefined;
    }
}

export async function getLeaderBoard(limit?: number): Promise<score[]> {
    const result: {"result": score[]} = await getJsonApi<{"result": score[]}>("highscore",[["limit",limit ?? ""]]);
    return result.result;
}