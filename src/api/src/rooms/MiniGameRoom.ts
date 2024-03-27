import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { Custom, CustomAction, CustomActionAlias } from "../base/actions/CustomAction";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession, sendToGameOver } from "../instances";
import { PlayerSession } from "../types";

export const MiniGameRoomAlias: string = "mini-game-room";

export class MiniGAmeRoom extends Room implements Custom{
    public constructor(){
        super(MiniGameRoomAlias,CustomActionAlias);
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["minigame"]);
    }
    public name(): string {
        return "minigame";
    }
    public actions(): Action[] {
        return [new CustomAction("win","win",false), new CustomAction("lose","lose",false)];
    }
    public custom(alias: string): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        switch (alias) {
            case "win":
                playerSession.currentRoom = playerSession.deathRoom!;
                playerSession.hp = 3;
                return new TextActionResult(["You have revived yourself."]);
            case "lose":
                return sendToGameOver();
        }
        return undefined;
    }
    
}