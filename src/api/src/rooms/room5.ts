import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";

export const Room5Alias: string = "";

export class Room5 extends Room {
    public constructor() {
        super(Room5Alias);
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["room5test"]);
    }
    public name(): string {
        return "Room5";
    }
    public actions(): Action[] {
        return [new ExamineAction()];
    }

    public objects(): GameObject[] {
        return [this];
    }

    public images(): string[] {
        return [
            "kamer5"
        ];
    }
}
