import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";

export const KeyItem3Alias: string = "key-item-3";

export class KeyItem3 extends Item implements Examine, Pickup {
    public constructor() {
        super(KeyItem3Alias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Right Key";
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["The right key, small and weathered, carries the weight of time in its appearance. Tiny scratches and faded grooves tell tales of countless uses.", "As you run your fingers over its aged surface, a sense of history envelopes you.", "This key has witnessed much, and though it may seem frail, there's a timeless quality to it."]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["You pick up the right key."]);
    }
}