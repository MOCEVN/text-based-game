import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { Custom, CustomAction, CustomActionAlias } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession, getRoomByAlias, resetPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const GameOverRoomAlias: string = "game-over-room";

export class GameOverRoom extends Room implements Custom {
    public constructor() {
        super(GameOverRoomAlias, CustomActionAlias);
    }

    public images(): string[] {
        const PlayerSession: PlayerSession = getPlayerSession();

        if (PlayerSession.gameOverKamer5 === 1) {
            return ["behekst"];
        } else if (PlayerSession.gameOverKamer5 === 2) {
            return ["behekst"];
        } else if (PlayerSession.gameOverKamer5 === 5) {
            return ["potBehekst"];
        }
        return ["startroom"];
    }

    public examine(): ActionResult | undefined {
        const PlayerSession: PlayerSession = getPlayerSession();
        if (PlayerSession.gameOverKamer5 === 1) {
            return ["The witch killed you."];
        } else if (PlayerSession.gameOverKamer5 === 2) {
            return ["As the foolish adventurer reached out to touch the witch, the witch evaporated him."];
        } else if (PlayerSession.gameOverKamer5 === 5) {
            return [ "As the foolish adventurer tried to force the pot from it's potion the pot casted a spell over him"];
        }
        return new TextActionResult(["GAME OVER", "YOU LOST"]);
    }
    public name(): string {
        return "Terror Trial";
    }
    public actions(): Action[] {
        return [new CustomAction("reset", "Restart", false)];
    }
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "reset") {
            resetPlayerSession();
            return getRoomByAlias(getPlayerSession().currentRoom)?.examine();
        }
        return undefined;
    }
}
