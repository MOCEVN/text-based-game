import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
import { Room1 } from "./Room1";

export const StartupRoomAlias: string = "startup";

export class StartupRoom extends Room {
    public constructor() {
        super(StartupRoomAlias);
    }

    public name(): string {
        return "Terror Trial";
    }

    public images(): string[] {
        return ["startroom"];
    }

    public actions(): Action[] {
        return [new CustomAction("start-game", "Start Game", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Welcome, courageous soul, to the foreboding world of Terror Trial.", 
            "Inside this mansion, you'll traverse through five unsettling rooms, each shrouded in mystery and filled with its own cryptic puzzle or riddle to solve. With only your wits and resolve to guide you, you must navigate the treacherous trials that lie ahead."
        ]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "start-game") {
            const room: Room1 = new Room1();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
