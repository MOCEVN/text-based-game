import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";


export const Room5Alias: string = "";


export class Room5 extends Room{
    
    public constructor() {
        super(Room5Alias);
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["room5test"]);
    }
    public name(): string {
        return "Room5";
    }
}