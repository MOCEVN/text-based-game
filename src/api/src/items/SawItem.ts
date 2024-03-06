import { Gebruiken, GebruikAlias } from "../actions/gebruikRoom5";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
// import { EndRoom } from "../rooms/EndRoom";

export const SawItemAlias: string = "zaag";

export class SawItem extends Item implements Examine, Gebruiken {
    public constructor() {
        super(SawItemAlias, ExamineActionAlias, GebruikAlias);
    }

    public name(): string {
        return "Zaag";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Zaag"]);
    }

    public Gebruiken(): ActionResult | undefined {
        return new TextActionResult(["Je hebt de zaag gebruikt"]);
    }
}
