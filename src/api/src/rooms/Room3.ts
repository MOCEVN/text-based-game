import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { Room4 } from "./Room4";
import { ThreeNumberItem, ThreeNumberItemAlias } from "../items/ThreeNumberItem";
import { SkeletonCharacter } from "../characters/SkeletonCharacter";
import { CollectAction } from "../actions/CollectRoom3";
import { PlayerSession } from "../types";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";

export const Room3Alias: string = "room3";

export class Room3 extends Room {
    public constructor() {
        super(Room3Alias);
    }

    public name(): string {
        return "Room 3";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "When you open the door, there a couple candles burning....slowly some are burning out.",
            "Suddenly you see bones floating past you, there you hear whispering from a few voices"]);
    }
    public images(): string[] {
        return ["room3"];
    }
    public actions(): Action[] {
        return [
            new ExamineAction(), 
            new TalkAction(), 
            new CollectAction(),
            new CustomAction("room4","Room 4",false),
        ];
    }
    
    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if(playerSession.inventory.includes(ThreeNumberItemAlias)) {
            objects.push(new ThreeNumberItem());
        }

        objects.push(new SkeletonCharacter());

        return objects;
        
    }
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "room4") {
            const room: Room4 = new Room4();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
    
}