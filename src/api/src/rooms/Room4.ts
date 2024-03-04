import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { Painting1Character } from "../characters/paintings/painting1";
import { Painting2Character } from "../characters/paintings/painting2";
import { Painting3Character } from "../characters/paintings/painting3";
import { Painting4Character } from "../characters/paintings/painting4";
import { Painting5Character } from "../characters/paintings/painting5";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { Room5 } from "./room5";

export const Room4Alias: string = "room4";

export class Room4 extends Room {
    public constructor() {
        super(Room4Alias);
    }

    public name(): string {
        return "Haunted Gallery";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Inside this room, ornate frames line the walls, showcasing vivid scenes from serene landscapes to eerie portraits.", 
            "The room is dimly lit, casting shadows across the floor.", 
            "You notice a slight movement from the corner of your eye, but dismiss it as a trick of the light."
        ]);
    }

    public images(): string[] {
        return ["room4"];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new CustomAction("room5", "Room 5", false)];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems, new Painting1Character(), new Painting2Character(), new Painting3Character(), new Painting4Character(), new Painting5Character()];
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
