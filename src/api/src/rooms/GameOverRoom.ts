import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { Custom, CustomAction, CustomActionAlias } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { resetPlayerSession } from "../instances";

export const GameOverRoomAlias: string = "game-over-room";

export class GameOverRoom extends Room implements Custom{
    public constructor(){
        super(GameOverRoomAlias,CustomActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["GAME OVER","YOU LOST"]);
    }
    public name(): string {
        return "Terror Trial";
    }
    public actions(): Action[] {
        return [new CustomAction("reset", "Restart", false)];
    }
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "reset") {
            resetPlayerSession();
            return new TextActionResult([""]);
        }
        return undefined;
    }
}