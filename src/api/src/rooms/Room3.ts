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
import { SkeletonCharacter1 } from "../characters/Skeleton Characters/Skeleton1";
import { CollectAction } from "../actions/CollectRoom3";
import { PlayerSession } from "../types";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { SkeletonCharacter2 } from "../characters/Skeleton Characters/Skeleton2";
import { SkeletonCharacter3 } from "../characters/Skeleton Characters/Skeleton3";

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
            "Upon opening the door, a dimly lit room reveals skeletal figures intertwined in an otherworldly dance.",
            "Flickering candles cast eerie shadows, struggling against encroaching darkness. Soft whispers echo tales of sorrow.",
            "Three well-preserved skeletons stand out—one holding a faded parchment, another a weathered book, and the third, a mysterious amulet.",
            "Investigate carefully; one may hold the riddle unlocking the mystery of this room."
        ]);
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

        if(!playerSession.inventory.includes(ThreeNumberItemAlias)) {
            objects.push(new ThreeNumberItem());
        }

        objects.push(new SkeletonCharacter1(), new SkeletonCharacter2(), new SkeletonCharacter3());

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