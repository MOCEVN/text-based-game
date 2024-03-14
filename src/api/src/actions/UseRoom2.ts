import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";

export const UseRoom2ActionAlias: string = "UseRoom2";

export interface UseRoom2 {
    useroom2(_gameObject: GameObject): ActionResult | undefined;
}

export class UseRoom2Action extends Action {
    public constructor() {
        super(UseRoom2ActionAlias, "Use", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, UseRoom2ActionAlias)) {
            return castTo<UseRoom2>(gameObject).useroom2(gameObject);
        }
        
        return undefined;
    }
}