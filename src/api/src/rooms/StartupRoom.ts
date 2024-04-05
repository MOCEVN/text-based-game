import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { damagePlayer, getPlayerSession, playAudio } from "../instances";
import { SawItemAlias } from "../items/SawItem";
import { ThreeNumberItemAlias } from "../items/ThreeNumberItem";
import { FlashlightitemAlias } from "../items/flashlightitem";
import { KeyItem1Alias } from "../items/keys/KeyItem1";
import { KeyItem2Alias } from "../items/keys/KeyItem2";
import { KeyItem3Alias } from "../items/keys/KeyItem3";
import { PlayerSession } from "../types";
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
        return [new CustomAction("start-game", "Start Game", false),
            new CustomAction("leaderboard","show leaderboard",false)
        ];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Welcome, courageous soul, to the foreboding world of Terror Trial.", 
            "Inside this mansion, you'll traverse through five unsettling rooms, each shrouded in mystery and filled with its own cryptic puzzle or riddle to solve. With only your wits and resolve to guide you, you must navigate the treacherous trials that lie ahead."
        ]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (alias === "start-game") {
            const room: Room1 = new Room1();

            //Set the current room to the example room
            playerSession.currentRoom = room.alias;
            playerSession.startTime = Date.now();
            playAudio("door");

            return room.examine();
        }
        // actions for testing VVVV
        let room: Room | undefined;
        switch (alias){
            case "r1":
                room = new Room1;
                break;
            case "r2":
                room = new Room2;
                playerSession.inventory.push(FlashlightitemAlias);
                break;
            case "r3":
                room = new Room3;
                playerSession.inventory.push(FlashlightitemAlias,KeyItem1Alias,KeyItem2Alias,KeyItem3Alias);
                playerSession.pickedUpKey1 = true;
                playerSession.pickedUpKey2 = true;
                playerSession.pickedUpKey3 = true;
                playerSession.answeredRiddle = true;
                break;
            case "r4":
                room = new Room4;
                playerSession.inventory.push(FlashlightitemAlias,KeyItem1Alias,KeyItem2Alias,KeyItem3Alias,ThreeNumberItemAlias);
                playerSession.pickedUpKey1 = true;
                playerSession.pickedUpKey2 = true;
                playerSession.pickedUpKey3 = true;
                playerSession.answeredRiddle = true;
                playerSession.roomSearched = true;
                playerSession.collectedCode = true;
                playerSession.correctAnswer = true;
                break;
            case "r5":
                room = new Room5;
                playerSession.inventory.push(FlashlightitemAlias,KeyItem1Alias,KeyItem2Alias,KeyItem3Alias,ThreeNumberItemAlias,SawItemAlias);
                playerSession.pickedUpKey1 = true;
                playerSession.pickedUpKey2 = true;
                playerSession.pickedUpKey3 = true;
                playerSession.answeredRiddle = true;
                playerSession.roomSearched = true;
                playerSession.collectedCode = true;
                playerSession.correctAnswer = true;
                playerSession.paintingPuzzleState = 3;
                break;
            case "die":
                damagePlayer(100);
                return new TextActionResult(["You died"]);
        // actions for testing ^^^^^^
        }
        if (room) {
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }

        return undefined;
    }
}
