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
import { Desktop } from "../characters/Deskcharacter";
import { PlayerSession } from "../types";
import { Bookcase } from "../characters/Bookcasecharacter";
import { ContiniueSearch } from "../characters/ClownCharacter/ContinueSearch";
import { continueenteroom } from "../characters/ClownCharacter/Continueenterroom";
import { Fishbowl } from "../characters/Fishbowlcharachter";
import { Use } from "../actions/UseRoom5";

export const Room1Alias: string = "room1";

export class Room1 extends Room {
    public constructor() {
        super(Room1Alias);
    }

    public name(): string {
        return "The Hidden Clown Chamber";
    }
    public examine(): ActionResult | undefined {
        const PlayerSession: PlayerSession = getPlayerSession();
        if (PlayerSession.searchbookcase) {
            return new TextActionResult(["Where will you search for the items?"]);
        }
        if (PlayerSession.walkinroom) {
            return new TextActionResult([
                "In the dim light, the player notices a desktop and a bookcase. Wondering where to search first, they consider the desktop, potentially full of immediate clues. Yet, the bookcase's shadow hints at hidden secrets among its tomes. Decision time: the obvious digital trove or the mysterious collection of books?",
            ]);
        }
        return new TextActionResult([
            "Inside room 1, the cold cuts through the air like a knife, while darkness reigns, only broken by a faint moonbeam. This seems the perfect hiding spot for a killer clown, whose mocking laughter echoes from the shadows. Unsure if it's really a clown, you feel a threat that gives you goosebumps.",
            "you struggle with windows and chairs, until something unexpected catches your attention under the bookcase: possibly your chance at freedom. With renewed hope, you turn to this discovery, possibly the key to escaping this chilly darkness.",
        ]);
    }
    public images(): string[] {
        const PlayerSession: PlayerSession = getPlayerSession();
        if (PlayerSession.searchdesktop) {
            return ["Desktop"];
        }
        if (PlayerSession.searchbookcase) {
            return ["Bookcase"];
        }
        if (PlayerSession.walkinroom) {
            return ["Walkinsecondroom"];
        }
        if (PlayerSession.showfishbowl) {
            return ["Fishbowl"];
        }
        return ["room1"];
    }
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new Use(),
            new TalkAction(),
            new Searchaction(),
            new CustomAction("room2", "Room 2", false),
        ];
    }
    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        const objects: GameObject[] = [this];
        objects.pop();
        if (playerSession.contineusearch) {
            objects.push(new ContiniueSearch());
        }
        if (playerSession.searchdesktop) {
            objects.pop();
        }
        if (playerSession.showdesktop === true) {
            objects.push(new Desktop());
        }
        if (playerSession.showbookcase === true) {
            objects.push(new Bookcase());
        }
        if (playerSession.walkinroom) {
            objects.push(new continueenteroom());
        }
        if (playerSession.showfishbowl === true) {
            objects.push(new Fishbowl());
        }
        if (playerSession.noshowclownvoice === false) {
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
