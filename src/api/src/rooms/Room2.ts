import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { PickupAction } from "../base/actions/PickupAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { GhostCharacter } from "../characters/GhostCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { KeyItem1, KeyItem1Alias } from "../items/keys/KeyItem1";
import { KeyItem2, KeyItem2Alias } from "../items/keys/KeyItem2";
import { KeyItem3, KeyItem3Alias } from "../items/keys/KeyItem3";
import { PlayerSession } from "../types";
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
        return [new ExamineAction(), new PickupAction(), new TalkAction(), new CustomAction("room3","Room 3<Temp>",false)];
    }
    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this];
        if(!playerSession.inventory.includes(KeyItem1Alias)) {
            objects.push(new KeyItem1());
        } 
        if (!playerSession.inventory.includes(KeyItem2Alias)) {
            objects.push(new KeyItem2());
        } 
        if (!playerSession.inventory.includes(KeyItem3Alias)) {
            objects.push(new KeyItem3());
        }
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        objects.push(new GhostCharacter(),...inventoryItems);
        return objects;
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