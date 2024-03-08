import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getGameObjectsFromInventory, resetPlayerSession } from "../instances";

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
        return [new ExamineAction(), new TalkAction(), new CustomAction("end","GAME OVER",false)];
    }
    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems];
    }
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "end") {
            resetPlayerSession();
            return new TextActionResult(["GAME OVER"]);
        }

        return undefined;
    }
}