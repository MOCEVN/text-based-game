import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
import { Room1 } from "./Room1";

// imports for testing
import { Room2 } from "./Room2";
import { Room3 } from "./Room3";
import { Room4 } from "./Room4";
import { Room5 } from "./room5";

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
        return [new CustomAction("start-game", "Start Game", false)
            ,// actions for testing
            new CustomAction("r1","Room 1 (temp)",false),
            new CustomAction("r2","Room 2 (temp)",false),
            new CustomAction("r3","Room 3 (temp)",false),
            new CustomAction("r4","Room 4 (temp)",false),
            new CustomAction("r5","Room 5 (temp)",false)
        ];
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

        // actions for testing
        let room: Room | undefined;
        switch (alias){
            case "r1":
                room = new Room1;
                break;
            case "r2":
                room = new Room2;
                break;
            case "r3":
                room = new Room3;
                break;
            case "r4":
                room = new Room4;
                break;
            case "r5":
                room = new Room5;
                break;
        }
        if (room) {
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }

        return undefined;
    }
}
