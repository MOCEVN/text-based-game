import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const FlashlightitemAlias: string = "flashlight";

export class flashlightitem extends Item implements Examine {
    public constructor() {
        super(FlashlightitemAlias, ExamineActionAlias);
    }
    public name(): string {
        return "flashlight";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["it's fully charged flashlight."]);
    }
}
