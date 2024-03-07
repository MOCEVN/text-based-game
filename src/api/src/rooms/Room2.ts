import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { GhostCharacter } from "../characters/GhostCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { KeyItem1 } from "../items/keys/KeyItem1";
import { KeyItem2 } from "../items/keys/KeyItem2";
import { KeyItem3 } from "../items/keys/KeyItem3";
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
        return new TextActionResult([
            "As you cautiously step into the second room, a cold gust of air makes you shiver, and the whole place feels eerie. The weak light flickers, casting eerie shadows on the walls.", "In the middle of the room, there's an old table with a strange glow, holding three keys.", "Suddenly, a ghostly figure appears, surrounded by swirling, transparent energy. Its hollow eyes fixate on you as it whispers, 'You shouldn't have come, Intruder.'"]);
    }
    public images(): string[] {
        return ["room2"];
    }
    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new CustomAction("room3","Room 3",false)];
    }
    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, new KeyItem1(), new KeyItem2(), new KeyItem3(), new GhostCharacter(),...inventoryItems];
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