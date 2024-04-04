import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession, getRoomByAlias, resetPlayerSession} from "../instances";
import { PlayerSession } from "../types";

export const EndRoomAlias: string = "endroom";

export class EndRoom extends Room {
    public constructor() {
        super(EndRoomAlias);
        const playerSession: PlayerSession = getPlayerSession();
        if (!playerSession.endTime) {
            playerSession.endTime = Date.now();
        }
    }

    public name(): string {
        return "End room";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Congratulations! You've emerged victorious from the trials of Terror Trial. You've proven your worth with courage and ingenuity. Well done!"]);
    }
    public images(): string[] {
        return ["endroom"];
    }
    public actions(): Action[] {
        return [new CustomAction("reset", "Play again",false), new CustomAction("highscore", "save score",false)];
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

        return undefined;
    }
}