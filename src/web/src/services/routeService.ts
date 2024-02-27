import { GameState, PerformActionRequest } from "@shared/types";
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
