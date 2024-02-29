import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { Room5 } from "./Room5";

export const Room4Alias: string = "room4";

export class Room4 extends Room {
    public constructor() {
        super(Room4Alias);
    }

    public name(): string {
        return "Room 4";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is room 4."]);
    }
    public images(): string[] {
        return [];
    }
    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new CustomAction("room5", "Room 5", false)];
    }
    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems];
    }
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "room5") {
            const room: Room5 = new Room5();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
