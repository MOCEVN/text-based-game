import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession, getRoomByAlias, resetPlayerSession, sendToGameOver } from "../instances";

export const EndRoomAlias: string = "endroom";

export class EndRoom extends Room {
    public constructor() {
        super(EndRoomAlias);
    }

    public name(): string {
        return "End room";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This the end room."]);
    }
    public images(): string[] {
        return ["endroom"];
    }
    public actions(): Action[] {
        return [new CustomAction("reset", "Play again",false), new CustomAction("end","GAME OVER",false), new CustomAction("highscore", "save score",false)];
    }
    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems];
    }
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "reset") {
            resetPlayerSession();
            return getRoomByAlias(getPlayerSession().currentRoom)?.examine();
        }
        if (alias === "end") {
            return sendToGameOver();
        }

        return undefined;
    }
}