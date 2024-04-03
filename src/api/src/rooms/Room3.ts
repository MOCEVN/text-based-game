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
        return "Mystical Chamber";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "As you step into the dimly lit room, your eyes adjust to the darkness, revealing a multitude of mysterious objects",
            "Your curiosity piqued, you start exploring the room, carefully examining the room in search of clues",
            "It appears to be an old treasury partially obscured by fallen debris. Perhaps investigating it further will yield valuable insights",
        ]);
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();

        // If the code is collected, return an updated image array
        if (playerSession.inventory.includes(ThreeNumberItemAlias)) {
            return ["ThreeNumberItem"]; // Add the new image to be displayed
        } else {
            return ["room3"]; // Otherwise, return the default image array
        }
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();

        // if the player answered correctly, return collect and custom actions
        if(playerSession.correctAnswer){
            return [
            new ExamineAction(),
            new TalkAction(),
            new CollectAction(),
            new CustomAction("room4", "Room 4", false),
        ];
        }
        return [
            new ExamineAction(),
            new TalkAction(),
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        objects.push(
            new TreasuryObject(),
            new SkeletonCharacter1(),
            new SkeletonCharacter2(),
            new SkeletonCharacter3()
        );

        if (!playerSession.inventory.includes(ThreeNumberItemAlias)) {
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
