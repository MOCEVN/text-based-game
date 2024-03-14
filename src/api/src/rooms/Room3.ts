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
import { TreasuryObject } from "../items/objects-room3/treasuryObject";

export const Room3Alias: string = "room3";

export class Room3 extends Room {
    public constructor() {
        super(Room3Alias);
    }

    public name(): string {
        return "Room 3";
    }
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.roomSearched) {
            // If the player hasn't searched the room yet
            playerSession.roomSearched = true; // Mark the room as searched
    
            return new TextActionResult([
                "As you step into the dimly lit room, your eyes adjust to the darkness, revealing a multitude of mysterious objects scattered about.",
                "Your curiosity piqued, you start exploring the room, carefully examining each object in search of clues.",
            ]);
        } else {
            // If the player has already searched the room
            return new TextActionResult([
                "You find yourself in the dimly lit room once again, surrounded by the same mysterious objects you've already explored.",
                "Despite your prior efforts, the enigmatic atmosphere of the room leaves you feeling as though there's still much to uncover.",
                "Amidst the shadows, your attention is drawn to a peculiar object tucked away in a corner.",
                "It appears to be an old treasury partially obscured by fallen debris. Perhaps investigating it further will yield valuable insights."
            ]);
        }
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

        objects.push(new TreasuryObject(), new SkeletonCharacter1(), new SkeletonCharacter2(), new SkeletonCharacter3());

        if(!playerSession.inventory.includes(ThreeNumberItemAlias)) {
            objects.push(new ThreeNumberItem());
        }

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



