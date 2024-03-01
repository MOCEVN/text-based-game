import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Item } from "../base/gameObjects/Item";
// import { EndRoom } from "../rooms/EndRoom";

export const ZaagItemAlias: string = "zaag";

export class ZaagItem extends Item implements Examine {
    public constructor() {
        super(ZaagItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Zaag";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["zaag"]);
    }

    public actions(): Action[] {
        return [new CustomAction("Gebruiken", "Gebruiken", false)];
    }
    

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "Gebruiken") {
            return new TextActionResult(["kan niet gebruikt worden nu"]);
        }

        return undefined;
    }
}
