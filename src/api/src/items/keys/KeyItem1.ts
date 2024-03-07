import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const KeyItem1Alias: string = "key-item-1";

export class KeyItem1 extends Item implements Examine {
    public constructor() {
        super(KeyItem1Alias, ExamineActionAlias);
    }

    public name(): string {
        return "Left Key";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["As you inspect the left key, it glimmers softly in the dim light. The metal is smooth, adorned with delicate patterns that catch your eye.", "It feels cool to the touch, and a faint, melodic hum resonates through your fingertips.", "This key feels important."]);
    }
}