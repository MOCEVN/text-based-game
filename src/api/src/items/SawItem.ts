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
            return new TextActionResult(["The saw, once gleaming and sturdy, now bears the marks of its labor. Sawdust and wood pieces cling to its blade and handle, evidence of its successful efforts to cut through the door. Despite its now-worn appearance, the saw still retains its reliability and strength."]);
        }
        return new TextActionResult(["The saw is a sturdy tool with a sharp blade and a worn handle, indicating its history of use. Despite its simple appearance, it exudes reliability and strength, ready to assist the wielder on their journey."]);
    }

    public Use(): ActionResult | undefined {
        return new TextActionResult(["The Saw doesn't work properly"]);
    }
}
