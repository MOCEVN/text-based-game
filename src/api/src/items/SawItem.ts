import { UseAlias, UseRoom5 } from "../actions/UseRoom5";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
// import { EndRoom } from "../rooms/EndRoom";

export const SawItemAlias: string = "saw-item";

export class SawItem extends Item implements Examine, UseRoom5 {
    public constructor() {
        super(SawItemAlias, ExamineActionAlias, UseAlias);
    }

    public name(): string {
        return "Saw";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["The saw is a sturdy tool with a sharp blade and a worn handle, indicating its history of use. Despite its simple appearance, it exudes reliability and strength, ready to assist the wielder on their journey."]);
    }

    public Use(): ActionResult | undefined {
        return new TextActionResult(["You used the Saw"]);
    }
}
