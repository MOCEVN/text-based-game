import { UseAlias, UseRoom5 } from "../actions/UseRoom5";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Custom, CustomActionAlias } from "../base/actions/CustomAction";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { Room4 } from "../rooms/Room4";
// import { EndRoom } from "../rooms/EndRoom";

export const SawItemAlias: string = "saw-item";

export class SawItem extends Item implements Examine, UseRoom5, Custom {
    public constructor() {
        super(SawItemAlias, ExamineActionAlias, UseAlias, CustomActionAlias);
    }
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        return new Room4().custom(alias,[this]);
    }

    public name(): string {
        return "Saw";
    }
    public examine(): ActionResult | undefined {
        if (getPlayerSession().paintingPuzzleState === 3) {
            return new TextActionResult(["The saw, once gleaming and sturdy, now bears the marks of its labor. Sawdust and wood pieces cling to its blade and handle, evidence of its efforts to cut through the door. Now, the saw fails to yield any results, its reliability and strength proving futile in this instance."]);
        }
        return new TextActionResult(["The saw appears delicate and worn, its blade bearing signs of age and use. Despite its fragile appearance, it still retains a hint of sharpness, ready to fulfill its purpose with a single use."]);
    }

    public Use(): ActionResult | undefined {
        return new TextActionResult(["The Saw doesn't work properly"]);
    }
}
