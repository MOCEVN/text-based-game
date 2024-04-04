import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
import { Room2 } from "./Room2";
import { clownvoice } from "../characters/ClownCharacter/Clownvoice";
import { Searchaction } from "../actions/SearchRoom1";
import { gebruikaction } from "../base/actions/useitem";
import { Desktop } from "../characters/Deskcharacter";
import { PlayerSession } from "../types";
import { Bookcase } from "../characters/Bookcasecharacter";
import { FlashlightitemAlias } from "../items/flashlightitem";

export const Room1Alias: string = "room1";

export class Room1 extends Room {
    public constructor() {
        super(Room1Alias);
    }

    public name(): string {
        return "The Hidden Clown Chamber";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Inside room 1, the cold cuts through the air like a knife, while darkness reigns, only broken by a faint moonbeam. This seems the perfect hiding spot for a killer clown, whose mocking laughter echoes from the shadows. Unsure if it's really a clown, you feel a threat that gives you goosebumps.",
            "you struggle with windows and chairs, until something unexpected catches your attention under the bookcase: possibly your chance at freedom. With renewed hope, you turn to this discovery, possibly the key to escaping this chilly darkness.",
        ]);
    }
    public images(): string[] {
        return ["room1"];
    }
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new gebruikaction(),
            new TalkAction(),
            new Searchaction(),
            new CustomAction("room2", "Room 2", false),
        ];
    }
    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        const objects: GameObject[] = [this];
        if (playerSession.showdesktop) {
            objects.push(new Desktop());
        }
        if (playerSession.showbookcase) {
            objects.push(new Bookcase());
        }
        if (!playerSession.inventory.includes(FlashlightitemAlias)) {
            objects.push(new clownvoice());
        }
        return objects;
    }
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "room2") {
            const room: Room2 = new Room2();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        return undefined;
    }
}
