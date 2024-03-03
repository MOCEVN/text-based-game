import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { ThreeNumberItem } from "../items/ThreeNumberItem";
import { EndRoom } from "./EndRoom";

export const Room5Alias: string = "room5";

export class Room5 extends Room {
    public constructor() {
        super(Room5Alias);
    }

    public name(): string {
        return "Room 5";
    }
    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new CustomAction("endroom","End Room",false)];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems, new ThreeNumberItem()];
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["examine is geklikt"]);
    }
    public images(): string[] {
        return ["kamer5"];
    }
    
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "endroom") {
            const room: EndRoom = new EndRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}