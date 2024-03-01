import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { Room3 } from "./Room3";

export const Room2Alias: string = "room2";

export class Room2 extends Room {
    public constructor() {
        super(Room2Alias);
    }

    public name(): string {
        return "Room 2";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is room 2."]);
    }
    public images(): string[] {
        return ["room2"];
    }
    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new CustomAction("room3","Room 3",false)];
    }
    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems];
    }
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "room3") {
            const room: Room3 = new Room3();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}