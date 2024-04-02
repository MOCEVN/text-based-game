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
import { FirstPot } from "../characters/pots/FirstPotItem";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PotionItem, PotionItemAlias } from "../items/PotionItem";
import { PlayerSession } from "../types";

import { EndRoom } from "./EndRoom";

export const Room5Alias: string = "room5";

export class Room5 extends Room {
    
    public constructor() {
        super(Room5Alias);
    }

    public name(): string {
        return "The Witch's Haven";
    }
    public images(): string[] {
        const PlayerSession: PlayerSession = getPlayerSession();
        if(PlayerSession.talkPotion === true){
            return["pot"];
        } else if(PlayerSession.talkWitch === true){
            return ["witch"];
        }else{
            return ["kamer5"];
        }
        
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
        const PlayerSession: PlayerSession = getPlayerSession();
        // if(){

        // }
        if(PlayerSession.inventory.includes(PotionItemAlias)){
            return [this, ...inventoryItems, new PotionItem(), new WitchCharacter(), new FirstPot()];
        }else{
            return [this, ...inventoryItems, new WitchCharacter(), new FirstPot()];
        }
        
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Upon entering the room, you are met with an eerie stillness broken only by the crackling of fire and the witch's cackling. Large cauldrons bubble in the corners, emitting strange odors. With each step, the room pulses with unsettling energy, but you steel yourself for the challenges ahead."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "endroom") {
            const room: EndRoom = new EndRoom();
            const playerSession: PlayerSession = getPlayerSession();
            //Set the current room to the example room
            playerSession.currentRoom = room.alias;
            playerSession.endTime = Date.now();
            return room.examine();
        }

        return undefined;
    }
}
