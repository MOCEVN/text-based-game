import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { Room2 } from "./Room2";

export const Room1Alias: string = "room1";

export class Room1 extends Room {
    public constructor() {
        super(Room1Alias);
    }

    public name(): string {
        return "Room 1";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is room 1."]);
    }
    public images(): string[] {
        return ["room1"];
    }
    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new CustomAction("room2","Room 2",false)];
    }
    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems];
    }
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "room2") {
            const room: Room2 = new Room2();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}