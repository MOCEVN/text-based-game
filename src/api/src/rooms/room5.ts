import { Use } from "../actions/UseRoom5";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { WitchCharacter } from "../characters/WitchCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PotionItem } from "../items/PotionItem";

import { EndRoom } from "./EndRoom";

export const Room5Alias: string = "room5";

export class Room5 extends Room {
    public constructor() {
        super(Room5Alias);
    }

    public name(): string {
        return "Room 5";
    }
    public images(): string[] {
        return ["kamer5"];
    }
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
            new Use(),
            new CustomAction("endroom", "End Game", false),
        ];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems, new PotionItem(), new WitchCharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Upon entering the room, you are met with an eerie stillness broken only by the crackling of fire and the witch's cackling. Large cauldrons bubble in the corners, emitting strange odors. With each step, the room pulses with unsettling energy, but you steel yourself for the challenges ahead."]);
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
