import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";

export const UseAlias: string = "UseRoom5";

export interface UseRoom5 {
    Use(choiceId?: number): ActionResult | undefined;
}

export class Use extends Action {
    public constructor() {
        super(UseAlias, "Use", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, UseAlias)) {
            return castTo<UseRoom5>(gameObject).Use();
            // return (gameObject as unknown as Gebruiken).Gebruiken();
        }

        return undefined;
    }
}
