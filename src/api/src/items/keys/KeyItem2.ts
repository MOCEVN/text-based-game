import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const KeyItem2Alias: string = "key-item-2";

export class KeyItem2 extends Item implements Examine {
    public constructor() {
        super(KeyItem2Alias, ExamineActionAlias);
    }

    public name(): string {
        return "Middle Key";
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Turning your attention to the middle key, it seems unremarkable at first glance.", "Its surface is plain, lacking the look of importance. Yet, as you hold it, there's a reassuring weight to it.", "It radiates a certain strength, hinting at a hidden resilience beneath its unassuming exterior."]);
    }
}